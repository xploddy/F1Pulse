import React from 'react';
import { getNextRace, getLastRaceResults } from '@/services/api';
import { NextRaceHighLight } from '@/components/NextRaceHighLight';
import { Card, Badge } from '@/components/UI';
import { Trophy, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  const nextRace = await getNextRace();
  const lastRace = await getLastRaceResults();

  return (
    <div className="flex flex-col gap-8 pb-12">
      <NextRaceHighLight race={nextRace} />

      <section className="px-4 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight italic">Latest Results</h2>
            <p className="text-f1-gray text-sm">{lastRace?.raceName}</p>
          </div>
          <Link href="/results" className="text-f1-red text-sm font-bold flex items-center gap-1 hover:underline">
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lastRace?.Results?.slice(0, 3).map((result, index) => (
            <Card key={result.Driver.driverId} className="p-6 relative group">
              <div className="absolute top-4 right-4 text-4xl font-black text-f1-gray/10 group-hover:text-f1-red/10 transition-colors italic">
                P{result.position}
              </div>
              <Badge variant={index === 0 ? "winner" : "default"}>
                {result.Constructor.name}
              </Badge>
              <h3 className="text-xl font-bold mt-2">
                {result.Driver.givenName} <span className="uppercase">{result.Driver.familyName}</span>
              </h3>
              <div className="flex items-center justify-between mt-4">
                <span className="text-f1-red font-bold">{result.points} PTS</span>
                <span className="text-f1-gray text-sm">{result.status === 'Finished' ? result.Time?.time : result.status}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="px-4 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8 flex flex-col items-start gap-4 bg-gradient-to-br from-f1-card to-background">
          <Trophy className="text-f1-red" size={32} />
          <h3 className="text-2xl font-black uppercase tracking-tight">Drivers Championship</h3>
          <p className="text-f1-gray">Keep track of the battle for the world title between the fastest drivers on Earth.</p>
          <Link href="/standings" className="f1-button mt-4">
            View Standings
          </Link>
        </Card>

        <Card className="p-8 flex flex-col items-start gap-4 bg-gradient-to-br from-f1-card to-background">
          <div className="flex gap-2">
            <Trophy className="text-white" size={32} />
            <Trophy className="text-white/50" size={32} />
          </div>
          <h3 className="text-2xl font-black uppercase tracking-tight">Constructors Battle</h3>
          <p className="text-f1-gray font-medium">See which team is leading the engineering race and dominating the grid.</p>
          <Link href="/standings?tab=teams" className="f1-button mt-4 !bg-white !text-f1-dark hover:!bg-white/90">
            View Teams
          </Link>
        </Card>
      </section>
    </div>
  );
}
