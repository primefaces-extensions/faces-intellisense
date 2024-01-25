import { ComponentDefinition } from "../../common";
import { Component, IComponent } from "../../model";


export default class ComponentExtractor {
    /**
     * @description Extracts components and attributes from JSON Primefaces
     */
    public static extract(textJson: string): ComponentDefinition[] {
        const definitions: ComponentDefinition[] = [];
        const jsonComps = <IComponent[]>JSON.parse(textJson);
        let components: Component[] = [];

        jsonComps.forEach(jsonComp => {
            let component = new Component(jsonComp.description, jsonComp.name);
            if (typeof (jsonComp.attribute) !== 'undefined') {
                if (jsonComp.attribute.length > 0) {
                    jsonComp.attribute.forEach(jsonAtt => {
                        component.addAtribute(jsonAtt.description, jsonAtt.name, jsonAtt.required, jsonAtt.type);
                    });
                } else {
                    const attComp: any = jsonComp.attribute;
                    component.addAtribute(attComp.description, attComp.name, attComp.required, attComp.type);
                }
            }
            components.push(component);
            definitions.push(new ComponentDefinition(component));
        });
        return definitions;
    }
}