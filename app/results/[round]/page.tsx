import React from 'react';
import { getRaceResults, getQualifyingResults, getSprintResults } from '@/services/api';
import { Card, Badge } from '@/components/UI';
import { Trophy, ArrowLeft, Timer, Gauge, Flag } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 86400; // Daily

export default async function RaceResultsDetailPage({ params, searchParams }: { params: { round: string }, searchParams?: { session?: string } }) {
    const sessionType = searchParams?.session || 'race';

    let race;
    let title = 'Race Results';

    if (sessionType === 'qualifying') {
        race = await getQualifyingResults(params.round);
        title = 'Qualifying Results';
    } else if (sessionType === 'sprint') {
        race = await getSprintResults(params.round);
        title = 'Sprint Results';
    } else {
        race = await getRaceResults(params.round);
    }

    const results = race?.Results || race?.QualifyingResults || race?.SprintResults;

    if (!race) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-24 text-center">
                <Trophy size={48} className="mx-auto text-f1-gray opacity-20 mb-4" />
                <h1 className="text-2xl font-black uppercase tracking-tighter italic">Results not found</h1>
                <p className="text-f1-gray mt-2">Historic or upcoming race details may not be available yet.</p>
                <Link href="/results" className="inline-flex items-center gap-2 mt-8 text-f1-red font-bold uppercase text-xs hover:underline">
                    <ArrowLeft size={14} /> Back to Results
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <Link href="/results" className="inline-flex items-center gap-2 mb-8 text-f1-gray hover:text-f1-red transition-colors text-xs font-bold uppercase tracking-widest">
                <ArrowLeft size={14} /> Back to results
            </Link>

            <div className="flex flex-col mb-12">
                <div className="flex items-center gap-3 mb-2">
                    <Badge variant="winner" className="w-fit">Round {race.round}</Badge>
                    <span className="text-xs font-bold uppercase text-f1-red tracking-widest bg-f1-red/10 px-2 py-0.5 rounded">{title}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight italic">{race.raceName}</h1>
                <p className="text-f1-gray mt-2 font-medium">{race.Circuit.circuitName}, {race.Circuit.Location.country}</p>
            </div>

            <div className="flex gap-4 mb-8">
                <Link href={`/results/${race.round}?session=qualifying`} className={`text-xs font-bold uppercase tracking-widest pb-1 border-b-2 ${sessionType === 'qualifying' ? 'border-f1-red text-white' : 'border-transparent text-f1-gray hover:text-white'}`}>Qualifying</Link>
                {race.SprintResults || sessionType === 'sprint' ? (
                    <Link href={`/results/${race.round}?session=sprint`} className={`text-xs font-bold uppercase tracking-widest pb-1 border-b-2 ${sessionType === 'sprint' ? 'border-f1-red text-white' : 'border-transparent text-f1-gray hover:text-white'}`}>Sprint</Link>
                ) : null}
                <Link href={`/results/${race.round}?session=race`} className={`text-xs font-bold uppercase tracking-widest pb-1 border-b-2 ${sessionType === 'race' ? 'border-f1-red text-white' : 'border-transparent text-f1-gray hover:text-white'}`}>Race</Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between px-6 py-4 bg-f1-dark/40 rounded-t-xl text-[10px] uppercase font-bold text-f1-gray">
                    <div className="flex gap-6 md:gap-12 w-full md:w-auto items-center">
                        <span className="w-8">Pos</span>
                        <span className="w-32 md:w-48">Driver</span>
                        {sessionType !== 'qualifying' && <span className="hidden md:block w-16 text-center">Laps</span>}
                        {sessionType !== 'qualifying' && <span className="hidden sm:block w-32 text-right">Time / Status</span>}
                        {sessionType === 'qualifying' && <span className="hidden sm:block w-16 text-right">Q1</span>}
                        {sessionType === 'qualifying' && <span className="hidden sm:block w-16 text-right">Q2</span>}
                        {sessionType === 'qualifying' && <span className="hidden sm:block w-16 text-right">Q3</span>}
                    </div>
                    <div className="flex gap-4 md:gap-12 text-right">
                        <span className="hidden md:block w-24">Constructor</span>
                        {sessionType !== 'qualifying' && <span className="w-16 md:w-20">Points</span>}
                    </div>
                </div>

                {results?.map((result: any) => {
                    const isRetired = result.status && !result.status.match(/Finished|\+[0-9] Lap/i);
                    return (
                        <Card key={result.number} className={`p-4 flex items-center justify-between ${result.position === '1' ? 'border-f1-red/30 bg-f1-red/5' : ''}`}>
                            <div className="flex items-center gap-6 md:gap-12 w-full md:w-auto">
                                <div className="min-w-[40px] text-center">
                                    <span className={`text-2xl font-black italic ${result.position === '1' ? 'text-f1-red' : 'text-f1-gray/40'}`}>
                                        {result.position}
                                    </span>
                                </div>
                                <div className="flex flex-col w-32 md:w-48">
                                    <Link href={`/drivers/${result.Driver.driverId}`} className="font-black uppercase text-sm tracking-tight truncate hover:text-f1-red transition-colors" title={`${result.Driver.givenName} ${result.Driver.familyName}`}>
                                        {result.Driver.givenName} {result.Driver.familyName}
                                    </Link>
                                    <span className="text-[10px] text-f1-gray font-bold">{result.Driver.code || result.number}</span>
                                </div>

                                {sessionType !== 'qualifying' && (
                                    <>
                                        <div className="hidden md:block w-16 text-center">
                                            <span className="text-xs font-bold text-f1-gray">{result.laps}</span>
                                        </div>

                                        <div className="hidden sm:block w-32 text-right truncate">
                                            <span className={`text-xs font-bold ${isRetired ? 'text-f1-red' : 'text-f1-gray'}`} title={result.Time?.time || result.status}>
                                                {result.Time?.time || result.status}
                                            </span>
                                        </div>
                                    </>
                                )}

                                {sessionType === 'qualifying' && (
                                    <>
                                        <div className="hidden sm:block w-16 text-right truncate"><span className="text-[10px] font-bold text-f1-gray">{result.Q1 || '-'}</span></div>
                                        <div className="hidden sm:block w-16 text-right truncate"><span className="text-[10px] font-bold text-f1-gray">{result.Q2 || '-'}</span></div>
                                        <div className="hidden sm:block w-16 text-right truncate"><span className="text-[10px] font-bold text-white">{result.Q3 || '-'}</span></div>
                                    </>
                                )}
                            </div>

                            <div className="flex items-center gap-4 md:gap-12 text-right">
                                <div className="hidden md:block w-24">
                                    <Link href={`/teams/${result.Constructor.constructorId}`} className="text-[10px] uppercase font-black tracking-tighter truncate block hover:text-f1-red transition-colors">{result.Constructor.name}</Link>
                                </div>
                                {sessionType !== 'qualifying' && (
                                    <div className="w-16 md:w-20">
                                        <Badge variant={parseInt(result.points) > 0 ? 'winner' : 'default'} className="text-xs">
                                            {result.points} pts
                                        </Badge>
                                    </div>
                                )}
                            </div>
                        </Card>
                    );
                })}
            </div>

            {results?.[0]?.FastestLap && (
                <Card className="mt-8 p-6 border-f1-red/20 bg-gradient-to-r from-f1-card to-transparent border-l-4">
                    <div className="flex items-center gap-4">
                        <Gauge className="text-f1-red" size={24} />
                        <div>
                            <h4 className="text-[10px] font-black uppercase text-f1-red tracking-widest">Fastest Lap</h4>
                            <p className="text-lg font-black italic uppercase">
                                {results[0].Driver.familyName} — {results[0].FastestLap.Time?.time}
                            </p>
                            <span className="text-xs text-f1-gray">{results[0].FastestLap.AverageSpeed?.speed} {results[0].FastestLap.AverageSpeed?.units}</span>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}
