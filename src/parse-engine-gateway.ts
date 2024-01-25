import VError = require("verror");
import { ComponentDefinition } from "./common";
import { IParseEngine } from "./parse-engines/common";
import ParseEngineRegistry from "./parse-engines/common/parse-engine-registry";

class ParseEngineGateway {
    public static callParser(version: string): ComponentDefinition[] {
        const parseEngine: IParseEngine = ParseEngineRegistry.getParseEngine(version);
        const componentDefinitions: ComponentDefinition[] = parseEngine.parse();
        return componentDefinitions;
    }
}
export default ParseEngineGateway;
