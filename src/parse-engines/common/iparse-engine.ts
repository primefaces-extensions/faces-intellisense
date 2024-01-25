import { ComponentDefinition } from "../../common";

interface IParseEngine {
    folder: string;
    version: string;
    parse(): ComponentDefinition[];
}
export default IParseEngine;
