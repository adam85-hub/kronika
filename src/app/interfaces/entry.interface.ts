import {ElementInterface } from "./element.interface";

/**
 * Interfejs ilustrujący wpis do kroniki
 */
export interface EntryInterface {
    id: number
    Title: string
    Date: string
    TitlePhoto: string
    Elements: ElementInterface
}
