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
}