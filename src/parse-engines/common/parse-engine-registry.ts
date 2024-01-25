import { workspace } from "vscode";
import { IParseEngine } from ".";
import TagLib from "../taglib";

enum Configuration {
    primeVersion = "jsf-primefaces-intellisense.primeVersion",
    primeExtVersion = "jsf-primefaces-intellisense.primeExtVersion",
    omniVersion = "jsf-primefaces-intellisense.omniVersion",
    richVersion = "jsf-primefaces-intellisense.richVersion",
    facesVersion = "jsf-primefaces-intellisense.facesVersion"
}
class ParseEngineRegistry {
    public static getParseEngine(taglibId: string): IParseEngine {
        const foundParseEngine = ParseEngineRegistry.registry.find((value) => value.version === taglibId);
        if (!foundParseEngine) {
            throw new Error(`Could not find a parse engine for the provided id ("${taglibId}").`);
        }
        return foundParseEngine;
    }

    public static get supportedLanguagesIds(): string[] {
        if (!ParseEngineRegistry.languagesIds) {
            ParseEngineRegistry.languagesIds = ParseEngineRegistry.registry.map(
                (parseEngine) => parseEngine.version);
        }
        return ParseEngineRegistry.languagesIds;
    }

    public static richFacesSubTag = (subtag: string): IParseEngine => {
        const rich: string = workspace.getConfiguration().get<string>(Configuration.richVersion) || '';
        const vers = rich.substring(rich.lastIndexOf('-'));
        return new TagLib('richfaces', `${subtag}${vers}`);
    }

    public static facesSubTag = (subtag: string): IParseEngine => {
        const faces: string = workspace.getConfiguration().get<string>(Configuration.facesVersion) || '';
        if (faces === "java-server-faces(1.0 - 2.2)" || faces === "jakarta-server-faces(2.3 - 3.0)") {
            return new TagLib('jsf', `${subtag}`);
        }
        else {
            const vers = faces.substring(faces.lastIndexOf('-'));
            return new TagLib('jakarta', `${subtag}${vers}`);
        }
    }

    private static languagesIds: string[];
    private static registry: IParseEngine[] = [
        ParseEngineRegistry.facesSubTag('h'),
        ParseEngineRegistry.facesSubTag('f'),
        ParseEngineRegistry.facesSubTag('c'),
        ParseEngineRegistry.facesSubTag('cc'),
        ParseEngineRegistry.facesSubTag('ui'),
        new TagLib('primefaces', workspace.getConfiguration().get<string>(Configuration.primeVersion) || ''),
        new TagLib('primefaces', workspace.getConfiguration().get<string>(Configuration.primeExtVersion) || ''),
        new TagLib('omnifaces', workspace.getConfiguration().get<string>(Configuration.omniVersion) || ''),
        ParseEngineRegistry.richFacesSubTag('a4j'),
        ParseEngineRegistry.richFacesSubTag('richfaces'),
    ];
}
export default ParseEngineRegistry;
