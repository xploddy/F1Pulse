import React from 'react';
import { getDriverStandings, getConstructorStandings } from '@/services/api';
import { Card, Badge } from '@/components/UI';
import { Trophy, ChevronDown, ChevronUp, Minus } from 'lucide-react';

export const revalidate = 3600; // Revalidate every hour

export default async function StandingsPage({
    searchParams,
}: {
    searchParams: { tab?: string };
}) {
    const isTeams = searchParams.tab === 'teams';
    const driverStandings = !isTeams ? await getDriverStandings() : [];
    const constructorStandings = isTeams ? await getConstructorStandings() : [];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="flex flex-col mb-12">
                <h1 className="text-4xl font-black uppercase tracking-tight italic">Standings</h1>
                <p className="text-f1-gray mt-2">World Championship classifications.</p>
            </div>

            <div className="flex gap-2 mb-8 bg-f1-card p-1 rounded-lg w-fit">
                <a
                    href="/standings"
                    className={`px-6 py-2 rounded-md font-bold text-sm transition-all ${!isTeams ? 'bg-f1-red text-white' : 'text-f1-gray hover:text-white'}`}
                >
                    Drivers
                </a>
                <a
                    href="/standings?tab=teams"
                    className={`px-6 py-2 rounded-md font-bold text-sm transition-all ${isTeams ? 'bg-f1-red text-white' : 'text-f1-gray hover:text-white'}`}
                >
                    Constructors
                </a>
            </div>

            <div className="flex flex-col gap-2">
                {!isTeams ? (
                    driverStandings.map((standing) => (
                        <Card key={standing.Driver.driverId} className="p-4 md:p-6 flex items-center justify-between group">
                            <div className="flex items-center gap-4 md:gap-8">
                                <span className="text-2xl font-black italic text-f1-gray/40 w-8">{standing.position}</span>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg md:text-xl font-bold">
                                            {standing.Driver.givenName} <span className="uppercase">{standing.Driver.familyName}</span>
                                        </h3>
                                        {standing.position === "1" && <Trophy size={16} className="text-f1-red" />}
                                    </div>
                                    <p className="text-f1-gray text-xs md:text-sm uppercase tracking-wider font-medium">{standing.Constructors[0]?.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="hidden md:flex flex-col items-end">
                                    <span className="text-[10px] uppercase font-bold text-f1-gray tracking-tighter">Wins</span>
                                    <span className="font-bold">{standing.wins}</span>
                                </div>
                                <div className="flex flex-col items-end min-w-[60px]">
                                    <span className="text-[10px] uppercase font-bold text-f1-red tracking-tighter">Points</span>
                                    <span className="text-xl font-black italic">{standing.points}</span>
                                </div>
                            </div>
                        </Card>
                    ))
                ) : (
                    constructorStandings.map((standing) => (
                        <Card key={standing.Constructor.constructorId} className="p-4 md:p-6 flex items-center justify-between group">
                            <div className="flex items-center gap-4 md:gap-8">
                                <span className="text-2xl font-black italic text-f1-gray/40 w-8">{standing.position}</span>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight">
                                            {standing.Constructor.name}
                                        </h3>
                                        {standing.position === "1" && <Trophy size={16} className="text-f1-red" />}
                                    </div>
                                    <p className="text-f1-gray text-xs md:text-sm">{standing.Constructor.nationality}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="hidden md:flex flex-col items-end">
                                    <span className="text-[10px] uppercase font-bold text-f1-gray tracking-tighter">Wins</span>
                                    <span className="font-bold">{standing.wins}</span>
                                </div>
                                <div className="flex flex-col items-end min-w-[60px]">
                                    <span className="text-[10px] uppercase font-bold text-f1-red tracking-tighter">Points</span>
                                    <span className="text-xl font-black italic">{standing.points}</span>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
