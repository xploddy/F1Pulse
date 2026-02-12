'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Trophy } from 'lucide-react';
import { Race } from '@/types/f1';
import { Card, Badge } from './UI';
import Link from 'next/link';
import { format, parseISO, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export const NextRaceHighLight = ({ race }: { race: Race | null }) => {
    const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null);
    const timeZone = 'America/Sao_Paulo';

    useEffect(() => {
        if (!race) return;

        const timer = setInterval(() => {
            const raceDate = new Date(`${race.date}T${race.time || '12:00:00Z'}`);
            const now = new Date();

            if (raceDate > now) {
                setTimeLeft({
                    days: differenceInDays(raceDate, now),
                    hours: differenceInHours(raceDate, now) % 24,
                    minutes: differenceInMinutes(raceDate, now) % 60,
                    seconds: differenceInSeconds(raceDate, now) % 60,
                });
            } else {
                setTimeLeft(null);
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [race]);

    if (!race) return null;

    const getBrazilTime = () => {
        if (!race.date || !race.time) return 'TBA';
        try {
            const utcDate = parseISO(`${race.date}T${race.time}`);
            const brTime = toZonedTime(utcDate, timeZone);
            return format(brTime, 'HH:mm');
        } catch (e) {
            return 'TBA';
        }
    };

    const getBrazilDate = () => {
        if (!race.date || !race.time) return 'TBA';
        try {
            const utcDate = parseISO(`${race.date}T${race.time}`);
            const brTime = toZonedTime(utcDate, timeZone);
            return format(brTime, "dd 'de' MMMM", { locale: require('date-fns/locale/pt-BR') });
        } catch (e) {
            return race.date;
        }
    };

    return (
        <div className="relative w-full py-12 px-4 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-f1-glow pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center"
                >
                    <Badge variant="winner">Próximo Grande Prêmio</Badge>
                    <h1 className="text-4xl md:text-6xl font-black mt-4 uppercase tracking-tighter">
                        {race.raceName}
                    </h1>
                    <p className="text-f1-gray mt-2 text-lg md:text-xl flex items-center justify-center gap-2">
                        <MapPin size={18} className="text-f1-red" />
                        {race.Circuit.circuitName}, {race.Circuit.Location.country}
                    </p>

                    {timeLeft && (
                        <div className="grid grid-cols-4 gap-4 mt-8">
                            {[
                                { label: 'Dias', value: timeLeft.days },
                                { label: 'Horas', value: timeLeft.hours },
                                { label: 'Min', value: timeLeft.minutes },
                                { label: 'Seg', value: timeLeft.seconds },
                            ].map((item) => (
                                <div key={item.label} className="bg-f1-card border border-f1-gray/20 rounded-lg p-3 md:p-6 w-16 md:w-24">
                                    <span className="text-2xl md:text-3xl font-bold block">{item.value}</span>
                                    <span className="text-[10px] uppercase text-f1-gray font-bold tracking-widest">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex flex-wrap justify-center gap-6 mt-10">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-f1-red" />
                            <span className="font-medium uppercase">{getBrazilDate()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={18} className="text-f1-red" />
                            <span className="font-medium text-1xl font-black italic">{getBrazilTime()} <span className="text-xs not-italic text-f1-gray ml-1">BRT</span></span>
                        </div>
                    </div>

                    <div className="mt-10">
                        <Link href={`/calendar/${race.round}`} className="f1-button inline-block text-center">
                            Ver Programação Completa
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
