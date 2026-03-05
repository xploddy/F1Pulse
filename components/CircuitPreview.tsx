"use client";

import React from 'react';
import { Card } from '@/components/UI';
import { MapPin, Info, Car, Gauge } from 'lucide-react';

interface CircuitPreviewProps {
    circuitId: string;
    raceName: string;
    round: string;
    country: string;
    locality: string;
}

import previewsData from '../data/circuit-previews.json';

const getCountryCode = (country: string) => {
    const map: Record<string, string> = {
        'Bahrain': 'bh',
        'Saudi Arabia': 'sa',
        'Australia': 'au',
        'Japan': 'jp',
        'China': 'cn',
        'USA': 'us',
        'Italy': 'it',
        'Monaco': 'mc',
        'Canada': 'ca',
        'Spain': 'es',
        'Austria': 'at',
        'UK': 'gb',
        'Hungary': 'hu',
        'Belgium': 'be',
        'Netherlands': 'nl',
        'Azerbaijan': 'az',
        'Singapore': 'sg',
        'Mexico': 'mx',
        'Brazil': 'br',
        'Qatar': 'qa',
        'UAE': 'ae'
    };
    return map[country] || 'br';
};

const getCompoundColor = (compound: string) => {
    switch (compound) {
        case 'C1': return 'border-gray-100 text-gray-100';
        case 'C2': return 'border-white text-white';
        case 'C3': return 'border-yellow-400 text-yellow-400';
        case 'C4': return 'border-yellow-400 text-yellow-400';
        case 'C5': return 'border-f1-red text-f1-red';
        default: return 'border-white text-white';
    }
};

const getCompoundName = (index: number) => {
    switch (index) {
        case 0: return 'HARD';
        case 1: return 'MEDIUM';
        case 2: return 'SOFT';
        default: return '';
    }
}

const getCompoundTheme = (index: number) => {
    switch (index) {
        case 0: return { color: '#ffffff', bg: 'bg-white' };
        case 1: return { color: '#ffb800', bg: 'bg-yellow-400' };
        case 2: return { color: '#e10600', bg: 'bg-f1-red' };
        default: return { color: '#ffffff', bg: 'bg-white' };
    }
}

const StatBar = ({ label, value }: { label: string, value: number }) => (
    <div className="flex flex-col mb-4 w-full">
        <span className="text-[10px] uppercase font-bold text-f1-gray mb-1 tracking-wider">{label}</span>
        <div className="flex gap-1 w-full">
            {[1, 2, 3, 4, 5].map((i) => (
                <div
                    key={i}
                    className={`h-4 flex-1 flex items-center justify-center font-black text-xs ${i <= value
                        ? 'bg-f1-red text-white'
                        : 'bg-transparent border border-gray-800 text-gray-600'
                        }`}
                >
                    {i}
                </div>
            ))}
        </div>
    </div>
);

export const CircuitPreview: React.FC<CircuitPreviewProps> = ({ circuitId, raceName, round, country, locality }) => {
    const data = (previewsData as any)[circuitId];

    if (!data) {
        return (
            <Card className="p-8 border-dashed flex flex-col items-center justify-center text-center gap-4 mt-8">
                <Info size={32} className="text-f1-gray" />
                <div>
                    <h3 className="text-lg font-bold uppercase tracking-tighter">Preview Indisponível</h3>
                    <p className="text-sm text-f1-gray mt-1">Dados técnicos da Pirelli para esta pista ainda não estão disponíveis no sistema.</p>
                </div>
            </Card>
        );
    }

    return (
        <div className="w-full mt-10 rounded-2xl overflow-hidden bg-black text-white border border-gray-800 shadow-2xl font-sans relative">
            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-800 relative z-10 bg-gradient-to-r from-gray-900 to-black">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <img src={`https://flagcdn.com/w40/${getCountryCode(country)}.png`} alt={country} className="w-6 h-4 object-cover rounded-[2px]" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{locality} | {raceName}</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-xl font-black italic tracking-tighter text-f1-red flex items-center gap-1">
                        PULSE
                        <span className="text-white">PREVIEW</span>
                    </span>
                    <div className="h-6 w-px bg-gray-700" />
                    <span className="text-xs font-bold text-yellow-500 uppercase flex items-center tracking-widest gap-1">
                        <div className="w-6 h-2 bg-yellow-500 rounded-sm" /> PIRELLI
                    </span>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-gray-900">

                {/* Left Panel - Circuit Info */}
                <div className="lg:col-span-8 bg-black p-6 md:p-8 flex flex-col">
                    <div className="flex items-center gap-4 mb-8 border-b border-gray-800 pb-4">
                        <MapPin className="text-white" size={24} />
                        <h2 className="text-2xl font-black uppercase tracking-tighter">
                            Circuit Information
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Track Image Placeholder */}
                        <div className="border border-gray-800 rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 to-black min-h-[200px]">
                            {/* Um icone placeholder que lembra a pista de corrida */}
                            <Car size={64} className="text-gray-800 opacity-50 absolute" />
                            <div className="absolute bottom-4 left-4 z-10">
                                <h3 className="text-lg font-black uppercase text-white/50">{circuitId.replace('_', ' ')} CIRCUIT</h3>
                            </div>
                            <img src={`https://media.formula1.com/image/upload/f_auto/q_auto/v1677244984/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/${country === 'USA' ? (locality === 'Miami' ? 'Miami' : locality === 'Las Vegas' ? 'Las%20Vegas' : 'USA') : country}.png`} alt="Track Layout" className="w-full h-full object-contain brightness-0 invert opacity-80" onError={(e) => e.currentTarget.style.display = 'none'} />
                        </div>

                        {/* Track Stats */}
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-end border-b border-gray-800 border-dotted pb-2">
                                <span className="text-xs font-bold uppercase text-gray-400">Number of Laps</span>
                                <span className="text-xl font-black text-f1-red">{data.laps}</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-gray-800 border-dotted pb-2">
                                <span className="text-xs font-bold uppercase text-gray-400">Race Distance</span>
                                <span className="text-xl font-black text-f1-red">{data.raceDistance}</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-gray-800 border-dotted pb-2">
                                <span className="text-xs font-bold uppercase text-gray-400">Circuit Length</span>
                                <span className="text-xl font-black text-f1-red">{data.circuitLength}</span>
                            </div>
                            <div className="flex flex-col items-end border-b border-gray-800 border-dotted pb-2 mt-2">
                                <span className="text-xs font-bold uppercase text-gray-400 w-full">Lap Record</span>
                                <div className="text-right">
                                    <span className="text-xl font-black text-f1-red block">{data.lapRecord.split(' (')[0]}</span>
                                    <span className="text-[10px] uppercase font-bold text-gray-500">{data.lapRecord.split(' (')[1]?.replace(')', '')}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-2 bg-gray-900/50 p-3 rounded-lg border border-gray-800 relative overflow-hidden">
                                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-f1-red/20 to-transparent pointer-events-none" />
                                <div>
                                    <span className="text-xs font-bold uppercase text-yellow-500 block">Average Pit Stop Loss</span>
                                    <span className="text-3xl font-black text-f1-red leading-none">{data.averagePitStopLoss}</span>
                                </div>
                                <Gauge size={32} className="text-gray-700" />
                            </div>
                        </div>
                    </div>

                    {/* Technical Ratings Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-2 mb-8">
                        <StatBar label="Traction" value={data.traction} />
                        <StatBar label="Tyre Stress" value={data.tyreStress} />
                        <StatBar label="Asphalt Grip" value={data.asphaltGrip} />
                        <StatBar label="Braking" value={data.braking} />
                        <StatBar label="Asphalt Abrasion" value={data.asphaltAbrasion} />
                        <StatBar label="Lateral" value={data.lateral} />
                        <StatBar label="Track Evolution" value={data.trackEvolution} />
                    </div>

                    {/* Tyres Presure Info */}
                    <div className="border border-gray-800 rounded-xl p-4 md:p-6 pb-2">
                        <h4 className="text-sm font-black uppercase tracking-widest mb-4">18" TYRE</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-800">
                            <div className="flex items-center gap-6 justify-center">
                                <div className="text-center">
                                    <div className="w-16 h-16 rounded-full border-4 border-gray-800 mx-auto flex items-center justify-center relative shadow-[inset_0_0_20px_rgba(0,0,0,1)] bg-gradient-to-br from-gray-700 to-black before:content-[''] before:absolute before:inset-2 before:rounded-full before:border-[8px] before:border-black">
                                        <span className="text-yellow-500 font-black italic text-[8px] absolute rotate-[-45deg] scale-75 uppercase">Pirelli</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">Min Starting Pressures (slick)</span>
                                    <div className="flex gap-4">
                                        <div>
                                            <span className="text-xl font-black block">{data.frontPressure}</span>
                                            <span className="text-[10px] font-bold uppercase text-gray-500">Front</span>
                                        </div>
                                        <div>
                                            <span className="text-xl font-black block">{data.rearPressure}</span>
                                            <span className="text-[10px] font-bold uppercase text-gray-500">Rear</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 justify-center pt-4 md:pt-0">
                                <div>
                                    <span className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">EOS Camber Limit</span>
                                    <div className="flex gap-4">
                                        <div>
                                            <span className="text-xl font-black block">{data.frontCamberLimit}</span>
                                            <span className="text-[10px] font-bold uppercase text-gray-500">Front</span>
                                        </div>
                                        <div>
                                            <span className="text-xl font-black block">{data.rearCamberLimit}</span>
                                            <span className="text-[10px] font-bold uppercase text-gray-500">Rear</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Simple Camber Illustration */}
                                <div className="flex gap-2 opacity-60">
                                    <div className="w-4 h-12 border-l-2 border-t-2 border-f1-red rounded-tl-full transform -skew-x-[15deg]"></div>
                                    <div className="w-4 h-12 border-l-2 border-t-2 border-gray-500 rounded-tl-full transform -skew-x-[8deg]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Compounds */}
                <div className="lg:col-span-4 bg-black p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
                    {/* F1 Car Top Down Illustration Background */}
                    <Car size={400} className="text-gray-900/30 absolute top-[-50px] right-[-100px] pointer-events-none rotate-90" />

                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <h2 className="text-2xl font-black uppercase tracking-tighter">Compounds</h2>
                        </div>
                        <p className="text-xs font-bold text-gray-400 uppercase mb-8 pb-4 border-b border-gray-800">
                            Allocated Tyres for {locality}
                        </p>

                        <div className="flex flex-col gap-6 w-full">
                            {data.compounds.map((compound: string, index: number) => {
                                const theme = getCompoundTheme(index);
                                return (
                                    <div key={compound} className="flex gap-4 items-center group relative w-full border border-gray-800/50 p-2 rounded-xl bg-gradient-to-r from-transparent to-gray-900/40 hover:border-gray-700 transition-colors">
                                        <div className="w-16 font-black text-2xl tracking-tighter italic text-center" style={{ color: theme.color }}>
                                            {compound}
                                        </div>

                                        {/* Tyre Render Illusion */}
                                        <div className="w-20 h-24 flex items-center justify-center relative shrink-0">
                                            {/* Thread width */}
                                            <div className="w-12 h-24 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 rounded-lg absolute shadow-2xl overflow-hidden flex flex-col justify-evenly items-center">
                                                {/* Lines for thread pattern */}
                                                <div className="w-full h-px bg-black opacity-30 rotate-12"></div>
                                                <div className="w-full h-px bg-black opacity-30 rotate-12"></div>
                                                <div className="w-full h-px bg-black opacity-30 rotate-12"></div>
                                                <div className="w-full h-px bg-black opacity-30 rotate-12"></div>
                                            </div>
                                            {/* Wall color band */}
                                            <div className="w-[60px] h-[98%] absolute border-[3px] rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center" style={{ borderColor: theme.color }}>
                                                {/* Side text */}
                                                <span className="text-[4px] font-black uppercase rotate-90 opacity-80" style={{ color: theme.color }}>PIRELLI</span>
                                            </div>
                                        </div>

                                        <div className="flex-1 flex flex-col gap-1 pr-4">
                                            <span className="text-sm font-black uppercase tracking-widest text-white border-b border-gray-800 pb-1 flex justify-between">
                                                {getCompoundName(index)}
                                                <div className={`w-3 h-3 rounded-full ${theme.bg}`}></div>
                                            </span>
                                            <span className="text-[10px] text-gray-500 uppercase font-bold mt-1">Recommended for:</span>
                                            <span className="text-[10px] text-gray-400">
                                                {index === 0 ? 'Longer stints, lower grip' : index === 1 ? 'Balanced strategy' : 'Qualifying / High grip'}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-gray-800 flex justify-between items-center z-10">
                        <span className="text-[8px] uppercase text-gray-600 font-bold max-w-[200px]">
                            DATA PROVIDED BY OFFICIAL PIRELLI PREVIEWS.
                        </span>
                        <div className="flex gap-2">
                            <div className="w-1 h-1 bg-gray-700"></div>
                            <div className="w-1 h-1 bg-gray-700"></div>
                            <div className="w-1 h-1 bg-gray-700"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CircuitPreview;
