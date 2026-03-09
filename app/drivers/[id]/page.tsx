import React from 'react';
import { getDriverDetails, getDriverCareerStats, getDriverCurrentYearResults } from '@/services/api';
import { Card, Badge } from '@/components/UI';
import { ArrowLeft, Trophy, Flag, Medal, TrendingUp, Calendar, Award } from 'lucide-react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';

export const revalidate = 86400; // Daily

export default async function DriverProfilePage({ params }: { params: { id: string } }) {
    const driverId = params.id;
    const [driver, stats, currentResults] = await Promise.all([
        getDriverDetails(driverId),
        getDriverCareerStats(driverId),
        getDriverCurrentYearResults(driverId),
    ]);

    if (!driver) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-24 text-center">
                <h1 className="text-2xl font-black uppercase tracking-tighter italic">Driver not found</h1>
                <Link href="/standings" className="inline-flex items-center gap-2 mt-8 text-f1-red font-bold uppercase text-xs hover:underline">
                    <ArrowLeft size={14} /> Back to Standings
                </Link>
            </div>
        );
    }

    // Calcular estatísticas da carreira
    const totalPoints = stats.points;
    const totalWins = stats.wins;
    const totalPodiums = stats.podiums;
    const totalRaces = stats.races;
    const championships = stats.championships;

    const activeSeason = new Date().getFullYear().toString();

    // Obter equipe atual a partir do último resultado da temporada corrente (se houver)
    const currentTeam = currentResults.length > 0
        ? currentResults[currentResults.length - 1].Results[0]?.Constructor?.name
        : null;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <Link href="/standings" className="inline-flex items-center gap-2 mb-8 text-f1-gray hover:text-f1-red transition-colors text-xs font-bold uppercase tracking-widest">
                <ArrowLeft size={14} /> Back to standings
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <Card className="p-6 relative overflow-hidden h-full flex flex-col items-center text-center justify-center min-h-[300px] border-t-4 border-t-f1-red bg-gradient-to-b from-f1-light/5 to-f1-dark/40">
                        <div className="text-[120px] font-black italic text-f1-gray opacity-5 absolute top-0 -left-4 -translate-y-1/4 select-none leading-none">
                            {driver.permanentNumber || 'F1'}
                        </div>
                        <Badge variant="default" className="mb-4 relative z-10">{currentTeam || 'F1 Driver'}</Badge>
                        <h1 className="text-4xl font-black uppercase tracking-tight italic relative z-10">{driver.givenName}</h1>
                        <h2 className="text-5xl font-black uppercase tracking-tighter italic text-f1-red mb-2 relative z-10">{driver.familyName}</h2>
                        <div className="flex gap-4 mt-6">
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] uppercase font-bold text-f1-gray mb-1">Number</span>
                                <span className="text-3xl font-black italic">{driver.permanentNumber || '--'}</span>
                            </div>
                            <div className="w-px bg-f1-light/10"></div>
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] uppercase font-bold text-f1-gray mb-1">Code</span>
                                <span className="text-3xl font-black italic text-f1-gray">{driver.code || '---'}</span>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="md:col-span-2 grid grid-cols-2 gap-4">
                    <Card className="p-6 flex flex-col justify-center">
                        <div className="flex items-start justify-between">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-f1-gray">Championships</span>
                                <div className="text-4xl font-black italic mt-1">{championships}</div>
                            </div>
                            <Trophy className="text-f1-red opacity-80" size={32} />
                        </div>
                    </Card>

                    <Card className="p-6 flex flex-col justify-center">
                        <div className="flex items-start justify-between">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-f1-gray">Race Wins</span>
                                <div className="text-4xl font-black italic mt-1">{totalWins}</div>
                            </div>
                            <Medal className="text-zinc-300 opacity-80" size={32} />
                        </div>
                    </Card>

                    <Card className="p-6 flex flex-col justify-center">
                        <div className="flex items-start justify-between">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-f1-gray">Grands Prix</span>
                                <div className="text-4xl font-black italic mt-1">{totalRaces}</div>
                            </div>
                            <Flag className="text-zinc-300 opacity-80" size={32} />
                        </div>
                    </Card>

                    <Card className="p-6 flex flex-col justify-center">
                        <div className="flex items-start justify-between">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-f1-gray">Total Points</span>
                                <div className="text-4xl font-black italic mt-1">{totalPoints.toLocaleString()}</div>
                            </div>
                            <TrendingUp className="text-zinc-300 opacity-80" size={32} />
                        </div>
                    </Card>

                    <Card className="p-6 flex flex-col justify-center">
                        <div className="flex items-start justify-between">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-f1-gray">Podiums</span>
                                <div className="text-4xl font-black italic mt-1">{totalPodiums}</div>
                            </div>
                            <Award className="text-f1-gray opacity-80" size={32} />
                        </div>
                    </Card>

                    <Card className="p-6 col-span-1 md:col-span-2 flex flex-col justify-center bg-f1-red/5 border-f1-red/20">
                        <div className="flex items-center gap-4">
                            <Calendar className="text-f1-red" size={24} />
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-f1-gray block">Date of Birth / Nationality</span>
                                <span className="text-lg font-bold">
                                    {format(parseISO(driver.dateOfBirth), 'dd MMM, yyyy')} &bull; {driver.nationality}
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {currentResults.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-2xl font-black uppercase tracking-tight italic border-l-8 border-f1-red pl-4 mb-6">Resultados Recentes ({activeSeason})</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {currentResults.slice().reverse().map((race: any) => {
                            const result = race.Results[0];
                            const isWin = result.position === "1";
                            const isPodium = parseInt(result.position) <= 3;

                            return (
                                <Card key={race.round} className={`p-5 flex flex-col ${isWin ? 'border-f1-red/40 bg-f1-red/5' : ''}`}>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Badge variant={isPodium ? 'winner' : 'default'} className="text-[10px] py-0 px-2">
                                            P{result.position}
                                        </Badge>
                                        <span className="text-xs font-bold text-f1-gray tracking-wide truncate">ROUND {race.round}</span>
                                    </div>
                                    <h3 className="font-black italic uppercase tracking-tight text-lg leading-tight truncate">{race.raceName}</h3>

                                    <div className="mt-4 flex items-center justify-between pt-4 border-t border-f1-light/10">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold uppercase text-f1-gray">Points</span>
                                            <span className="font-black">{result.points}</span>
                                        </div>
                                        <div className="flex flex-col text-right">
                                            <span className="text-[10px] font-bold uppercase text-f1-gray">Status</span>
                                            <span className="text-xs font-bold truncate max-w-[100px]">{result.status}</span>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
