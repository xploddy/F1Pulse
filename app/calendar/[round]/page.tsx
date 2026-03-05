import React from 'react';
import { getRaceByRound } from '@/services/api';
import { Card, Badge } from '@/components/UI';
import { MapPin, Calendar, Clock, Tv, Info } from 'lucide-react';
import { format, parseISO, addHours } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { CircuitPreview } from '@/components/CircuitPreview';

export const revalidate = 86400; // Daily

const timeZone = 'America/Sao_Paulo';

export default async function RaceDetailPage({ params }: { params: { round: string } }) {
    const race = await getRaceByRound(params.round);

    if (!race) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 text-center">
                <h1 className="text-2xl font-bold">Race not found.</h1>
            </div>
        );
    }

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

    const formatBrazilDate = (dateStr: string, timeStr: string) => {
        if (!dateStr || !timeStr) return 'TBA';
        try {
            const utcDate = parseISO(`${dateStr}T${timeStr}`);
            const brTime = toZonedTime(utcDate, timeZone);
            return format(brTime, 'dd/MM (EEEE)', { locale: require('date-fns/locale/pt-BR') });
        } catch (e) {
            return dateStr;
        }
    };

    const sessions = [
        { name: 'Treino Livre 1', data: race.FirstPractice, channel: 'SporTV / Globoplay / F1TV' },
        { name: 'Treino Livre 2', data: race.SecondPractice, channel: 'SporTV / Globoplay / F1TV' },
        { name: 'Treino Livre 3', data: race.ThirdPractice, channel: 'SporTV / Globoplay / F1TV' },
        { name: 'Sprint', data: race.Sprint, channel: 'Globo / SporTV / F1TV' },
        { name: 'Classificação', data: race.Qualifying, channel: 'Globo / SporTV / F1TV' },
        { name: 'Grande Prêmio', data: { date: race.date, time: race.time }, channel: 'Globo / SporTV / F1TV' },
    ].filter(s => s.data);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-8">
                <Badge variant="winner">Round {race.round}</Badge>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic mt-2">{race.raceName}</h1>
                <div className="flex flex-wrap items-center gap-4 mt-4 text-f1-gray">
                    <div className="flex items-center gap-1">
                        <MapPin size={18} className="text-f1-red" />
                        <span>{race.Circuit.circuitName}, {race.Circuit.Location.country}</span>
                    </div>
                </div>
            </div>

            <div className="mb-12">
                <CircuitPreview
                    circuitId={race.Circuit.circuitId}
                    raceName={race.raceName.replace(' Grand Prix', '')}
                    locality={race.Circuit.Location.locality}
                    country={race.Circuit.Location.country}
                    round={race.round}
                />
            </div>

            <div className="grid grid-cols-1 gap-6">
                <h2 className="text-xl font-bold uppercase tracking-tight italic border-l-4 border-f1-red pl-4">Programação (Horário de Brasília)</h2>

                {sessions.map((session, index) => (
                    <Card key={index} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-6">
                            <div className="bg-f1-red/10 p-3 rounded-lg text-f1-red">
                                <Clock size={24} />
                            </div>
                            <div>
                                <h3 className="font-black uppercase tracking-tight text-lg">{session.name}</h3>
                                <p className="text-f1-gray font-medium">{formatBrazilDate(session.data!.date, session.data!.time)}</p>
                            </div>
                        </div>

                        <div className="flex flex-col md:items-end gap-2">
                            <div className="text-2xl font-black italic">
                                {formatBrazilTime(session.data!.date, session.data!.time)}
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase text-f1-gray">
                                <Tv size={14} className="text-f1-red" />
                                {session.channel}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Card className="mt-12 p-8 bg-f1-card/50 border-dashed">
                <div className="flex items-start gap-4">
                    <Info className="text-f1-red shrink-0" size={24} />
                    <div>
                        <h4 className="font-bold uppercase tracking-tight">Observação</h4>
                        <p className="text-sm text-f1-gray mt-1 leading-relaxed">
                            Os horários acima estão convertidos para o horário de Brasília (GMT-3).
                            As transmissões podem sofrer alterações conforme a grade de programação da Globo, SporTV e Globoplay.
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
}
