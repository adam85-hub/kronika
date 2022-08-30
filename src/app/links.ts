import { LinkInterface } from "./interfaces/link.interface";

export const Links: LinkInterface[] = [
    { name: "Strona główna", path: "/strona-główna" },
    { name: "Kronika", path: "/kronika" },
    { name: "Medytacje", path: "/medytacje" },
    { name: "Modlitwy", path: "/modlitwy" },
    { name: "Ewangelia", path: "http://biblijni.pl/", blank: true },    
];

export const InneLinks: LinkInterface[] = [    
    { name: "Youtube", path: "https://www.youtube.com/channel/UCBEM_qBwUvQvkGgh-YARZGg/videos", blank: true },
    { name: "Adoracja", path: "https://www.youtube.com/watch?v=P9U27wo7FlY", blank: true },
    { name: "Strona parafii", path: "http://www.parafia-podlesie.pl/", blank: true },    
    { name: "Panel moderatora", path: "/login" },
];
