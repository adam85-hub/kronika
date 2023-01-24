export interface PrayInterface {
    key?: string,
    month: number,
    year: number,
    description: string,
    videoId: string
}

export function numberToMonth(number: number): string {
    const d = new Date();
    d.setMonth(number-1);
    let month = d.toLocaleDateString("default", { month: "long" });
    month = month.charAt(0).toUpperCase() + month.substring(1);
    return month;
}
