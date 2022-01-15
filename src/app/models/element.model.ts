import {ElementInterface} from "../interfaces/element.interface";

export abstract class ElementModel 
{ 
    public index: number;
    public type: string;

    constructor(index: number, type: string) { 
        this.index = index;
        this.type = type;
    }     
    
    toInteface(): ElementInterface {
        let element = {
            index: this.index,
            type: this.type
        }

        return element;
    }

    abstract getAttr(): string;
    abstract setAttr(value: string): void;    
}