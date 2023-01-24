import {ElementInterface } from "./element.interface";

/**
 * Interfejs ilustrujący wpis do kroniki
 */
export interface EntryInterface {
    key?: string
    Title: string
    Date: string
    TitlePhoto: string
    Elements?: ElementInterface[]
}

export interface FailedEntryInterface {
    key: string,
    url: string
}
