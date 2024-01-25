import { ComponentDefinition } from ".";

class XmlNamespace {
    id: string = "";
    aliasInDoc?: string = "";
    urls: string[] = [];
    dataFilename: string = "";
    uniqueDefinitions: ComponentDefinition[] = [];
}

export default XmlNamespace;