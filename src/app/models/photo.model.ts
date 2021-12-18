/**
 * Klasa ilustrująca zdjęcie w wpisie do kroniki
 */
export class Photo {
    /**
     * Konstruktor zdjęcia we wpisie do kroniki
     * @param src Ścieżka do zdjęcia
     * @param alt Tekst wyświetlany gdy jest problem z załadowaniem zdjęcia
     */
    constructor(public src: string, public alt: string = src){
        
    }
}