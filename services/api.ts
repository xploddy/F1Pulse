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

export const getDriverDetails = async (driverId: string): Promise<any | null> => {
    try {
        const response = await api.get(`/drivers/${driverId}.json`);
        return response.data?.MRData?.DriverTable?.Drivers?.[0] || null;
    } catch (error) {
        console.error(`Error fetching driver ${driverId} details:`, error);
        return null;
    }
};

export const getDriverCareerStats = async (driverId: string) => {
    try {
        const [racesRes, winsRes] = await Promise.all([
            api.get(`/drivers/${driverId}/races.json?limit=1`),
            api.get(`/drivers/${driverId}/results/1.json?limit=1`)
        ]);

        let totalPoints = 0;
        let totalPodiums = 0;

        const firstPage = await api.get(`/drivers/${driverId}/results.json?limit=100`);
        let allRaces = firstPage.data?.MRData?.RaceTable?.Races || [];
        const totalRows = parseInt(firstPage.data?.MRData?.total || '0');
        const pages = Math.ceil(totalRows / 100);

        if (pages > 1) {
            for (let i = 1; i < pages; i++) {
                try {
                    const res = await api.get(`/drivers/${driverId}/results.json?limit=100&offset=${i * 100}`);
                    allRaces = allRaces.concat(res.data?.MRData?.RaceTable?.Races || []);
                    // Small delay to prevent 429 from Jolpi API
                    await new Promise(resolve => setTimeout(resolve, 100));
                } catch (err) {
                    console.error('Pagination error driver:', err);
                }
            }
        }

        allRaces.forEach((race: any) => {
            race.Results?.forEach((r: any) => {
                totalPoints += parseFloat(r.points || '0');
                const pos = parseInt(r.position);
                if (pos <= 3) totalPodiums++;
            });
        });

        const activeChampions: Record<string, number> = {
            'hamilton': 7,
            'verstappen': 4,
            'alonso': 2
        };

        return {
            championships: activeChampions[driverId] || 0,
            races: parseInt(racesRes.data?.MRData?.total || '0'),
            wins: parseInt(winsRes.data?.MRData?.total || '0'),
            points: totalPoints,
            podiums: totalPodiums,
        };
    } catch {
        return { championships: 0, races: 0, wins: 0, points: 0, podiums: 0 };
    }
};

export const getDriverCurrentYearResults = async (driverId: string, year: string = 'current'): Promise<any[]> => {
    try {
        const response = await api.get(`/${year}/drivers/${driverId}/results.json`);
        return response.data?.MRData?.RaceTable?.Races || [];
    } catch (error) {
        console.error(`Error fetching driver ${driverId} results for ${year}:`, error);
        return [];
    }
};

export const getConstructorDetails = async (constructorId: string): Promise<any | null> => {
    try {
        const response = await api.get(`/constructors/${constructorId}.json`);
        return response.data?.MRData?.ConstructorTable?.Constructors?.[0] || null;
    } catch (error) {
        console.error(`Error fetching constructor ${constructorId} details:`, error);
        return null;
    }
};

export const getConstructorCareerStats = async (constructorId: string) => {
    try {
        const [racesRes, winsRes] = await Promise.all([
            api.get(`/constructors/${constructorId}/races.json?limit=1`),
            api.get(`/constructors/${constructorId}/results/1.json?limit=1`)
        ]);

        let totalPoints = 0;
        let totalPodiums = 0;

        const firstPage = await api.get(`/constructors/${constructorId}/results.json?limit=100`);
        let allRaces = firstPage.data?.MRData?.RaceTable?.Races || [];
        const totalRows = parseInt(firstPage.data?.MRData?.total || '0');
        const pages = Math.ceil(totalRows / 100);

        if (pages > 1) {
            for (let i = 1; i < pages; i++) {
                try {
                    const res = await api.get(`/constructors/${constructorId}/results.json?limit=100&offset=${i * 100}`);
                    allRaces = allRaces.concat(res.data?.MRData?.RaceTable?.Races || []);
                    // Delay to prevent 429 from Jolpi API
                    await new Promise(resolve => setTimeout(resolve, 200));
                } catch (err) {
                    console.error('Pagination error constructor:', err);
                }
            }
        }

        allRaces.forEach((race: any) => {
            race.Results?.forEach((r: any) => {
                totalPoints += parseFloat(r.points || '0');
                const pos = parseInt(r.position);
                if (pos <= 3) totalPodiums++;
            });
        });

        const activeTeamChampions: Record<string, number> = {
            'ferrari': 16,
            'williams': 9,
            'mclaren': 8,
            'mercedes': 8,
            'red_bull': 6,
            'alpine': 2,
            'renault': 2
        };

        return {
            championships: activeTeamChampions[constructorId] || 0,
            races: parseInt(racesRes.data?.MRData?.total || '0'),
            wins: parseInt(winsRes.data?.MRData?.total || '0'),
            points: totalPoints,
            podiums: totalPodiums,
        };
    } catch {
        return { championships: 0, races: 0, wins: 0, points: 0, podiums: 0 };
    }
};

export const getConstructorCurrentYearResults = async (constructorId: string, year: string = 'current'): Promise<any[]> => {
    try {
        const response = await api.get(`/${year}/constructors/${constructorId}/results.json`);
        return response.data?.MRData?.RaceTable?.Races || [];
    } catch (error) {
        console.error(`Error fetching constructor ${constructorId} results for ${year}:`, error);
        return [];
    }
};

export const getAllSeasonResults = async (year: string = 'current'): Promise<any[]> => {
    try {
        const response = await api.get(`/${year}/results.json?limit=1000`);
        return response.data?.MRData?.RaceTable?.Races || [];
    } catch (error) {
        console.error(`Error fetching all season results for ${year}:`, error);
        return [];
    }
};

export const getAllSeasonQualifying = async (year: string = 'current'): Promise<any[]> => {
    try {
        const response = await api.get(`/${year}/qualifying.json?limit=1000`);
        return response.data?.MRData?.RaceTable?.Races || [];
    } catch (error) {
        console.error(`Error fetching all season qualifying for ${year}:`, error);
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
