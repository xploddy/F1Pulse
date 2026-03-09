import React from 'react';
import { getDriverStandings, getAllSeasonResults, getAllSeasonQualifying } from '@/services/api';
import { Card, Badge } from '@/components/UI';
import { Swords, Check, Info } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 86400; // Daily

export default async function HeadToHeadPage() {
    const [standings, allRaces, allQuali] = await Promise.all([
        getDriverStandings(),
        getAllSeasonResults(),
        getAllSeasonQualifying()
    ]);

    // Agrupar pilotos por equipe
    const teamsData: Record<string, { team: any, drivers: any[] }> = {};
    standings.forEach((standing: any) => {
        const team = standing.Constructors[0];
        if (!team) return;

        if (!teamsData[team.constructorId]) {
            teamsData[team.constructorId] = { team, drivers: [] };
        }
        teamsData[team.constructorId].drivers.push(standing.Driver);
    });

    // Calcular H2H
    const h2hStats = Object.values(teamsData)
        .filter(t => t.drivers.length >= 2)
        .map(t => {
            // Pegamos os dois primeiros pilotos (geralmente os principais)
            const d1 = t.drivers[0];
            const d2 = t.drivers[1];

            let q1 = 0, q2 = 0;
            let r1 = 0, r2 = 0;

            // Processar Qualy
            allQuali.forEach(race => {
                const results = race.QualifyingResults;
                const rD1 = results?.find((r: any) => r.Driver.driverId === d1.driverId);
                const rD2 = results?.find((r: any) => r.Driver.driverId === d2.driverId);

                if (rD1 && rD2) {
                    if (parseInt(rD1.position) < parseInt(rD2.position)) q1++;
                    else if (parseInt(rD2.position) < parseInt(rD1.position)) q2++;
                }
            });

            // Processar Corridas
            allRaces.forEach(race => {
                const results = race.Results;
                const rD1 = results?.find((r: any) => r.Driver.driverId === d1.driverId);
                const rD2 = results?.find((r: any) => r.Driver.driverId === d2.driverId);

                // Só conta a disputa direta se ambos largaram (tem resultado)
                if (rD1 && rD2) {
                    if (parseInt(rD1.position) < parseInt(rD2.position)) r1++;
                    else if (parseInt(rD2.position) < parseInt(rD1.position)) r2++;
                }
            });

            return { team: t.team, d1, d2, q1, q2, r1, r2 };
        });

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="flex flex-col mb-12">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-f1-red/10 rounded-xl">
                        <Swords className="text-f1-red" size={32} />
                    </div>
                </div>
                <h1 className="text-4xl font-black uppercase tracking-tight italic">Head to Head</h1>
                <p className="text-f1-gray mt-2">Batalhas diretas entre companheiros de equipe nas Sessões de Qualificação e Corridas.</p>
            </div>

            {h2hStats.length === 0 ? (
                <Card className="p-12 border-dashed flex flex-col items-center justify-center text-center gap-4">
                    <Swords size={48} className="text-f1-gray opacity-50" />
                    <div>
                        <h3 className="text-2xl font-black uppercase tracking-tighter">Temporada não iniciada</h3>
                        <p className="text-f1-gray mt-2 max-w-md mx-auto">
                            Ainda não temos resultados de corridas ou qualificações para comparar os companheiros de equipe. Volte após a primeira etapa!
                        </p>
                    </div>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {h2hStats.map((stat, idx) => {
                        const qTotal = stat.q1 + stat.q2;
                        const rTotal = stat.r1 + stat.r2;

                        // % width bar calculations
                        const q1Pct = qTotal > 0 ? (stat.q1 / qTotal) * 100 : 50;
                        const q2Pct = qTotal > 0 ? (stat.q2 / qTotal) * 100 : 50;
                        const r1Pct = rTotal > 0 ? (stat.r1 / rTotal) * 100 : 50;
                        const r2Pct = rTotal > 0 ? (stat.r2 / rTotal) * 100 : 50;

                        return (
                            <Card key={idx} className="p-5 overflow-hidden relative group border-t-4 border-t-f1-gray/20 hover:border-t-f1-red transition-colors">
                                <Link href={`/teams/${stat.team.constructorId}`} className="block text-center mb-6 z-10 relative hover:opacity-80 transition-opacity">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-f1-gray">{stat.team.name}</h3>
                                </Link>

                                <div className="flex justify-between items-center px-4 mb-8 z-10 relative">
                                    <Link href={`/drivers/${stat.d1.driverId}`} className="flex flex-col items-center group-hover/left text-center">
                                        <span className="text-2xl font-black uppercase italic tracking-tighter hover:text-f1-red transition-colors">{stat.d1.familyName}</span>
                                        <span className="text-[10px] uppercase font-bold text-f1-gray">{stat.d1.code}</span>
                                    </Link>

                                    <div className="text-f1-red opacity-30">
                                        <Swords size={24} />
                                    </div>

                                    <Link href={`/drivers/${stat.d2.driverId}`} className="flex flex-col items-center group-hover/right text-center">
                                        <span className="text-2xl font-black uppercase italic tracking-tighter hover:text-f1-red transition-colors">{stat.d2.familyName}</span>
                                        <span className="text-[10px] uppercase font-bold text-f1-gray">{stat.d2.code}</span>
                                    </Link>
                                </div>

                                {/* Qualifying Bar */}
                                <div className="mb-6 z-10 relative px-2">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className={`text-xl font-black ${stat.q1 > stat.q2 ? 'text-white' : 'text-f1-gray'}`}>{stat.q1}</span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-f1-gray">Qualifying</span>
                                        <span className={`text-xl font-black ${stat.q2 > stat.q1 ? 'text-white' : 'text-f1-gray'}`}>{stat.q2}</span>
                                    </div>
                                    <div className="h-2 w-full bg-f1-dark rounded-full overflow-hidden flex">
                                        <div className="h-full bg-f1-light transition-all duration-1000 ease-in-out" style={{ width: `${q1Pct}%` }} />
                                        <div className="h-full bg-f1-red transition-all duration-1000 ease-in-out" style={{ width: `${q2Pct}%` }} />
                                    </div>
                                </div>

                                {/* Race Bar */}
                                <div className="mb-2 z-10 relative px-2">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className={`text-xl font-black ${stat.r1 > stat.r2 ? 'text-white' : 'text-f1-gray'}`}>{stat.r1}</span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-f1-gray">Race Finish</span>
                                        <span className={`text-xl font-black ${stat.r2 > stat.r1 ? 'text-white' : 'text-f1-gray'}`}>{stat.r2}</span>
                                    </div>
                                    <div className="h-2 w-full bg-f1-dark rounded-full overflow-hidden flex">
                                        <div className="h-full bg-f1-light transition-all duration-1000 ease-in-out" style={{ width: `${r1Pct}%` }} />
                                        <div className="h-full bg-f1-red transition-all duration-1000 ease-in-out" style={{ width: `${r2Pct}%` }} />
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}

            <Card className="mt-8 p-6 bg-f1-card/30 border-dashed">
                <div className="flex items-start gap-4">
                    <Info className="text-f1-red shrink-0" size={24} />
                    <p className="text-xs text-f1-gray leading-relaxed">
                        A comparação <strong>Head to Head</strong> (Batalha Interna) computa em quantas rodadas de Qualificação ou Corrida principal um piloto superou o seu companheiro direto de equipe. Abandonos duplos podem não ser computados se os pilotos não tiverem posições finais claras. Essa estatística foca pura e simplesmente na disputa direta de posições garantidas.
                    </p>
                </div>
            </Card>
        </div>
    );
}
