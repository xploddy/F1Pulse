import React from 'react';
import { getF1News } from '@/services/api';
import { Card, Badge } from '@/components/UI';
import { ExternalLink, Calendar, User, Newspaper } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const revalidate = 3600; // Atualiza as notícias a cada 1 hora no servidor

export default async function NewsPage() {
    const articles = await getF1News();

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex flex-col mb-12">
                <h1 className="text-4xl font-black uppercase tracking-tight italic flex items-center gap-3 text-white">
                    <Newspaper size={36} className="text-f1-red" />
                    Notícias F1
                </h1>
                <p className="text-f1-gray mt-2 font-medium">As últimas atualizações e fofocas do paddock em português.</p>
            </div>

            {articles.length === 0 ? (
                <div className="text-center py-20 bg-f1-card rounded-xl border border-f1-gray/10">
                    <p className="text-f1-gray text-lg">Nenhuma notícia encontrada no momento. Verifique se a API Key está configurada na Vercel.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article: any, idx: number) => (
                        <Card key={idx} className="flex flex-col h-full bg-f1-card hover:border-f1-red/30 transition-all overflow-hidden group border-f1-gray/10">
                            {article.urlToImage && (
                                <div className="relative h-48 overflow-hidden bg-f1-dark">
                                    <img
                                        src={article.urlToImage}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-f1-dark to-transparent opacity-60" />
                                </div>
                            )}

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center justify-between mb-3 text-white">
                                    <Badge variant="default" className="bg-f1-red/10 text-f1-red border border-f1-red/20 shadow-none">
                                        {article.source.name}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-[10px] text-f1-gray font-bold uppercase">
                                        <Calendar size={12} />
                                        {article.publishedAt ? format(parseISO(article.publishedAt), "dd 'de' MMM", { locale: ptBR }) : 'Hoje'}
                                    </div>
                                </div>

                                <h2 className="text-xl font-bold leading-tight mb-3 group-hover:text-f1-red transition-colors line-clamp-3 text-white">
                                    {article.title}
                                </h2>

                                <p className="text-sm text-f1-gray line-clamp-4 mb-6 flex-grow">
                                    {article.description}
                                </p>

                                <div className="mt-auto pt-4 border-t border-f1-gray/10 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-f1-gray">
                                        <User size={14} />
                                        <span className="text-[10px] font-bold uppercase truncate max-w-[120px]">
                                            {article.author || 'Redação'}
                                        </span>
                                    </div>

                                    <a
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-f1-red text-xs font-black uppercase tracking-widest hover:underline"
                                    >
                                        Ler Mais <ExternalLink size={14} />
                                    </a>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
