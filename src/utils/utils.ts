import { HISTORICAL_PERIODS } from "../constants";
import { HistoricalEvent, TimePeriod } from "../types/types";

export const getPeriodById = (id: number): TimePeriod | undefined => {
    return HISTORICAL_PERIODS.find(period => period.id === id);
};

export const getEventsByCategory = (category: HistoricalEvent['category']): HistoricalEvent[] => {
    return HISTORICAL_PERIODS.flatMap(period =>
        period.events.filter(event => event.category === category)
    );
};

export const getTotalEventsCount = (): number => {
    return HISTORICAL_PERIODS.reduce((total, period) => total + period.events.length, 0);
};