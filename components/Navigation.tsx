'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Trophy, List, History, Users } from 'lucide-react';

export const Navigation = () => {
    const pathname = usePathname();

    const navItems = [
        { name: 'Pulse', path: '/', icon: Home },
        { name: 'Calendário', path: '/calendar', icon: Calendar },
        { name: 'Paddock', path: '/paddock', icon: Users },
        { name: 'Classificação', path: '/standings', icon: Trophy },
        { name: 'Resultados', path: '/results', icon: List },
        { name: 'Histórico', path: '/history', icon: History },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-f1-dark/80 backdrop-blur-lg border-t border-f1-gray/20 z-50 md:sticky md:top-0 md:border-t-0 md:border-b">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between md:h-16 h-20">
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-2xl font-black text-f1-red italic tracking-tighter">F1 PULSE</Link>
                        <div className="flex gap-6">
                            {navItems.slice(1).map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-f1-red ${pathname === item.path ? 'text-f1-red' : 'text-gray-400'}`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Nav */}
                    <div className="flex md:hidden w-full justify-around items-center">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex flex-col items-center gap-1 transition-colors ${pathname === item.path ? 'text-f1-red' : 'text-gray-400'}`}
                            >
                                <item.icon size={24} />
                                <span className="text-[10px] font-bold uppercase tracking-tight">{item.name}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-f1-card border border-f1-gray/30 flex items-center justify-center font-bold text-xs text-f1-red">
                            LIVE
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
