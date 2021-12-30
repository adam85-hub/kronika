import { ElementInterface } from "../interfaces/element.interface";
import { EntryInterface } from "../interfaces/entry.interface";
import { ElementModel } from "./element.model";
import { ImageModel } from "./image.model";
import { ParagraphModel } from "./paragraph.model";
import { VideoModel } from "./video.model";

export class EntryModel
{ 
    public id: number;
    public Title: string;
    public Date: Date;
    public TitlePhoto: string;
    public Elements: ElementModel[];

    constructor(entry: EntryInterface, elements?: ElementInterface[])
    { 
        this.id = entry.id;
        this.Title = entry.Title;
        this.TitlePhoto = entry.TitlePhoto;
        let dateArray = entry.Date.split(".");
        this.Date = new Date(+dateArray[2], +dateArray[1]-1, +dateArray[0]);
        this.Elements = new Array<ElementModel>();

        if(elements != null)
        {
            elements.forEach(element => {
                this.Elements.push(fromElementInterface(element));
            });
        }
    }
}

function fromElementInterface(element: ElementInterface): ElementModel
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