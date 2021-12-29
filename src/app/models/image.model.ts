import { ElementModel } from "./element.model";

export class ImageModel extends ElementModel {
    public src: string;

    constructor(index: number, src: string) {
        super(index, "Image");
        this.src = src;
    }
}