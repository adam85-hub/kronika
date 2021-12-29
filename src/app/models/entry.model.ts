import { ElementInterface } from "../interfaces/element.interface";
import { EntryInterface } from "../interfaces/entry.interface";
import { ElementModel } from "./element.model";

export class EntryModel
{ 
    public id: number;
    public Title: string;
    public Date: Date;
    public Elements: ElementModel[];

    constructor(entry: EntryInterface, elements: ElementInterface[])
    { 
        this.id = entry.id;
        this.Title = entry.Title;
        let dateArray = entry.Date.split(".");
        this.Date = new Date(+dateArray[2], +dateArray[1]-1, +dateArray[0]);
        this.Elements = new Array<ElementModel>();

        elements.forEach(element => {
            this.Elements.push();
        });
    }
}