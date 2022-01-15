import { ElementInterface } from "../interfaces/element.interface";
import { ElementModel } from "./element.model";

export class ParagraphModel extends ElementModel {
    public content: string;

    constructor(index: number, content: string) {
        super(index, "Paragraph");
        this.content = content;
    }

    getAttr(): string {
        return this.content;
    }

    setAttr(value: string): void {
        this.content = value;
    }

    override toInteface(): ElementInterface {
        let element = super.toInteface();
        element.content = this.content;

        return element;
    }
}