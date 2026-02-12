import React from 'react';
import { getSeasonSchedule } from '@/services/api';
import { Card, Badge } from '@/components/UI';
import { MapPin, Calendar as CalendarIcon, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export const revalidate = 86400; // Revalidate daily

const timeZone = 'America/Sao_Paulo';

export default async function CalendarPage() {
    const races = await getSeasonSchedule();
    const now = new Date();

    const formatBrazilTime = (dateStr: string, timeStr: string) => {
        if (!dateStr || !timeStr) return 'TBA';
        try {
            const utcDate = parseISO(`${dateStr}T${timeStr}`);
            const brTime = toZonedTime(utcDate, timeZone);
            return format(brTime, 'HH:mm');
        } catch (e) {
            return 'TBA';
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="flex flex-col mb-12">
                <h1 className="text-4xl font-black uppercase tracking-tight italic">Temporada 2026</h1>
                <p className="text-f1-gray mt-2">Calendário completo e detalhes das etapas (Horário de Brasília).</p>
            </div>

            <div className="flex flex-col gap-4">
                {races.map((race) => {
                    const raceDateString = `${race.date}T${race.time || '12:00:00Z'}`;
                    const raceDate = new Date(raceDateString);
                    const isPassed = raceDate < now;
                    const isNext = !isPassed && (races.find(r => new Date(`${r.date}T${r.time || '12:00:00Z'}`) > now) === race);

                    return (
                        <Card key={race.round} className={`p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${isNext ? 'border-f1-red shadow-[0_0_15px_rgba(225,6,0,0.1)]' : ''}`}>
                            <div className="flex items-center gap-6">
                                <div className="text-center min-w-[60px]">
                                    <span className="text-2xl font-black block">{new Date(race.date).toLocaleDateString(undefined, { day: '2-digit' })}</span>
                                    <span className="text-[10px] uppercase font-bold text-f1-gray">{new Date(race.date).toLocaleDateString(undefined, { month: 'short' })}</span>
                                </div>

                                <div className="w-px h-12 bg-f1-gray/20 hidden md:block" />

                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge variant={isNext ? "winner" : "default"}>
                                            Round {race.round}
                                        </Badge>
                                        {isPassed && <span className="text-[10px] uppercase font-bold text-f1-gray">Completed</span>}
                                    </div>
                                    <h3 className="text-xl font-bold uppercase tracking-tight">{race.raceName}</h3>
                                    <p className="text-f1-gray text-sm flex items-center gap-1 mt-1">
                                        <MapPin size={14} /> {race.Circuit.Location.locality}, {race.Circuit.Location.country}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                                <div className="flex flex-col md:items-end">
                                    <span className="text-xl font-black italic">{formatBrazilTime(race.date, race.time)}</span>
                                    <span className="text-[10px] uppercase font-bold text-f1-red tracking-widest">Brasília</span>
                                </div>
                                <Link href={`/calendar/${race.round}`} className="p-2 bg-f1-gray/10 rounded-full hover:bg-f1-red/10 transition-colors">
                                    <ChevronRight size={20} className="text-f1-gray hover:text-f1-red" />
                                </Link>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
