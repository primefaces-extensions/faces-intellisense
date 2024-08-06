import * as _ from 'lodash';
import * as VError from 'verror';
import { CompletionItem, CompletionItemKind, Disposable, ExtensionContext, Hover, MarkdownString, Position, Range, TextDocument, commands, languages, window, workspace, OutputChannel } from 'vscode';
import { ComponentDefinition, XmlNamespace } from './common';
import Notifier from './notifier';
import ParseEngineGateway from './parse-engine-gateway';

enum Command {
    cache = 'faces-intellisense.cache'
}

enum Configuration {
    languages = 'faces-intellisense.languages',
    primeVersion = 'faces-intellisense.primeVersion',
    primeExtVersion = 'faces-intellisense.primeExtVersion',
    omniVersion = 'faces-intellisense.omniVersion',
    richVersion = 'faces-intellisense.richVersion',
    facesVersion = 'faces-intellisense.facesVersion'
}

const notifier: Notifier = new Notifier(Command.cache);
const completionTriggerChars = ['"', "'", ' ', '.'];
let caching = false;
const htmlDisposables: Disposable[] = [];
let _output: OutputChannel;

const supportedXmlNamespaces: XmlNamespace[] = [
    {
        id: 'a4j',
        urls: ['http://richfaces.org/a4j'],
        dataFilename: richFacesSubTag('a4j'),
        uniqueDefinitions: []
    },
    {
        id: 'r',
        urls: ['http://richfaces.org/rich'],
        dataFilename: richFacesSubTag('richfaces'),
        uniqueDefinitions: []
    },
    {
        id: 'o',
        urls: ['http://omnifaces.org/ui', 'omnifaces.ui'],
        dataFilename: workspace.getConfiguration().get<string>(Configuration.omniVersion) ?? '',
        uniqueDefinitions: []
    },
    {
        id: 'p',
        urls: ['http://primefaces.org/ui', 'primefaces'],
        dataFilename: workspace.getConfiguration().get<string>(Configuration.primeVersion) ?? '',
        uniqueDefinitions: []
    },
    {
        id: 'pe',
        urls: ['http://primefaces.org/ui/extensions', 'primefaces.extensions'],
        dataFilename: workspace.getConfiguration().get<string>(Configuration.primeExtVersion) ?? '',
        uniqueDefinitions: []
    },
    {
        id: 'c',
        urls: !isJakartaVersion() ? ['http://xmlns.jcp.org/jsp/jstl/core'] : ['jakarta.tags.core'],
        dataFilename: 'c',
        uniqueDefinitions: []
    },
    {
        id: 'cc',
        urls: !isJakartaVersion() ? ['http://java.sun.com/jsf/composite', 'http://xmlns.jcp.org/jsf/composite'] : ['jakarta.faces.composite'],
        dataFilename: 'cc',
        uniqueDefinitions: []
    },
    {
        id: 'f',
        urls: !isJakartaVersion() ? ['http://java.sun.com/jsf/core', 'http://xmlns.jcp.org/jsf/core'] : ['jakarta.faces.core'],
        dataFilename: 'f',
        uniqueDefinitions: []
    },
    {
        id: 'h',
        urls: !isJakartaVersion() ? ['http://java.sun.com/jsf/html', 'http://xmlns.jcp.org/jsf/html'] : ['jakarta.faces.html'],
        dataFilename: 'h',
        uniqueDefinitions: []
    },
    {
        id: 'ui',
        urls: !isJakartaVersion() ? ['http://java.sun.com/jsf/facelets', 'http://xmlns.jcp.org/jsf/facelets'] : ['jakarta.faces.facelets'],
        dataFilename: 'ui',
        uniqueDefinitions: []
    }
];

export async function activate(context: ExtensionContext): Promise<void> {
    const disposables: Disposable[] = [];
    _output = window.createOutputChannel('faces-intellisense');
    context.subscriptions.push(_output);
    _output.appendLine('Activating extension!');
    workspace.onDidChangeConfiguration(
        async (e) => {
            try {
                if (e.affectsConfiguration(Configuration.languages)) {
                    unregisterComponentProviders(htmlDisposables);
                    registerComponentProviders(htmlDisposables);
                }
            } catch (err) {
                const newErr = new VError('err', 'Failed to automatically reload the extension after the configuration change');
                console.error(newErr);
                window.showErrorMessage(newErr.message);
            }
        },
        null,
        disposables
    );

    context.subscriptions.push(...disposables);

    context.subscriptions.push(
        commands.registerCommand(Command.cache, async () => {
            if (caching) {
                return;
            }
            caching = true;
            try {
                await cache();
            } catch (err) {
                const newErr = new VError('err', 'Failed to cache the components in the workspace');
                console.error(newErr);
                window.showErrorMessage(newErr.message);
            } finally {
                caching = false;
            }
        })
    );
    registerComponentProviders(htmlDisposables);

    caching = true;
    try {
        await cache();
    } catch (err) {
        const newErr = new VError('err', 'Failed to cache the components in the workspace for the first time');
        console.error(newErr);
        window.showErrorMessage(newErr.message);
    } finally {
        caching = false;
    }
}

export function deactivate(): void {
    unregisterComponentProviders(htmlDisposables);
}

/**
 * Method for clearing cache
 */
async function cache(): Promise<void> {
    try {
        notifier.notify('eye', 'Clear cache taglib...');
        supportedXmlNamespaces.forEach((xmlns) => (xmlns.uniqueDefinitions = []));
        notifier.notify('zap', 'Clean components cache... (click to clean cache again)');
    } catch (err) {
        notifier.notify('alert', 'Failed to clean cache the components');
        throw new VError('err', 'Failed to clean cache the component definitions');
    }
}

function registerComponentProviders(disposables: Disposable[]) {
    workspace
        .getConfiguration()
        ?.get<string[]>(Configuration.languages)
        ?.forEach((extension) => {
            disposables.push(registerCompletionProvider(extension));
            disposables.push(registerHoverProvider(extension));
        });
}

function unregisterComponentProviders(disposables: Disposable[]) {
    disposables.forEach((disposable) => disposable.dispose());
    disposables.length = 0;
}

/**
 * Main method
 *
 * @param languageSelector
 * @param classPrefix
 * @returns
 */
function registerCompletionProvider(languageSelector: string, classPrefix = ''): Disposable {
    return languages.registerCompletionItemProvider(
        languageSelector,
        {
            provideCompletionItems(document: TextDocument, position: Position): CompletionItem[] {
                _output.appendLine(`In autocomplete, position is ${position.line}:${position.character}`);
                const start: Position = new Position(position.line, 0);
                const range: Range = new Range(start, position);
                const text: string = document.getText(range);
                let autoSearch: string = '';
                let xmlnsPrefix: string = text.trimStart();

                if (!xmlnsPrefix.includes(' ')) {
                    const ind = xmlnsPrefix.indexOf(':');
                    if (ind > -1 && ind + 1 < xmlnsPrefix.length) {
                        autoSearch = xmlnsPrefix.substring(ind + 1);
                        xmlnsPrefix = xmlnsPrefix.substring(0, ind + 1);
                    }
                } else {
                    xmlnsPrefix = text.trim();
                }
                aliasFromDocument(document, position);
                const xmlns = supportedXmlNamespaces.find((xmlns) => xmlns.aliasInDoc === xmlnsPrefix);

                // Find the components
                if (xmlnsPrefix !== '' && xmlns) {
                    return xmlns.uniqueDefinitions
                        .filter((definition) => autoSearch === '' || definition.component.name.startsWith(autoSearch))
                        .map((definition) => {
                            const completionItem = new CompletionItem(definition.component.name, CompletionItemKind.Property);
                            completionItem.documentation = definition.component.description;
                            const completionClassName = `${classPrefix}${definition.component.name}`;
                            completionItem.filterText = completionClassName;
                            completionItem.insertText = completionClassName;
                            completionItem.detail = 'XMLNS: ' + xmlns?.dataFilename.toUpperCase();
                            return completionItem;
                        });
                }
                // Find component attributes
                else {
                    const componentInfo: Map<string, string> = getComponentInformation(document, position);
                    const xmlnsPrefix = componentInfo.get('xmlnsPrefix') ? '<' + componentInfo.get('xmlnsPrefix') + ':' : '';
                    const componentName = componentInfo.get('componentName');
                    const attributes = componentInfo.get('attributes');

                    if (xmlnsPrefix !== '') {
                        aliasFromDocument(document, position);
                        const xmlns = supportedXmlNamespaces.find((xmlns) => xmlns.aliasInDoc === xmlnsPrefix);
                        if (xmlnsPrefix !== '' && xmlns) {
                            const componentItem = xmlns.uniqueDefinitions.filter((definition) => definition.component.name === componentName).find(() => true);

                            if (componentItem === undefined) {
                                return [];
                            }

                            const completionItems = componentItem.component.attributes.map((definition) => {
                                let text: string = '';
                                text = text + definition.description + '\n';
                                text = text + 'Required: ' + definition.required + '\n';
                                text = text + 'Type: ' + definition.type + '\n';
                                const completionItem = new CompletionItem(definition.name, CompletionItemKind.Property);
                                completionItem.documentation = text;
                                const completionClassName = `${classPrefix}${definition.name}`;
                                completionItem.filterText = completionClassName;
                                completionItem.insertText = completionClassName + '=""';
                                completionItem.detail = 'XMLNS: ' + xmlns?.dataFilename.toUpperCase();
                                return completionItem;
                            });

                            if (attributes && attributes.length > 0) {
                                const attributesOnComponent = attributes.split('|');
                                // Removes from the collection the attributes already specified on the component
                                for (const attributeOnComponent of attributesOnComponent) {
                                    for (let j = 0; j < completionItems.length; j++) {
                                        if (completionItems[j].insertText === attributeOnComponent + '=""') {
                                            completionItems.splice(j, 1);
                                        }
                                    }
                                }
                            }
                            return completionItems;
                        }
                    }
                }
                return [];
            }
        },
        ...completionTriggerChars
    );
}

/**
 * Register Hover Provider
 *
 * @param languageSelector
 */
function registerHoverProvider(languageSelector: string): Disposable {
    return languages.registerHoverProvider(languageSelector, {
        provideHover(document: TextDocument, position: Position): Hover | null {
            _output.appendLine(`In hover, position is ${position.line}:${position.character}`);
            const wordRange: Range | undefined = document.getWordRangeAtPosition(position, /(\w+:\w+)|\w+[=]/);
            if (!wordRange) {
                _output.appendLine('!wordRange');
                return null;
            }

            let word = document.getText(wordRange);
            _output.appendLine(`Word: ${word}`);

            aliasFromDocument(document, position);

            if (word.includes(':')) {
                const xmlnsPrefix = '<' + word.split(':')[0] + ':';
                const componentName = word.split(':')[1];
                const xmlns = supportedXmlNamespaces.find((xmlns) => xmlns.aliasInDoc === xmlnsPrefix);
                if (!xmlns) {
                    return null;
                }

                const componentItem = xmlns.uniqueDefinitions.filter((definition) => definition.component.name === componentName).find(() => true);
                if (!componentItem) {
                    return null;
                }

                const contents = new MarkdownString();
                contents.appendMarkdown(`**${componentItem.component.name}**\n\n`);
                contents.appendMarkdown(componentItem.component.description);
                contents.isTrusted = true;
                contents.supportHtml = true;
                return new Hover(contents, new Range(position, position));
            } else {
                word = word.substring(0, word.length - 1);

                const componentInfo: Map<string, string> = getComponentInformation(document, position);
                const xmlnsPrefix = componentInfo.get('xmlnsPrefix') ? '<' + componentInfo.get('xmlnsPrefix') + ':' : '';
                const componentName = componentInfo.get('componentName');
                const xmlns = supportedXmlNamespaces.find((xmlns) => xmlns.aliasInDoc === xmlnsPrefix);
                if (!xmlns) {
                    return null;
                }

                const componentItem = xmlns.uniqueDefinitions.filter((definition) => definition.component.name === componentName).find(() => true);
                if (componentItem === undefined) {
                    return null;
                }

                _output.appendLine(`Found: ${xmlnsPrefix}, ${componentName}`);
                const attr = componentItem.component.attributes.filter((attribute) => attribute.name == word)[0];

                const contents = new MarkdownString();
                contents.appendMarkdown(`**${attr.name}**\n\n`);
                contents.appendMarkdown(attr.description);
                contents.isTrusted = true;
                contents.supportHtml = true;
                return new Hover(contents, new Range(position, position));
            }

        }
    });
}

/**
 * Get all the xmlns prefixes used in the document
 * and register them in each of the supportedXmlNamespaces.
 *
 * @param document
 * @param position
 */
function aliasFromDocument(document: TextDocument, position: Position) {
    const start: Position = new Position(0, 0);
    const range: Range = new Range(start, position);
    let allText: string = document.getText(range);
    allText = allText.toLowerCase();
    supportedXmlNamespaces.forEach((xmlns) => {
        xmlns.aliasInDoc = '';
        xmlns.urls.forEach((url) => {
            if (allText.includes('"' + url + '"')) {
                xmlns.aliasInDoc = getXmlnsAlias(allText, url);
                loadAllXmlnsContent(xmlns);
            }
        });
    });
}

/**
 * Get the prefix used in the xmlns.
 *
 * @param allText
 * @param xmlnsTag
 * @returns
 */
function getXmlnsAlias(allText: string, xmlnsTag: string): string {
    let tag: string = '';
    const index: number = allText.indexOf(xmlnsTag);
    tag = allText.substring(0, index);
    const indexXMLNS: number = tag.lastIndexOf('xmlns:');
    tag = tag.substring(indexXMLNS + 6, tag.length - 2);
    return '<' + tag + ':';
}

/**
 * Load all taglib content from xmlns (components and attributes).
 * Loading is only done if the elements have not been loaded previously.
 *
 * @param xmlns
 */
function loadAllXmlnsContent(xmlns: XmlNamespace): void {
    if (xmlns && xmlns?.uniqueDefinitions.length < 1) {
        try {
            let uniqueComponentDefinition: ComponentDefinition[] = [];
            const componentDefinitions: ComponentDefinition[] = [];
            const failedLogs = '';
            const failedLogsCount = 0;
            try {
                Array.prototype.push.apply(componentDefinitions, ParseEngineGateway.callParser(xmlns.dataFilename));
            } catch (err) {
                notifier.notify('alert', 'Failed to cache the components in the workspace (click for another attempt)');
                throw new VError('err', 'Failed to parse the documents');
            }
            uniqueComponentDefinition = _.uniqBy(componentDefinitions, (def) => def.component.name);
            if (failedLogsCount > 0) {
                console.log(failedLogsCount, 'failed attempts to parse. List of the documents:');
                console.log(failedLogs);
            }
            xmlns.uniqueDefinitions = uniqueComponentDefinition;
        } catch (err) {
            notifier.notify('alert', 'Failed to cache the components in the workspace (click for another attempt)');
            throw new VError('err', 'Failed to cache the component definitions during the iterations over the documents that were found');
        }
    }
}

/**
 * Gets the name of the component, the attribute and
 * possible attributes already used in it.
 *
 * @param document
 * @param position
 * @returns
 */
function getComponentInformation(document: TextDocument, position: Position): Map<string, string> {
    const componentInfo = new Map<string, string>();
    let text: string = '';
    const start: Position = new Position(0, 0);
    const range: Range = new Range(start, position);
    const allText: string = document.getText(range);
    let lastC: number = allText.lastIndexOf('<');
    text = allText.substring(lastC);

    const blank_ = text.indexOf(' ');
    const break_ = text.indexOf('\n');
    let delimiter: number = -1;
    if (blank_ < break_) {
        delimiter = blank_ > -1 ? blank_ : break_;
    } else if (break_ < blank_) {
        delimiter = break_ > -1 ? break_ : blank_;
    }
    text = text.substring(0, delimiter);
    text = text.replace('<', '');
    if (text.includes(':')) {
        const div = text.split(':');
        componentInfo.set('xmlnsPrefix', div[0]);
        componentInfo.set('componentName', div[1]);

        let attributes: string = '';
        lastC = allText.lastIndexOf('<' + div[0] + ':' + div[1]);
        text = allText.substring(lastC);

        if (inAttribute(text)) {
            return new Map<string, string>();
        }
        if (text.includes('>')) {
            return new Map<string, string>();
        }
        let index: number;
        const rExp: RegExp = /(\w+=("|')([^"|']*)("|'))/g;
        const rawClasses: RegExpMatchArray | null = text.match(rExp);
        if (rawClasses && rawClasses.length > 0) {
            rawClasses?.forEach((item) => {
                index = item.indexOf('=');
                item = item.substring(0, index);
                attributes = attributes + (attributes !== '' ? '|' : '') + item;
            });
        }
        componentInfo.set('attributes', attributes);
    }
    return componentInfo;
}

/**
 * Determines if I am positioned on an attribute.
 *
 * @param text
 * @returns
 */
export function inAttribute(text: string): boolean {
    let character: string = '';
    let index: number = text.lastIndexOf('"');
    if (index === -1) {
        index = text.lastIndexOf("'");
    }
    if (index !== -1) {
        character = text.substring(index - 1, index);
        if (character === '=') {
            return true;
        }
    }
    return false;
}

function isJakartaVersion(): boolean {
    const faces: string = workspace.getConfiguration().get<string>(Configuration.facesVersion) || '';
    if (faces === 'java-server-faces(1.0 - 2.2)' || faces === 'jakarta-server-faces(2.3 - 3.0)') {
        return false;
    }
    return true;
}

function richFacesSubTag(subtag: string): string {
    const rich: string = workspace.getConfiguration().get<string>(Configuration.richVersion) || '';
    const vers = rich.substring(rich.lastIndexOf('-'));
    return `${subtag}${vers}`;
}
