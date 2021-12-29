import { ElementModel } from "./element.model";

export class ParagraphModel extends ElementModel {
    public content: string;

    constructor(index: number, content: string) {
        super(index, "Paragraph");
        this.content = content;
    }
}