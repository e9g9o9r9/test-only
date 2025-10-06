export interface HistoricalEvent {
    year: number;
    description: string;
    category: string;
}

export interface TimePeriod {
    id: number;
    name: string;
    startYear: number;
    endYear: number;
    events: HistoricalEvent[];
}

export interface Event {
    year: number;
    description: string;
    category: string;
}