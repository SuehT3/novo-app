"use client";

import { useState } from 'react';
import { Newspaper, TrendingUp, Clock, ExternalLink } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  category: 'crypto' | 'stocks' | 'forex' | 'economy';
  sentiment: 'positive' | 'negative' | 'neutral';
  url: string;
}

export default function NewsPanel() {
  const [activeTab, setActiveTab] = useState<'news' | 'analysis'>('news');

  const news: NewsItem[] = [
    {
      id: '1',
      title: 'Bitcoin atinge novo recorde de $45k com aumento de volume institucional',
      source: 'CoinDesk',
      time: 'há 15 min',
      category: 'crypto',
      sentiment: 'positive',
      url: '#'
    },
    {
      id: '2',
      title: 'Fed mantém taxa de juros e sinaliza possível corte em 2024',
      source: 'Bloomberg',
      time: 'há 1 hora',
      category: 'economy',
      sentiment: 'positive',
      url: '#'
    },
    {
      id: '3',
      title: 'Apple anuncia novos produtos e ações sobem 3%',
      source: 'Reuters',
      time: 'há 2 horas',
      category: 'stocks',
      sentiment: 'positive',
      url: '#'
    },
    {
      id: '4',
      title: 'Ethereum enfrenta resistência em $2.900 após rally',
      source: 'CryptoNews',
      time: 'há 3 horas',
      category: 'crypto',
      sentiment: 'neutral',
      url: '#'
    },
    {
      id: '5',
      title: 'Dólar fortalece contra Euro após dados de emprego',
      source: 'ForexLive',
      time: 'há 4 horas',
      category: 'forex',
      sentiment: 'neutral',
      url: '#'
    },
    {
      id: '6',
      title: 'Tesla reporta queda nas vendas do Q4',
      source: 'CNBC',
      time: 'há 5 horas',
      category: 'stocks',
      sentiment: 'negative',
      url: '#'
    }
  ];

  const analyses = [
    {
      id: '1',
      title: 'Análise Semanal: Bitcoin em zona de decisão',
      author: 'Equipe TradingView',
      time: 'há 2 horas',
      likes: 234
    },
    {
      id: '2',
      title: 'Top 5 ações para investir em 2024',
      author: 'Analistas Premium',
      time: 'há 5 horas',
      likes: 189
    },
    {
      id: '3',
      title: 'Estratégia de Forex: EUR/USD em tendência de baixa',
      author: 'FX Traders',
      time: 'há 8 horas',
      likes: 156
    }
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-[#26A69A]';
      case 'negative':
        return 'text-[#EF5350]';
      default:
        return 'text-[#787B86]';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'crypto':
        return 'bg-[#2962FF]/20 text-[#2962FF]';
      case 'stocks':
        return 'bg-[#26A69A]/20 text-[#26A69A]';
      case 'forex':
        return 'bg-[#FF6D00]/20 text-[#FF6D00]';
      case 'economy':
        return 'bg-[#9C27B0]/20 text-[#9C27B0]';
      default:
        return 'bg-[#787B86]/20 text-[#787B86]';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-[#1E222D]">
        <div className="flex items-center gap-1 bg-[#1E222D] rounded-md p-1">
          <button
            onClick={() => setActiveTab('news')}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              activeTab === 'news'
                ? 'bg-[#2962FF] text-white'
                : 'text-[#787B86] hover:text-white'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            Notícias
          </button>
          <button
            onClick={() => setActiveTab('analysis')}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              activeTab === 'analysis'
                ? 'bg-[#2962FF] text-white'
                : 'text-[#787B86] hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Análises
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'news' ? (
          <div className="divide-y divide-[#1E222D]">
            {news.map((item) => (
              <a
                key={item.id}
                href={item.url}
                className="block p-3 hover:bg-[#1E222D] transition-colors group"
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className={`px-2 py-0.5 text-[10px] font-semibold rounded uppercase ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                  <div className={`w-1.5 h-1.5 rounded-full mt-1 ${getSentimentColor(item.sentiment)}`} />
                </div>
                
                <h3 className="text-xs font-medium text-white leading-relaxed mb-2 group-hover:text-[#2962FF] transition-colors">
                  {item.title}
                </h3>
                
                <div className="flex items-center justify-between text-[10px] text-[#787B86]">
                  <div className="flex items-center gap-2">
                    <span>{item.source}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-[#1E222D]">
            {analyses.map((item) => (
              <div
                key={item.id}
                className="p-3 hover:bg-[#1E222D] transition-colors cursor-pointer"
              >
                <h3 className="text-xs font-medium text-white leading-relaxed mb-2 hover:text-[#2962FF] transition-colors">
                  {item.title}
                </h3>
                
                <div className="flex items-center justify-between text-[10px] text-[#787B86]">
                  <span>{item.author}</span>
                  <div className="flex items-center gap-2">
                    <span>{item.time}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-[#1E222D]">
        <button className="w-full py-2 text-xs font-medium text-[#2962FF] hover:text-white hover:bg-[#2962FF] rounded transition-colors">
          Ver todas as notícias
        </button>
      </div>
    </div>
  );
}
