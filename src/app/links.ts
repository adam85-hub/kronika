import { LinkInterface } from "./interfaces/link.interface";

export const Links: LinkInterface[] = [
    { name: "Strona główna", path: "/strona-główna" },
    { name: "Kronika", path: "/kronika" },
    { name: "Youtube", path: "https://www.youtube.com/channel/UCBEM_qBwUvQvkGgh-YARZGg/videos", blank: true },
    { name: "Ewangelia", path: "http://biblijni.pl/", blank: true },    
    { name: "Strona parafii", path: "http://www.parafia-podlesie.pl/", blank: true },
    { name: "Kontakt", path: "/kontakt" },
];

export const InneLinks: LinkInterface[] = [
    { name: "Linki", path: "/" },
    { name: "Adoracja", path: "https://www.youtube.com/watch?v=P9U27wo7FlY", blank: true },
    { name: "Modlitwy", path: "/modlitwy" },
    { name: "Panel moderatora", path: "/login" },
];
