import { Attribute } from ".";

export class Component {
    public description: string = "";
    public name: string = "";
    public attributes: Attribute[] = [];

    constructor(description: string, name: string) {
        this.description = description;
        this.name = name;
        this.attributes = [];
    }

    public addAtribute(description: string, name: string, required: boolean, type: string): void {
        this.attributes.push(new Attribute(description, name, required, type));
    }
}