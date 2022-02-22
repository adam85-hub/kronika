import { ElementInterface } from "../interfaces/element.interface";
import { EntryInterface } from "../interfaces/entry.interface";
import { SimpleDate } from "./date";
import { ElementModel } from "./element.model";
import { ImageModel } from "./image.model";
import { ParagraphModel } from "./paragraph.model";
import { VideoModel } from "./video.model";

export class EntryModel
{ 
    public id: number;
    public Title: string;
    public Date: SimpleDate;
    public TitlePhoto: string;
    public Elements: ElementModel[];
    
    constructor(entry: EntryInterface, elements?: ElementInterface[])
    { 
        this.id = entry.id;
        this.Title = entry.Title;
        this.TitlePhoto = entry.TitlePhoto;
        let dateArray = entry.Date.split(".");
        this.Date = new SimpleDate(+dateArray[0], +dateArray[1], +dateArray[2]);
        this.Elements = new Array<ElementModel>();

        if(elements != null)
        {
            elements.forEach(element => {
                this.Elements.push(fromElementInterface(element));
            });
            this.Elements.sort((a, b) => a.index - b.index);
        }        
    }

    MoveElement(currentIndex: number, newIndex: number) {        
        //Gets element with currentIndex out of array
        let before = this.Elements.slice(0, currentIndex+1);
        let after = this.Elements.slice(currentIndex+1);
        let element = before.pop();
        let elements = before.concat(after);

        if(element == undefined) throw Error("Element o indeksie currentIndex nie istnieje.");
        //Inserts it to new index          
        elements = elements.slice(0, newIndex).concat([element]).concat(elements.slice(newIndex));

        this.Elements = elements;

        for(let i = 0; i < this.Elements.length; i++) {
            this.Elements[i].index = i+1;
        }
    }

    getStringDate(): string {
        return this.Date.toDateString("d.m.y");
    }

    getWeirdStringDate(): string {
        return this.Date.toDateString("y-m-d");
    }

    toInterface(): EntryInterface {
        let entry: EntryInterface = {
            id: this.id,
            Title: this.Title,
            Date: this.getStringDate(),
            TitlePhoto: this.TitlePhoto,
            Elements: []
        }

        this.Elements.forEach((element) => entry.Elements?.push(element.toInteface()));

        return entry;
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