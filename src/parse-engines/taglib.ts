
import * as fs from 'fs';
import * as path from 'path';
import { ComponentDefinition } from "../common";
import { ComponentExtractor, IParseEngine } from "./common";

class TagLib implements IParseEngine {
    folder: string;
    version: string;
    constructor(folder: string, version: string) {
        this.folder = folder;
        this.version = version;
    }
    public parse(): ComponentDefinition[] {
        const jsonPath = path.join(__dirname, 'data', this.folder, `${this.version}.json`);
        const jsonFile = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        return ComponentExtractor.extract(JSON.stringify(jsonFile.components.component));
    }
}
export default TagLib;
