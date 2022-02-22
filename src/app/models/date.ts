export class SimpleDate {
    private day: number;
    private month: number;
    private year: number;


    constructor(day: number, month: number, year: number) {
        if (day < 1 || day > 31) throw new Error("Invalid date! Day must be beetween 1 and 31.");
        if (month < 1 || month > 12) throw new Error("Invalid date! Month must be beetween 1 and 12.");        

        this.day = day;
        this.month = month;
        this.year = year;
    }

    public getDay(): number { return this.day };
    public getMonth(): number { return this.month };
    public getYear(): number { return this.year };

    public toDateString(format: string) {
        let day: string = String(this.day);
        if(this.day < 10) day = "0" + day;
        let month: string = String(this.month);
        if (this.month < 10) month = "0" + month;
        let year: string = String(this.year);

        return format.replace("d", day).replace("m", month).replace("y", year);
    }

    public valueOf(): number {
        return Number(this.toDateString("ymd"));
    }
}