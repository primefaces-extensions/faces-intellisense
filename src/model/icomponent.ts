import { IAttribute } from ".";

export interface IComponent {
    description: string;
    name: string;
    attribute: IAttribute[];
}