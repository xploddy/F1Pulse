import React from 'react';
import { getWorldChampions } from '@/services/api';
import { Card, Badge } from '@/components/UI';
import { Trophy, History as HistoryIcon, User, Star, Flag, Timer, Map as MapIcon, Users } from 'lucide-react';

export const revalidate = 86400; // Daily

const TOP_DRIVERS = [
    { name: 'Lewis Hamilton', wins: 105, titles: 7 },
    { name: 'Michael Schumacher', wins: 91, titles: 7 },
    { name: 'Max Verstappen', wins: 62, titles: 3 }, // Updated for 2026 approx
    { name: 'Sebastian Vettel', wins: 53, titles: 4 },
    { name: 'Alain Prost', wins: 51, titles: 4 },
    { name: 'Ayrton Senna', wins: 41, titles: 3 },
    { name: 'Fernando Alonso', wins: 32, titles: 2 },
    { name: 'Nigel Mansell', wins: 31, titles: 1 },
    { name: 'Jackie Stewart', wins: 27, titles: 3 },
    { name: 'Jim Clark', wins: 25, titles: 2 },
    { name: 'Niki Lauda', wins: 25, titles: 3 },
    { name: 'Juan Manuel Fangio', wins: 24, titles: 5 },
    { name: 'Nelson Piquet', wins: 23, titles: 3 },
    { name: 'Nico Rosberg', wins: 23, titles: 1 },
    { name: 'Damon Hill', wins: 22, titles: 1 },
    { name: 'Mika Häkkinen', wins: 20, titles: 2 },
    { name: 'Kimi Räikkönen', wins: 21, titles: 1 },
    { name: 'Stirling Moss', wins: 16, titles: 0 },
    { name: 'Jenson Button', wins: 15, titles: 1 },
    { name: 'Graham Hill', wins: 14, titles: 2 },
    { name: 'Emerson Fittipaldi', wins: 14, titles: 2 },
    { name: 'Jack Brabham', wins: 14, titles: 3 },
    { name: 'David Coulthard', wins: 13, titles: 0 },
    { name: 'Mario Andretti', wins: 12, titles: 1 },
    { name: 'Carlos Reutemann', wins: 12, titles: 0 },
    { name: 'Alan Jones', wins: 12, titles: 1 },
    { name: 'Jacques Villeneuve', wins: 11, titles: 1 },
    { name: 'Felipe Massa', wins: 11, titles: 0 },
    { name: 'Rubens Barrichello', wins: 11, titles: 0 },
    { name: 'James Hunt', wins: 10, titles: 1 },
];

const TOP_TRACKS = [
    { name: 'Monza', country: 'Itália', races: 74 },
    { name: 'Monaco', country: 'Mônaco', races: 70 },
    { name: 'Silverstone', country: 'Reino Unido', races: 59 },
    { name: 'Spa-Francorchamps', country: 'Bélgica', races: 57 },
    { name: 'Hungaroring', country: 'Hungria', races: 39 },
    { name: 'Montreal', country: 'Canadá', races: 43 },
    { name: 'Interlagos', country: 'Brasil', races: 41 },
    { name: 'Suzuka', country: 'Japão', races: 34 },
    { name: 'Barcelona', country: 'Espanha', races: 34 },
    { name: 'Zandvoort', country: 'Holanda', races: 35 },
    { name: 'Spielberg', country: 'Áustria', races: 36 },
    { name: 'Hockenheim', country: 'Alemanha', races: 37 },
    { name: 'Nürburgring', country: 'Alemanha', races: 41 },
    { name: 'Imola', country: 'Itália', races: 31 },
    { name: 'Mexico City', country: 'México', races: 24 },
    { name: 'Sakhir', country: 'Bahrein', races: 21 },
    { name: 'Sepang', country: 'Malásia', races: 19 },
    { name: 'Kyalami', country: 'África do Sul', races: 21 },
    { name: 'Adelaide', country: 'Austrália', races: 11 },
    { name: 'Estoril', country: 'Portugal', races: 13 },
    { name: 'Jeddah', country: 'Arábia Saudita', races: 6 },
    { name: 'Singapore', country: 'Singapura', races: 16 },
    { name: 'Yas Marina', country: 'Abu Dhabi', races: 17 },
    { name: 'Austin', country: 'EUA', races: 13 },
    { name: 'Amiens', country: 'França', races: 1 },
    { name: 'Magny-Cours', country: 'França', races: 18 },
    { name: 'Watkins Glen', country: 'EUA', races: 20 },
    { name: 'Paul Ricard', country: 'França', races: 18 },
    { name: 'Shanghai', country: 'China', races: 17 },
    { name: 'Melbourne', country: 'Austrália', races: 27 },
];

export default async function HistoryPage() {
    const standingsLists = await getWorldChampions();
    const champions = [...standingsLists].reverse();

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex flex-col mb-12">
                <h1 className="text-4xl font-black uppercase tracking-tight italic flex items-center gap-3">
                    <HistoryIcon size={36} className="text-f1-red" />
                    Histórico F1
                </h1>
                <p className="text-f1-gray mt-2 font-medium">A linhagem dos deuses da velocidade e as catedrais do automobilismo.</p>
            </div>

            <div className="space-y-16">
                {/* Galeria de Campeões Expandida */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black uppercase tracking-tight italic border-l-8 border-f1-red pl-4">Galeria de Campeões</h2>
                        <Badge variant="winner">{champions.length} Títulos</Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {champions.slice(0, 40).map((list: any) => {
                            const champion = list.DriverStandings[0];
                            const constructor = champion.Constructors[0];

                            return (
                                <Card key={list.season} className="p-4 bg-f1-card hover:border-f1-red/50 transition-all group">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-2xl font-black italic text-f1-gray group-hover:text-f1-red transition-colors">{list.season}</span>
                                        <Trophy size={16} className="text-yellow-500" />
                                    </div>
                                    <h3 className="font-bold text-sm uppercase">
                                        {champion.Driver.givenName} <span className="block">{champion.Driver.familyName}</span>
                                    </h3>
                                    <p className="text-[10px] text-f1-gray uppercase font-black mt-2 tracking-tighter">
                                        {constructor.name}
                                    </p>
                                </Card>
                            );
                        })}
                    </div>
                </section>

                {/* Pilotos e Pistas */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-f1-red p-2 rounded">
                                <User size={24} className="text-white" />
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-tight italic">Top 30 Pilotos (Vitórias)</h2>
                        </div>

                        <div className="bg-f1-card/30 rounded-xl border border-f1-gray/10 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-f1-dark/50 text-[10px] uppercase font-bold text-f1-gray">
                                    <tr>
                                        <th className="px-6 py-4">Pos</th>
                                        <th className="px-6 py-4">Piloto</th>
                                        <th className="px-6 py-4 text-right">Vitórias</th>
                                        <th className="px-6 py-4 text-right">Títulos</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-f1-gray/5">
                                    {TOP_DRIVERS.map((driver, idx) => (
                                        <tr key={idx} className="hover:bg-f1-red/5 transition-colors group">
                                            <td className="px-6 py-4 font-black italic text-f1-gray">{idx + 1}</td>
                                            <td className="px-6 py-4 font-bold uppercase text-xs tracking-tight group-hover:text-white transition-colors">{driver.name}</td>
                                            <td className="px-6 py-4 text-right font-black italic text-f1-red">{driver.wins}</td>
                                            <td className="px-6 py-4 text-right">
                                                {driver.titles > 0 ? (
                                                    <div className="flex items-center justify-end gap-1">
                                                        <span className="font-bold">{driver.titles}</span>
                                                        <Star size={12} className="text-yellow-500 fill-yellow-500" />
                                                    </div>
                                                ) : '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-f1-red p-2 rounded">
                                <MapIcon size={24} className="text-white" />
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-tight italic">Top 30 Pistas</h2>
                        </div>

                        <div className="bg-f1-card/30 rounded-xl border border-f1-gray/10 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-f1-dark/50 text-[10px] uppercase font-bold text-f1-gray">
                                    <tr>
                                        <th className="px-6 py-4">Pos</th>
                                        <th className="px-6 py-4">Pista</th>
                                        <th className="px-6 py-4">País</th>
                                        <th className="px-6 py-4 text-right">GPs</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-f1-gray/5">
                                    {TOP_TRACKS.map((track, idx) => (
                                        <tr key={idx} className="hover:bg-f1-red/5 transition-colors group">
                                            <td className="px-6 py-4 font-black italic text-f1-gray">{idx + 1}</td>
                                            <td className="px-6 py-4 font-bold uppercase text-xs tracking-tight group-hover:text-white transition-colors">{track.name}</td>
                                            <td className="px-6 py-4 text-xs font-bold text-f1-gray uppercase tracking-widest">{track.country}</td>
                                            <td className="px-6 py-4 text-right font-black italic text-f1-red">{track.races}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Maiores Rivalidades */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-f1-red p-2 rounded">
                            <Users size={24} className="text-white" />
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tight italic">Top 10 Rivalidades Icônicas</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {[
                            { r1: "Senna", r2: "Prost", year: "1988-1993", desc: "A maior rivalidade da história, marcada por colisões e disputa técnica extrema." },
                            { r1: "Lauda", r2: "Hunt", year: "1976", desc: "O gênio metódico contra o playboy talentoso. O duelo que quase custou a vida de Niki." },
                            { r1: "Hamilton", r2: "Verstappen", year: "2021", desc: "A troca de guarda. Uma temporada decidida na última volta da última corrida." },
                            { r1: "Schumacher", r2: "Hakkinen", year: "1998-2000", desc: "Respeito mútuo e velocidade pura entre os dois gigantes da era V10." },
                            { r1: "Mansell", r2: "Piquet", year: "1986-1987", desc: "O 'Leão' contra o estrategista brasileiro. Faíscas dentro da própria Williams." },
                            { r1: "Vettel", r2: "Webber", year: "2010-2013", desc: "Multi 21, Seb! O domínio da Red Bull com tensão interna constante." },
                            { r1: "Alonso", r2: "Hamilton", year: "2007", desc: "O bicampeão contra o novato prodígio na McLaren. Empate técnico e caos político." },
                            { r1: "Villeneuve", r2: "Pironi", year: "1982", desc: "Traição em San Marino. Um duelo trágico que marcou o fim da era Gilles." },
                            { r1: "Rosberg", r2: "Hamilton", year: "2014-2016", desc: "Amigos de infância tornados inimigos jurados pelo domínio da era híbrida." },
                            { r1: "Stewart", r2: "Rindt", year: "1969-1970", desc: "Velocidade e perigo. O duelo nas pistas mais perigosas do mundo." },
                        ].map((rival, idx) => (
                            <Card key={idx} className="p-4 bg-f1-card overflow-hidden">
                                <div className="text-[10px] font-bold text-f1-red uppercase mb-1">{rival.year}</div>
                                <h3 className="font-black uppercase text-sm italic mb-2">{rival.r1} <span className="text-f1-gray text-[10px] lowercase px-1">vs</span> {rival.r2}</h3>
                                <p className="text-[10px] text-f1-gray leading-tight">{rival.desc}</p>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Carros Lendários */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-f1-red p-2 rounded">
                            <HistoryIcon size={24} className="text-white" />
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tight italic">Máquinas Lendárias</h2>
                    </div>

                    <Card className="overflow-hidden bg-f1-card/30 border-f1-red/20">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="relative h-64 md:h-auto">
                                <img
                                    src="/legendary_cars.png"
                                    alt="Montagem de carros lendários da F1"
                                    className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-f1-dark/80 to-transparent" />
                            </div>
                            <div className="p-8 flex flex-col justify-center">
                                <h3 className="text-2xl font-black uppercase italic mb-4">Domínio e Inovação</h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-f1-red font-bold text-sm uppercase">McLaren MP4/4 (1988)</h4>
                                        <p className="text-xs text-f1-gray">Venceu 15 de 16 corridas em uma única temporada. O auge de Senna e Prost.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-f1-red font-bold text-sm uppercase">Ferrari F2004 (2004)</h4>
                                        <p className="text-xs text-f1-gray">O carro que quebrou todos os recordes de pista. A perfeição tática de Schumacher.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-f1-red font-bold text-sm uppercase">Lotus 79 (1978)</h4>
                                        <p className="text-xs text-f1-gray">O 'Carro Asa'. Revolucionou o esporte com o uso do efeito solo.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-f1-red font-bold text-sm uppercase">Williams FW14B (1992)</h4>
                                        <p className="text-xs text-f1-gray">O carro de outro planeta. Suspensão ativa e tecnologia imbatível.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* Recordes Mundiais */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-8 bg-f1-card/50 border-f1-red/20 relative overflow-hidden">
                        <Timer className="absolute -right-4 -bottom-4 text-f1-red/5" size={120} />
                        <h3 className="text-xl font-black uppercase italic mb-4">Pit Stop Mais Rápido</h3>
                        <div className="text-4xl font-black text-f1-red italic">1.80s</div>
                        <p className="text-xs text-f1-gray mt-2 uppercase font-bold">McLaren - Catar 2023</p>
                    </Card>

                    <Card className="p-8 bg-f1-card/50 border-f1-red/20 relative overflow-hidden">
                        <Star className="absolute -right-4 -bottom-4 text-f1-red/5" size={120} />
                        <h3 className="text-xl font-black uppercase italic mb-4">Maioria de Vitórias (Temporada)</h3>
                        <div className="text-4xl font-black text-f1-red italic">19</div>
                        <p className="text-xs text-f1-gray mt-2 uppercase font-bold">Max Verstappen - 2023</p>
                    </Card>

                    <Card className="p-8 bg-f1-card/50 border-f1-red/20 relative overflow-hidden">
                        <Flag className="absolute -right-4 -bottom-4 text-f1-red/5" size={120} />
                        <h3 className="text-xl font-black uppercase italic mb-4">Brasil na F1</h3>
                        <div className="text-4xl font-black text-f1-red italic">101</div>
                        <p className="text-xs text-f1-gray mt-2 uppercase font-bold">Vitórias Brasileiras na História</p>
                    </Card>
                </div>
            </div>
        </div>
    );
}
