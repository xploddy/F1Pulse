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
        const response = await api.get('/driverStandings/1.json?limit=100');
        return response.data?.MRData?.StandingsTable?.StandingsLists || [];
    } catch (error) {
        console.error('Error fetching world champions:', error);
        return [];
    }
};

export const getRaceResults = async (round: string, year: string = 'current'): Promise<any | null> => {
    try {
        const response = await api.get(`/${year}/${round}/results.json`);
        return response.data?.MRData?.RaceTable?.Races?.[0] || null;
    } catch (error) {
        console.error(`Error fetching results for round ${round}:`, error);
        return null;
    }
};

export const getQualifyingResults = async (round: string, year: string = 'current'): Promise<any | null> => {
    try {
        const response = await api.get(`/${year}/${round}/qualifying.json`);
        return response.data?.MRData?.RaceTable?.Races?.[0] || null;
    } catch (error) {
        console.error(`Error fetching qualifying for round ${round}:`, error);
        return null;
    }
};

export const getSprintResults = async (round: string, year: string = 'current'): Promise<any | null> => {
    try {
        const response = await api.get(`/${year}/${round}/sprint.json`);
        return response.data?.MRData?.RaceTable?.Races?.[0] || null;
    } catch (error) {
        console.error(`Error fetching sprint for round ${round}:`, error);
        return null;
    }
};

export const getSeasonWinners = async (year: string = 'current'): Promise<any[]> => {
    try {
        const response = await api.get(`/${year}/results/1.json`);
        return response.data?.MRData?.RaceTable?.Races || [];
    } catch (error) {
        console.error(`Error fetching season winners for ${year}:`, error);
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

        // Query específica para Formula 1 com termos que excluem ambiguidades
        const query = encodeURIComponent(
            '"Formula 1" OR "Formula One" OR "Grande Prêmio" OR "GP de" OR "Verstappen" OR "Hamilton" OR "Leclerc" OR "Norris" OR "McLaren F1" OR "Ferrari F1" OR "Red Bull Racing" OR "Mercedes F1" OR "corrida de F1"'
        );

        // Busca notícias dos últimos 3 dias
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        const fromDate = threeDaysAgo.toISOString().split('T')[0]; // Formato YYYY-MM-DD

        const response = await axios.get(
            `https://newsapi.org/v2/everything?q=${query}&language=pt&sortBy=publishedAt&pageSize=50&from=${fromDate}&apiKey=${apiKey}`
        );

        const articles = response.data?.articles || [];

        // Palavras-chave obrigatórias: ao menos uma deve estar presente no título ou descrição
        const f1Keywords = [
            'formula 1', 'formula one', 'f1', 'grande prêmio', 'gp de', 'motorsport',
            'piloto', 'grid', 'paddock', 'pit stop', 'pole position', 'verstappen',
            'hamilton', 'leclerc', 'norris', 'sainz', 'russell', 'alonso', 'perez',
            'mclaren', 'ferrari', 'red bull', 'mercedes', 'alpine', 'aston martin',
            'williams', 'haas', 'racing bulls', 'temporada de f1', 'corrida',
        ];

        // Palavras que indicam que o artigo NÃO é sobre F1
        const excludeKeywords = [
            'fórmula injetável', 'fórmula magistral', 'matemática', 'química',
            'programação', 'excel', 'planilha', 'fórmula do amor',
        ];

        const filtered = articles.filter((article: any) => {
            const text = `${article.title || ''} ${article.description || ''}`.toLowerCase();

            // Descarta artigos sem título ou com URLs inválidas
            if (!article.title || !article.url || article.title === '[Removed]') return false;

            // Descarta se contém palavras de exclusão óbvias
            if (excludeKeywords.some(kw => text.includes(kw))) return false;

            // Mantém apenas se tiver pelo menos uma keyword de F1
            return f1Keywords.some(kw => text.includes(kw));
        });

        // Retorna até 20 notícias depois do filtro
        return filtered.slice(0, 20);
    } catch (error) {
        console.error('Error fetching F1 news:', error);
        return [];
    }
};
