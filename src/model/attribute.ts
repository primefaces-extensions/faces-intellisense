export class Attribute {
    public description: string = "";
    public name: string = "";
    public required: boolean = false;
    public type: string = "";

    constructor(description: string, name: string, required: boolean, type: string) {
        this.description = description;
        this.name = name;
        this.required = required;
        this.type = type;
    }
}