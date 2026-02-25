import axios from 'axios';
import { Race, DriverStanding, ConstructorStanding } from '@/types/f1';

const API_BASE_URL = 'https://api.jolpi.ca/ergast/f1';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const getNextRace = async (): Promise<Race | null> => {
    try {
        const response = await api.get('/current/next.json');
        return response.data?.MRData?.RaceTable?.Races?.[0] || null;
    } catch (error) {
        console.error('Error fetching next race:', error);
        return null;
    }
};

export const getSeasonSchedule = async (year: string = 'current'): Promise<Race[]> => {
    try {
        const response = await api.get(`/${year}.json`);
        return response.data?.MRData?.RaceTable?.Races || [];
    } catch (error) {
        console.error('Error fetching season schedule:', error);
        return [];
    }
};

export const getDriverStandings = async (year: string = 'current'): Promise<DriverStanding[]> => {
    try {
        const response = await api.get(`/${year}/driverStandings.json`);
        return response.data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings || [];
    } catch (error) {
        console.error('Error fetching driver standings:', error);
        return [];
    }
};

export const getConstructorStandings = async (year: string = 'current'): Promise<ConstructorStanding[]> => {
    try {
        const response = await api.get(`/${year}/constructorStandings.json`);
        return response.data?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings || [];
    } catch (error) {
        console.error('Error fetching constructor standings:', error);
        return [];
    }
};

export const getLastRaceResults = async (): Promise<Race | null> => {
    try {
        const response = await api.get('/current/last/results.json');
        return response.data?.MRData?.RaceTable?.Races?.[0] || null;
    } catch (error) {
        console.error('Error fetching last race results:', error);
        return null;
    }
};

export const getRaceByRound = async (round: string, year: string = 'current'): Promise<Race | null> => {
    try {
        const response = await api.get(`/${year}/${round}.json`);
        return response.data?.MRData?.RaceTable?.Races?.[0] || null;
    } catch (error) {
        console.error(`Error fetching race for round ${round}:`, error);
        return null;
    }
};

export const getWorldChampions = async (): Promise<any[]> => {
    try {
        // Jolpi API might require a season for standings, fallback to current if 1.json fails
        const response = await api.get('/current/driverStandings.json');
        return response.data?.MRData?.StandingsTable?.StandingsLists || [];
    } catch (error) {
        console.error('Error fetching world champions:', error);
        return [];
    }
};

export const getDriversHistory = async (): Promise<any[]> => {
    try {
        const response = await api.get('/drivers.json?limit=1000');
        return response.data?.MRData?.DriverTable?.Drivers || [];
    } catch (error) {
        console.error('Error fetching drivers history:', error);
        return [];
    }
};

export const getCurrentDrivers = async (): Promise<any[]> => {
    try {
        const response = await api.get('/current/drivers.json');
        return response.data?.MRData?.DriverTable?.Drivers || [];
    } catch (error) {
        console.error('Error fetching current drivers:', error);
        return [];
    }
};

export const getCurrentConstructors = async (): Promise<any[]> => {
    try {
        const response = await api.get('/current/constructors.json');
        return response.data?.MRData?.ConstructorTable?.Constructors || [];
    } catch (error) {
        console.error('Error fetching current constructors:', error);
        return [];
    }
};
export const getF1News = async (): Promise<any[]> => {
    try {
        const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY || '5afe87181f774c0fad0d04ca5f8a180c';
        const response = await axios.get(`https://newsapi.org/v2/everything?q="Formula 1" OR "F1"&language=pt&sortBy=publishedAt&pageSize=20&apiKey=${apiKey}`);
        return response.data?.articles || [];
    } catch (error) {
        console.error('Error fetching F1 news:', error);
        return [];
    }
};
