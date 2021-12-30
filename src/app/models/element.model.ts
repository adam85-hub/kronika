export abstract class ElementModel 
{ 
    public index: number;
    public type: string;

    constructor(index: number, type: string) { 
        this.index = index;
        this.type = type;
    }        

    abstract getAttr(): string;
}