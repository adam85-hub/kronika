import { Entry } from "./models/entry.model";
import { Photo } from "./models/photo.model";

const Photos = {
    [0]: [
        new Photo("http://fzskatowicepodlesie.pl/parafia/galeria/m/2021/20211107/20211107-182855.jpg")
    ]
}

export const ENTRIES: Entry[] = [
    new Entry("101 rocznica poświęcenia kamienia węgielnego", "Dziś przypada 101 rocznica poświęcenia kamienia węgielnego w naszym kościele. Ks. Biskup Marek Szkudło przewodniczył Mszy św. o godz. 11.00. Wygłosi homilię oraz odsłonił pamiątkową tablicę, upamiętniającą konsekrację naszego kościoła, której w na 100-lecie budowy naszego kościoła dokonał rok temu, dnia 30 sierpnia 2020 roku, ks. Arcybiskup Wiktor Skworc. W koncelebrze uczestniczył będzie także Kanclerz Kurii Metropolitalnej, ks. Jan Smolec.", new Date(Date.UTC(2021, 11, 7)), Photos[0])
]