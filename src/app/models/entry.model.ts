import { Photo } from "./photo.model";

/**
 * Klasa ilustrująca wpis do kroniki
 */
export class Entry {

    /**
     * Konstruktor wpisu do kroniki
     * @param title Tytuł wpisu
     * @param description Opis wpisu
     * @param date Data dodania wpisu
     * @param photos Zdjęcia wyświetlane w wpisie
     * @param titlePhoto Zdjęcie tytułowe wpisu
     */
    constructor(public title: string, public description: string, public date: Date, public photos: Photo[], public titlePhoto: Photo = photos[0]) {
    }

    getDate(): string {
        return this.date.toLocaleDateString();
    }
}