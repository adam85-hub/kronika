import { ElementInterface } from "../interfaces/element.interface";
import { ElementModel } from "./element.model";

export class ImageModel extends ElementModel {
    public src: string;
    
    constructor(index: number, src: string) {
        super(index, "Image");
        this.src = src;
    }

    getAttr(): string {
        return this.src;
    }

    setAttr(value: string): void {
        this.src = value;
    }

    override toInteface(): ElementInterface {
        let element = super.toInteface();
        element.src = this.src;

        return element;
    }
}