import React from 'react';
import { getSeasonSchedule, getLastRaceResults } from '@/services/api';
import { Card, Badge } from '@/components/UI';
import { ChevronRight, Trophy, Clock, Zap } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 3600; // Revalidate every hour

export default async function ResultsPage() {
    const races = await getSeasonSchedule();
    const lastRace = await getLastRaceResults();

    const completedRaces = races.filter(r => {
        const raceDate = new Date(`${r.date}T${r.time || '12:00:00Z'}`);
        return raceDate < new Date();
    }).reverse();

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="flex flex-col mb-12">
                <h1 className="text-4xl font-black uppercase tracking-tight italic">Race Results</h1>
                <p className="text-f1-gray mt-2">Latest GP outcomes and historic data.</p>
            </div>

            {!lastRace && completedRaces.length === 0 ? (
                <Card className="p-12 border-dashed flex flex-col items-center justify-center text-center gap-4 mt-8">
                    <Trophy size={48} className="text-f1-gray opacity-50" />
                    <div>
                        <h3 className="text-2xl font-black uppercase tracking-tighter">Nenhum Resultado</h3>
                        <p className="text-f1-gray mt-2 max-w-md mx-auto">
                            O campeonato ainda não começou! Os resultados detalhados de cada Grand Prix e o histórico da temporada aparecerão aqui após cada corrida.
                        </p>
                    </div>
                </Card>
            ) : (
                <>
                    {lastRace && (
                        <section className="mb-12">
                            <h2 className="text-sm font-bold uppercase text-f1-red mb-4 tracking-widest">Latest Grand Prix</h2>
                            <Card className="p-8 bg-gradient-to-br from-f1-card to-background border-f1-red/30">
                                <div className="flex flex-col md:flex-row justify-between gap-8">
                                    <div>
                                        <Badge variant="winner">Winner: {lastRace.Results?.[0].Driver.familyName}</Badge>
                                        <h3 className="text-3xl font-black uppercase tracking-tighter mt-4 italic">{lastRace.raceName}</h3>
                                        <p className="text-f1-gray mt-1">{new Date(lastRace.date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {lastRace.Results?.slice(0, 3).map((result) => (
                                            <div key={result.Driver.driverId} className="flex items-center gap-4">
                                                <span className="text-xl font-black italic text-f1-gray/40 w-6">P{result.position}</span>
                                                <div className="flex flex-col">
                                                    <span className="font-bold">{result.Driver.familyName}</span>
                                                    <span className="text-[10px] uppercase text-f1-gray">{result.Constructor.name}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </section>
                    )}

                    {completedRaces.length > 0 && (
                        <div className="flex flex-col gap-4">
                            <h2 className="text-sm font-bold uppercase text-f1-gray mb-2 tracking-widest">Season History</h2>
                            {completedRaces.map((race) => (
                                <Card key={race.round} className="p-6 flex items-center justify-between hover:border-f1-red/20">
                                    <div className="flex items-center gap-6">
                                        <div className="text-center min-w-[50px]">
                                            <span className="text-xl font-black block italic">R{race.round}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold uppercase tracking-tight">{race.raceName}</h4>
                                            <p className="text-f1-gray text-xs">{race.Circuit.Location.country}</p>
                                        </div>
                                    </div>
                                    <Link href={`/results/${race.round}`} className="flex items-center gap-2 text-xs font-bold uppercase text-f1-gray hover:text-f1-red transition-colors group">
                                        Full Results <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
