import { ElementInterface } from "../interfaces/element.interface";
import { ElementModel } from "./element.model";

export class VideoModel extends ElementModel {
    public src: string;

    constructor(index: number, src: string) {
        super(index, "Video");
        this.src = src;
    }

    getAttr(): string {
        return this.src;
    }

    setAttr(value: string): void {
        this.src = "";
        this.src = value;
    }

    override toInteface(): ElementInterface {
        let element = super.toInteface();
        element.src = this.src;

        return element;
    }
}