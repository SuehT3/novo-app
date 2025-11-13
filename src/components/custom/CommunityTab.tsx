"use client";

import { useState } from 'react';
import { TrendingUp, TrendingDown, MessageCircle, Heart, Share2, Bookmark, MoreHorizontal, Eye } from 'lucide-react';

interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    reputation: number;
  };
  title: string;
  content: string;
  asset: string;
  prediction: 'bullish' | 'bearish' | 'neutral';
  likes: number;
  comments: number;
  views: number;
  timestamp: Date;
  tags: string[];
}

export default function CommunityTab() {
  const [posts] = useState<CommunityPost[]>([
    {
      id: '1',
      author: {
        name: 'CryptoTrader_Pro',
        avatar: '👨‍💼',
        reputation: 8542
      },
      title: 'Bitcoin formando padrão de alta - Alvo $50k',
      content: 'Análise técnica mostra formação de triângulo ascendente no gráfico de 4h. RSI em zona neutra, MACD cruzando para cima. Espero rompimento em breve.',
      asset: 'BTC/USD',
      prediction: 'bullish',
      likes: 234,
      comments: 45,
      views: 1823,
      timestamp: new Date(Date.now() - 3600000),
      tags: ['Análise Técnica', 'Bitcoin', 'Alta']
    },
    {
      id: '2',
      author: {
        name: 'MarketAnalyst',
        avatar: '👩‍💻',
        reputation: 6234
      },
      title: 'Ethereum pode corrigir antes de nova alta',
      content: 'Observando resistência forte em $2900. Volume diminuindo, possível correção para $2700 antes de retomar tendência de alta.',
      asset: 'ETH/USD',
      prediction: 'bearish',
      likes: 156,
      comments: 32,
      views: 1245,
      timestamp: new Date(Date.now() - 7200000),
      tags: ['Ethereum', 'Correção', 'Análise']
    },
    {
      id: '3',
      author: {
        name: 'TechInvestor',
        avatar: '🧑‍💼',
        reputation: 4521
      },
      title: 'Solana mostrando força - Momento de acumular?',
      content: 'SOL rompeu resistência importante em $95. Próximo alvo $110. Fundamentos fortes com aumento de TVL no ecossistema.',
      asset: 'SOL/USD',
      prediction: 'bullish',
      likes: 189,
      comments: 28,
      views: 987,
      timestamp: new Date(Date.now() - 10800000),
      tags: ['Solana', 'Altcoins', 'Oportunidade']
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'bullish' | 'bearish'>('all');

  const filteredPosts = filter === 'all' 
    ? posts 
    : posts.filter(post => post.prediction === filter);

  return (
    <div className="flex flex-col h-full bg-[#131722]">
      {/* Header */}
      <div className="p-4 border-b border-[#2a2e39]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Ideias da Comunidade</h2>
          <button className="px-4 py-2 bg-[#2962FF] hover:bg-[#1E53E5] text-white rounded font-medium transition-colors">
            Publicar Ideia
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              filter === 'all'
                ? 'bg-[#2962FF] text-white'
                : 'bg-[#1e222d] text-[#787b86] hover:bg-[#2a2e39]'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('bullish')}
            className={`px-4 py-2 rounded font-medium transition-colors flex items-center gap-2 ${
              filter === 'bullish'
                ? 'bg-[#089981] text-white'
                : 'bg-[#1e222d] text-[#787b86] hover:bg-[#2a2e39]'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Alta
          </button>
          <button
            onClick={() => setFilter('bearish')}
            className={`px-4 py-2 rounded font-medium transition-colors flex items-center gap-2 ${
              filter === 'bearish'
                ? 'bg-[#F23645] text-white'
                : 'bg-[#1e222d] text-[#787b86] hover:bg-[#2a2e39]'
            }`}
          >
            <TrendingDown className="w-4 h-4" />
            Baixa
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="flex-1 overflow-y-auto">
        {filteredPosts.map((post) => (
          <article key={post.id} className="p-4 border-b border-[#2a2e39] hover:bg-[#1e222d] transition-colors">
            {/* Author Info */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2a2e39] rounded-full flex items-center justify-center text-xl">
                  {post.author.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{post.author.name}</span>
                    <span className="text-xs text-[#787b86]">
                      {post.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="text-xs text-[#787b86]">
                    Reputação: {post.author.reputation.toLocaleString()}
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-[#2a2e39] rounded transition-colors">
                <MoreHorizontal className="w-5 h-5 text-[#787b86]" />
              </button>
            </div>

            {/* Post Content */}
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-[#1e222d] text-[#2962FF] text-xs font-semibold rounded">
                  {post.asset}
                </span>
                <span className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${
                  post.prediction === 'bullish'
                    ? 'bg-[#089981]/20 text-[#089981]'
                    : post.prediction === 'bearish'
                    ? 'bg-[#F23645]/20 text-[#F23645]'
                    : 'bg-[#787b86]/20 text-[#787b86]'
                }`}>
                  {post.prediction === 'bullish' ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : post.prediction === 'bearish' ? (
                    <TrendingDown className="w-3 h-3" />
                  ) : null}
                  {post.prediction === 'bullish' ? 'Alta' : post.prediction === 'bearish' ? 'Baixa' : 'Neutro'}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">{post.title}</h3>
              <p className="text-[#d1d4dc] text-sm leading-relaxed">{post.content}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {post.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-[#2a2e39] text-[#787b86] text-xs rounded hover:bg-[#363a45] transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-[#2a2e39]">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-[#787b86] hover:text-[#2962FF] transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm font-medium">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-[#787b86] hover:text-[#2962FF] transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>
                <div className="flex items-center gap-2 text-[#787b86]">
                  <Eye className="w-5 h-5" />
                  <span className="text-sm font-medium">{post.views}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-[#2a2e39] rounded transition-colors">
                  <Bookmark className="w-5 h-5 text-[#787b86]" />
                </button>
                <button className="p-2 hover:bg-[#2a2e39] rounded transition-colors">
                  <Share2 className="w-5 h-5 text-[#787b86]" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
