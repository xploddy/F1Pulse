'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Trophy, List, History, Users, Newspaper } from 'lucide-react';

export const Navigation = () => {
    const pathname = usePathname();

    const navItems = [
        { name: 'Pulse', path: '/', icon: Home },
        { name: 'Notícias', path: '/news', icon: Newspaper },
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

                    {/* Mobile Nav — apenas ícones */}
                    <div className="flex md:hidden w-full justify-around items-center py-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    title={item.name}
                                    aria-label={item.name}
                                    className="flex flex-col items-center gap-1 relative group"
                                >
                                    {/* Ícone */}
                                    <div className={`p-2 rounded-xl transition-all duration-200 ${isActive ? 'bg-f1-red/15 text-f1-red scale-110' : 'text-gray-400 group-hover:text-white'}`}>
                                        <item.icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                                    </div>
                                    {/* Ponto ativo */}
                                    {isActive && (
                                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-f1-red rounded-full" />
                                    )}
                                </Link>
                            );
                        })}
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
