/**
 * Interfejs ilustrująca wpis do kroniki
 */
export interface Entry {
    id: number
    title: string
    description: string
    date: Date
    photos: string[]
    titlePhoto: string
}
