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
}