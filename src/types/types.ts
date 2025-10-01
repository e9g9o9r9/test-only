export interface HistoricalEvent {
    year: number;
    description: string;
    category: 'technology' | 'science' | 'politics' | 'culture' | 'sports';
}

export interface TimePeriod {
    id: number;
    name: string;
    startYear: number;
    endYear: number;
    events: HistoricalEvent[];
}