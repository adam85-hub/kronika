import { EntryInterface, FailedEntryInterface } from "./entry.interface"

export interface ResponseInterface 
{ 
    entries: EntryInterface[]
}

export interface YearsResponseInterface
{
    years: number[]
}

export interface FailedEntriesResponseInterface {
    failedEntries: FailedEntryInterface[];
}