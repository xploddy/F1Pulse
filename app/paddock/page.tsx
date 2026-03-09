'use client';

import React from 'react';
import { Card, Badge } from '@/components/UI';
import { User, Globe, Swords } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const TEAM_DATA = [
    {
        id: 'alpine',
        name: 'Alpine',
        color: '#0093CC',
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/alpine-logo.png',
        url: 'https://www.alpinecars.com/f1-team/',
        drivers: [
            { name: 'Pierre GASLY', photo: 'https://media.formula1.com/content/dam/fom-website/drivers/2024/pierre-gasly.png', wiki: 'https://pt.wikipedia.org/wiki/Pierre_Gasly' },
            { name: 'Franco COLAPINTO', photo: 'https://media.formula1.com/content/dam/fom-website/drivers/2024/franco-colapinto.png', wiki: 'https://pt.wikipedia.org/wiki/Franco_Colapinto' }
        ],
        carImage: 'https://media.formula1.com/content/dam/fom-website/teams/2024/alpine.png'
    },
    {
        id: 'aston_martin',
        name: 'Aston Martin',
        color: '#229971',
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/aston-martin-logo.png',
        url: 'https://www.astonmartinf1.com',
        drivers: [
            { name: 'Fernando ALONSO', photo: 'https://media.formula1.com/content/dam/fom-website/drivers/2024/fernando-alonso.png', wiki: 'https://pt.wikipedia.org/wiki/Fernando_Alonso' },
            { name: 'Lance STROLL', photo: 'https://media.formula1.com/content/dam/fom-website/drivers/2024/lance-stroll.png', wiki: 'https://pt.wikipedia.org/wiki/Lance_Stroll' }
        ],
        carImage: 'https://media.formula1.com/content/dam/fom-website/teams/2024/aston-martin.png'
    },
    {
        id: 'williams',
        name: 'Williams',
        color: '#64C4FF',
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/williams-logo.png',
        url: 'https://www.williamsf1.com',
        drivers: [
            { name: 'Carlos SAINZ', photo: 'https://media.formula1.com/content/dam/fom-website/drivers/2024/carlos-sainz.png', wiki: 'https://pt.wikipedia.org/wiki/Carlos_Sainz_Jr.' },
            { name: 'Alexander ALBON', photo: 'https://media.formula1.com/content/dam/fom-website/drivers/2024/alexander-albon.png', wiki: 'https://pt.wikipedia.org/wiki/Alexander_Albon' }
        ],
        carImage: 'https://media.formula1.com/content/dam/fom-website/teams/2024/williams.png'
    },
    {
        id: 'audi',
        name: 'Audi',
        color: '#E00000',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Audi_logo.svg/512px-Audi_logo.svg.png',
        url: 'https://www.audi.com/en/experience-audi/audi-sport/audi-f1.html',
        drivers: [
            { name: 'Nico HULKENBERG', photo: 'https://media.formula1.com/content/dam/fom-website/drivers/2024/nico-hulkenberg.png', wiki: 'https://pt.wikipedia.org/wiki/Nico_H%C3%BClkenberg' },
            { name: 'Gabriel BORTOLETO', photo: 'https://media.formula1.com/content/dam/fom-website/drivers/2024/gabriel-bortoleto.png', wiki: 'https://pt.wikipedia.org/wiki/Gabriel_Bortoleto' }
        ],
        carImage: '/f1_2026_car.png'
    },
    {
        id: 'cadillac',
        name: 'Cadillac',
        color: '#38383F',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Cadillac_logo_%282014-present%29.svg/512px-Cadillac_logo_%282014-present%29.svg.png',
        url: 'https://www.cadillac.com',
        drivers: [
            { name: 'Sergio PEREZ', photo: 'https://media.formula1.com/content/dam/fom-website/drivers/2024/sergio-perez.png', wiki: 'https://pt.wikipedia.org/wiki/Sergio_P%C3%A9rez' },
            { name: 'Valtteri BOTTAS', photo: 'https://media.formula1.com/content/dam/fom-website/drivers/2024/valtteri-bottas.png', wiki: 'https://pt.wikipedia.org/wiki/Valtteri_Bottas' }
        ],
        carImage: '/f1_2026_car.png'
    },
    {
        id: 'ferrari',
        name: 'Ferrari',
        color: '#E10600',
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/ferrari-logo.png',
        url: 'https://www.ferrari.com/en-EN/formula1',
        drivers: [
            { name: 'Charles LECLERC', photo: 'https://media.formula1.com/content/dam/fom-website/drivers/2024/charles-leclerc.png', wiki: 'https://pt.wikipedia.org/wiki/Charles_Leclerc' },
            { name: 'Lewis HAMILTON', photo: 'https://media.formula1.com/content/dam/fom-website/drivers/2024/lewis-hamilton.png', wiki: 'https://pt.wikipedia.org/wiki/Lewis_Hamilton' }
        ],
        carImage: 'https://media.formula1.com/content/dam/fom-website/teams/2024/ferrari.png'
    },
    {
        id: 'haas',
        name: 'Haas F1 Team',
        color: '#FFFFFF',
        textColor: '#0B0B0F',
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/haas-f1-team-logo.png',
        url: 'https://www.haasf1team.com',
        drivers: [
            { name: 'Esteban OCON', photo: 'https://media.formula1.com/content/dam/fom-website/drivers/2024/esteban-ocon.png', wiki: 'https://pt.wikipedia.org/wiki/Esteban_Ocon' },
            { name: 'Oliver BEARMAN', photo: 'https://media.formula1.com/content/dam/fom-website/drivers/2024/oliver-bearman.png', wiki: 'https://pt.wikipedia.org/wiki/Oliver_Bearman' }
        ],
        carImage: 'https://media.formula1.com/content/dam/fom-website/teams/2024/haas-f1-team.png'
    },
    {
        id: 'mclaren',
        name: 'McLaren',
        color: '#FF8000',
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/mclaren-logo.png',
        url: 'https://www.mclaren.com/racing/',
        drivers: [
            { name: 'Lando NORRIS', photo: 'https://media.formula1.com/content/dam/fom-website/drivers/2024/lando-norris.png', wiki: 'https://pt.wikipedia.org/wiki/Lando_Norris' },
            { name: 'Oscar PIASTRI', photo: 'https://media.formula1.com/content/dam/fom-website/drivers/2024/oscar-piastri.png', wiki: 'https://pt.wikipedia.org/wiki/Oscar_Piastri' }
        ],
        carImage: 'https://media.formula1.com/content/dam/fom-website/teams/2024/mclaren.png'
    },
    {
        id: 'mercedes',
        name: 'Mercedes',
        color: '#27F4D2',
        textColor: '#0B0B0F',
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/mercedes-logo.png',
        url: 'https://www.mercedesamgf1.com',
        drivers: [
            { name: 'George RUSSELL', photo: 'https://media.formula1.com/content/dam/fom-website/drivers/2024/george-russell.png', wiki: 'https://pt.wikipedia.org/wiki/George_Russell' },
            { name: 'Kimi ANTONELLI', photo: 'https://media.formula1.com/content/dam/fom-website/drivers/2024/andrea-kimi-antonelli', wiki: 'https://pt.wikipedia.org/wiki/Andrea_Kimi_Antonelli' }
        ],
        carImage: 'https://media.formula1.com/content/dam/fom-website/teams/2024/mercedes.png'
    },
    {
        id: 'rb',
        name: 'Racing Bulls',
        color: '#6692FF',
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/rb-logo.png',
        url: 'https://www.visacashapprb.com/en/',
        drivers: [
            { name: 'Liam LAWSON', photo: 'https://media.formula1.com/content/dam/fom-website/drivers/2024/liam-lawson.png', wiki: 'https://pt.wikipedia.org/wiki/Liam_Lawson' },
            { name: 'Arvid LINDBLAD', photo: 'https://media.formula1.com/content/dam/fom-website/drivers/2024/arvid-lindblad.png', wiki: 'https://en.wikipedia.org/wiki/Arvid_Lindblad' }
        ],
        carImage: 'https://media.formula1.com/content/dam/fom-website/teams/2024/rb.png'
    },
    {
        id: 'red_bull',
        name: 'Red Bull Racing',
        color: '#3671C6',
        logo: 'https://media.formula1.com/content/dam/fom-website/teams/2024/red-bull-racing-logo.png',
        url: 'https://www.redbullracing.com',
        drivers: [
            { name: 'Max VERSTAPPEN', photo: 'https://media.formula1.com/content/dam/fom-website/drivers/2024/max-verstappen.png', wiki: 'https://pt.wikipedia.org/wiki/Max_Verstappen' },
            { name: 'Isack HADJAR', photo: 'https://media.formula1.com/content/dam/fom-website/drivers/2024/isack-hadjar.png', wiki: 'https://pt.wikipedia.org/wiki/Isack_Hadjar' }
        ],
        carImage: 'https://media.formula1.com/content/dam/fom-website/teams/2024/red-bull-racing.png'
    },
];

export default function PaddockPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col mb-8">
                <h1 className="text-4xl font-black uppercase tracking-tight italic flex items-center gap-4 text-white">
                    Paddock Grid 2026
                    <Badge variant="winner">Brasília Time</Badge>
                </h1>
                <p className="text-f1-gray mt-2 text-lg font-medium">Conheça as equipes, carros e pilotos oficiais da temporada 2026.</p>
            </div>

            <Link href="/head-to-head" className="block mb-12 group">
                <Card className="p-8 border-f1-red/30 bg-gradient-to-r from-f1-red/10 to-transparent group-hover:border-f1-red transition-all cursor-pointer relative overflow-hidden flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Swords size={24} className="text-f1-red group-hover:scale-110 transition-transform" />
                            <h2 className="text-2xl font-black uppercase italic tracking-tighter">Batalhas Internas (H2H)</h2>
                        </div>
                        <p className="text-f1-gray max-w-xl text-sm font-medium">Compare o desempenho direto entre companheiros de equipe nas qualificações e corridas da temporada.</p>
                    </div>
                </Card>
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {TEAM_DATA.map((team) => (
                    <motion.div
                        key={team.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                    >
                        <Card
                            className="relative h-[300px] overflow-hidden border-0 group shadow-2xl rounded-2xl"
                            style={{ backgroundColor: team.color }}
                        >
                            {/* Card Content Overlay */}
                            <div className={`relative z-20 p-8 flex flex-col h-full ${team.textColor === '#0B0B0F' ? 'text-black' : 'text-white'}`}>
                                {/* Header: Team Name and Logo */}
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col">
                                        <h3 className="text-4xl font-black uppercase tracking-tighter italic drop-shadow-md">
                                            {team.name}
                                        </h3>

                                        {/* Drivers */}
                                        <div className="flex gap-4 mt-3">
                                            {team.drivers.map((driver, i) => (
                                                <a
                                                    key={i}
                                                    href={driver.wiki}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all duration-300 backdrop-blur-md border ${team.textColor === '#0B0B0F' ? 'bg-black/10 border-black/10 hover:bg-black/20 text-black' : 'bg-white/10 border-white/10 hover:bg-white/20 text-white'}`}
                                                >
                                                    <div className={`w-7 h-7 rounded-full overflow-hidden shadow-sm border ${team.textColor === '#0B0B0F' ? 'bg-black/10 border-black/10' : 'bg-white/20 border-white/20'}`}>
                                                        {driver.photo ? (
                                                            <img
                                                                src={driver.photo}
                                                                alt={driver.name}
                                                                className="w-full h-full object-cover scale-110"
                                                                onError={(e) => {
                                                                    (e.target as any).style.display = 'none';
                                                                }}
                                                            />
                                                        ) : (
                                                            <User size={14} className="mx-auto mt-1.5" />
                                                        )}
                                                    </div>
                                                    <span className="text-[11px] font-bold uppercase tracking-tight">
                                                        {driver.name.split(' ').slice(-1)}
                                                    </span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="w-14 h-14 bg-white rounded-full p-2.5 flex items-center justify-center shadow-lg border border-black/10">
                                        <img
                                            src={team.logo}
                                            alt={team.name}
                                            className="w-full h-full object-contain"
                                            onError={(e) => {
                                                (e.target as any).src = 'https://media.formula1.com/content/dam/fom-website/flags/FIA.png';
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Car Image - Side Profile */}
                                <div className="absolute bottom-[-10px] right-[-20px] w-full pointer-events-none z-10">
                                    <img
                                        src={team.carImage}
                                        alt={`Carro ${team.name}`}
                                        className="w-[95%] h-auto object-contain transform drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)] group-hover:-translate-x-4 transition-transform duration-700 ease-out"
                                        onError={(e) => {
                                            (e.target as any).src = '/f1_2026_car.png';
                                        }}
                                    />
                                </div>

                                <div className="mt-auto z-30 flex items-center gap-3">
                                    <Badge variant="team" className={`${team.textColor === '#0B0B0F' ? 'bg-black text-white' : 'bg-white text-black'} shadow-md`}>
                                        Equipe {team.id === 'audi' || team.id === 'cadillac' ? 'Nova' : 'Oficial'}
                                    </Badge>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 ${team.textColor === '#0B0B0F' ? 'text-black/60' : 'text-white/80'}`}>
                                        <Globe size={10} /> 2026 Season
                                    </span>
                                </div>
                            </div>

                            {/* Mesh Grid Pattern Overlay */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
                                style={{
                                    backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                                    backgroundSize: '15px 15px'
                                }}
                            />
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
