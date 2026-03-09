import React from 'react';
import { getConstructorDetails, getConstructorCareerStats, getConstructorCurrentYearResults } from '@/services/api';
import { Card, Badge } from '@/components/UI';
import { ArrowLeft, Trophy, Flag, Medal, TrendingUp, Users, Award } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 86400; // Daily

export default async function TeamProfilePage({ params }: { params: { id: string } }) {
    const teamId = params.id;
    const [team, stats, currentResults] = await Promise.all([
        getConstructorDetails(teamId),
        getConstructorCareerStats(teamId),
        getConstructorCurrentYearResults(teamId),
    ]);

    if (!team) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-24 text-center">
                <h1 className="text-2xl font-black uppercase tracking-tighter italic">Team not found</h1>
                <Link href="/standings?tab=teams" className="inline-flex items-center gap-2 mt-8 text-f1-red font-bold uppercase text-xs hover:underline">
                    <ArrowLeft size={14} /> Back to Standings
                </Link>
            </div>
        );
    }

    // Estatísticas calculadas no servidor (API Jolpi consolidada)
    const totalPoints = stats.points;
    const totalWins = stats.wins;
    const totalPodiums = stats.podiums;
    const totalRaces = stats.races;
    const championships = stats.championships;

    const activeSeason = new Date().getFullYear().toString();

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <Link href="/standings?tab=teams" className="inline-flex items-center gap-2 mb-8 text-f1-gray hover:text-f1-red transition-colors text-xs font-bold uppercase tracking-widest">
                <ArrowLeft size={14} /> Back to standings
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <Card className="p-6 relative overflow-hidden h-full flex flex-col items-center text-center justify-center min-h-[300px] border-t-4 border-t-f1-red bg-gradient-to-b from-f1-light/5 to-f1-dark/40">
                        <Users className="absolute top-4 outline-none text-f1-gray opacity-5 w-64 h-64 -translate-y-12" />
                        <h1 className="text-4xl font-black uppercase tracking-tight italic relative z-10">{team.name}</h1>
                        <Badge variant="default" className="mt-4 relative z-10">{team.nationality}</Badge>
                    </Card>
                </div>

                <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
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
                        </div>
                    </Card>

                    <Card className="p-6 flex flex-col justify-center">
                        <div className="flex items-start justify-between">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-f1-gray">Podiums</span>
                                <div className="text-4xl font-black italic mt-1">{totalPodiums}</div>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 flex flex-col justify-center">
                        <div className="flex items-start justify-between">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-f1-gray">Entries</span>
                                <div className="text-4xl font-black italic mt-1">{totalRaces}</div>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 col-span-2 md:col-span-3 flex flex-col justify-center bg-f1-red/5 border-f1-red/20">
                        <div className="flex items-start justify-between">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-f1-gray">Total Points</span>
                                <div className="text-2xl font-black italic mt-1">{totalPoints.toLocaleString()}</div>
                            </div>
                            <TrendingUp className="text-f1-red opacity-80" size={32} />
                        </div>
                    </Card>
                </div>
            </div>

            {currentResults.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-2xl font-black uppercase tracking-tight italic border-l-8 border-f1-red pl-4 mb-6">Resultados Recentes ({activeSeason})</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {currentResults.slice().reverse().map((race: any) => {
                            // A API retorna os dois pilotos da equipe na mesma corrida
                            const teamResults = race.Results;
                            const pointsEarned = teamResults.reduce((sum: number, r: any) => sum + parseFloat(r.points), 0);
                            const bestPosition = Math.min(...teamResults.map((r: any) => parseInt(r.position)));

                            return (
                                <Card key={race.round} className={`p-5 flex flex-col ${bestPosition === 1 ? 'border-f1-red/40 bg-f1-red/5' : ''}`}>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Badge variant={bestPosition <= 3 ? 'winner' : 'default'} className="text-[10px] py-0 px-2">
                                            Best: P{bestPosition}
                                        </Badge>
                                        <span className="text-xs font-bold text-f1-gray tracking-wide truncate">ROUND {race.round}</span>
                                    </div>
                                    <h3 className="font-black italic uppercase tracking-tight text-lg leading-tight truncate">{race.raceName}</h3>

                                    <div className="mt-4 flex items-center justify-between pt-4 border-t border-f1-light/10">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold uppercase text-f1-gray">Points Earned</span>
                                            <span className="font-black">+{pointsEarned} pts</span>
                                        </div>
                                        <div className="flex flex-col text-right">
                                            <span className="text-[10px] font-bold uppercase text-f1-gray">Drivers Finish</span>
                                            <span className="text-xs font-bold">P{teamResults[0]?.position} & P{teamResults[1]?.position || '-'}</span>
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
