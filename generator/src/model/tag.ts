export class Tag {
    name: string;
    description: string;
    attribute: any[];

    constructor(name: string, description: string, attribute: any[]) {
        this.name = name;
        this.description = description;
        this.attribute = attribute;
    }
}
