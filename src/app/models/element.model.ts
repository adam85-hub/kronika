import { ElementInterface } from '../interfaces/element.interface';
import { ImageModel } from './image.model';
import { ParagraphModel } from './paragraph.model';
import { VideoModel } from './video.model';

export abstract class ElementModel 
{ 
    public index: number;
    public type: string;

    constructor(index: number, type: string) { 
        this.index = index;
        this.type = type;
    }    

    static fromElementInterface(element: ElementInterface): ElementModel
    { 
        if(element.type == "Paragraph")
        { 
            if(element.content == null) throw new Error("Wrong data received - content of paragraph element cannot be null");
            else return new ParagraphModel(element.index, element.content);
        }
        else if(element.type == "Image")
        { 
            if(element.src == null) throw new Error("Wrong data received - src of image element cannot be null");
            else return new ImageModel(element.index, element.src);
        }
        else if(element.type == "Video")
        { 
            if(element.src == null) throw new Error("Wrong data received - src of video element cannot be null");
            else return new VideoModel(element.index, element.src);
        }
        else throw new Error(`Wrong data received - "${element.type}" element type does not exist`);
    }
}