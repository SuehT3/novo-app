"use client";

import { useState } from 'react';
import { TrendingUp, TrendingDown, MessageSquare, Heart, Share2, Bookmark, MoreHorizontal, Filter } from 'lucide-react';

interface TraderPost {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    reputation: number;
    verified: boolean;
  };
  asset: string;
  type: 'long' | 'short' | 'neutral';
  title: string;
  description: string;
  chart?: string;
  targetPrice?: number;
  stopLoss?: number;
  timeframe: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  tags: string[];
  liked?: boolean;
  bookmarked?: boolean;
}

export default function CommunityFeed() {
  const [filter, setFilter] = useState<'all' | 'following' | 'trending'>('all');
  
  const posts: TraderPost[] = [
    {
      id: '1',
      author: {
        name: 'Carlos Trader',
        username: '@carlostrader',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
        reputation: 4.8,
        verified: true
      },
      asset: 'BTCUSD',
      type: 'long',
      title: 'Bitcoin rompendo resistência de $45k - Alvo $48k',
      description: 'Análise técnica mostra rompimento claro da resistência em $45.000 com volume crescente. RSI em 62 indica espaço para alta. Fibonacci aponta próximo alvo em $48.200.',
      targetPrice: 48200,
      stopLoss: 43800,
      timeframe: '1-2 semanas',
      likes: 234,
      comments: 45,
      shares: 12,
      timestamp: 'há 2 horas',
      tags: ['Bitcoin', 'Análise Técnica', 'Rompimento'],
      liked: false,
      bookmarked: false
    },
    {
      id: '2',
      author: {
        name: 'Ana Silva',
        username: '@anasilva',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
        reputation: 4.6,
        verified: true
      },
      asset: 'ETHUSD',
      type: 'short',
      title: 'Ethereum formando topo duplo - Cuidado com correção',
      description: 'Padrão de topo duplo se formando no gráfico de 4h. MACD divergente e volume decrescente. Possível correção para região de $2.650.',
      targetPrice: 2650,
      stopLoss: 2920,
      timeframe: '3-5 dias',
      likes: 189,
      comments: 32,
      shares: 8,
      timestamp: 'há 4 horas',
      tags: ['Ethereum', 'Padrão Gráfico', 'Correção'],
      liked: true,
      bookmarked: false
    },
    {
      id: '3',
      author: {
        name: 'Pedro Martins',
        username: '@pedromartins',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
        reputation: 4.9,
        verified: true
      },
      asset: 'AAPL',
      type: 'long',
      title: 'Apple com suporte forte em $175 - Oportunidade de compra',
      description: 'AAPL testou suporte de $175 três vezes e segurou. Médias móveis de 50 e 200 dias apontam para cima. Earnings positivos podem impulsionar para $185.',
      targetPrice: 185,
      stopLoss: 172,
      timeframe: '2-3 semanas',
      likes: 312,
      comments: 67,
      shares: 23,
      timestamp: 'há 6 horas',
      tags: ['Apple', 'Ações', 'Suporte'],
      liked: false,
      bookmarked: true
    },
    {
      id: '4',
      author: {
        name: 'Julia Costa',
        username: '@juliacosta',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Julia',
        reputation: 4.7,
        verified: false
      },
      asset: 'SOLUSD',
      type: 'long',
      title: 'Solana em acumulação - Possível explosão em breve',
      description: 'SOL consolidando entre $95-$100 há 2 semanas. Volume de compra aumentando. Bollinger Bands estreitando indicam movimento forte próximo.',
      targetPrice: 115,
      stopLoss: 92,
      timeframe: '1-2 semanas',
      likes: 156,
      comments: 28,
      shares: 9,
      timestamp: 'há 8 horas',
      tags: ['Solana', 'Acumulação', 'Cripto'],
      liked: false,
      bookmarked: false
    }
  ];

  const [postsState, setPostsState] = useState(posts);

  const toggleLike = (postId: string) => {
    setPostsState(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const toggleBookmark = (postId: string) => {
    setPostsState(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, bookmarked: !post.bookmarked }
        : post
    ));
  };

  return (
    <div className="flex flex-col h-full bg-[#131722]">
      {/* Header */}
      <div className="h-14 border-b border-[#1E222D] flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-bold text-white">Comunidade de Traders</h1>
          <div className="flex items-center gap-1 bg-[#1E222D] rounded-md p-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                filter === 'all'
                  ? 'bg-[#2962FF] text-white'
                  : 'text-[#787B86] hover:text-white'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter('following')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                filter === 'following'
                  ? 'bg-[#2962FF] text-white'
                  : 'text-[#787B86] hover:text-white'
              }`}
            >
              Seguindo
            </button>
            <button
              onClick={() => setFilter('trending')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                filter === 'trending'
                  ? 'bg-[#2962FF] text-white'
                  : 'text-[#787B86] hover:text-white'
              }`}
            >
              Em Alta
            </button>
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-[#2962FF] hover:bg-[#1E53E5] text-white rounded-md text-sm font-medium transition-colors">
          <TrendingUp className="w-4 h-4" />
          Publicar Análise
        </button>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto py-6 px-4 space-y-4">
          {postsState.map((post) => (
            <div key={post.id} className="bg-[#1E222D] rounded-lg border border-[#2A2E39] overflow-hidden hover:border-[#363A45] transition-colors">
              {/* Post Header */}
              <div className="p-4 flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full bg-[#2A2E39]"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{post.author.name}</span>
                      {post.author.verified && (
                        <div className="w-4 h-4 bg-[#2962FF] rounded-full flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      <span className="text-xs text-[#787B86]">{post.author.username}</span>
                      <span className="text-xs text-[#787B86]">•</span>
                      <span className="text-xs text-[#787B86]">{post.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-[#787B86]">Reputação: {post.author.reputation}</span>
                    </div>
                  </div>
                </div>
                
                <button className="p-1 text-[#787B86] hover:text-white hover:bg-[#2A2E39] rounded transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-4">
                {/* Asset & Type Badge */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-[#2A2E39] text-[#2962FF] text-xs font-semibold rounded">
                    {post.asset}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded flex items-center gap-1 ${
                    post.type === 'long' 
                      ? 'bg-[#26A69A]/20 text-[#26A69A]' 
                      : post.type === 'short'
                      ? 'bg-[#EF5350]/20 text-[#EF5350]'
                      : 'bg-[#787B86]/20 text-[#787B86]'
                  }`}>
                    {post.type === 'long' ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : post.type === 'short' ? (
                      <TrendingDown className="w-3 h-3" />
                    ) : null}
                    {post.type.toUpperCase()}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white mb-2">{post.title}</h3>
                
                {/* Description */}
                <p className="text-sm text-[#B2B5BE] leading-relaxed mb-3">{post.description}</p>

                {/* Trading Info */}
                {(post.targetPrice || post.stopLoss) && (
                  <div className="flex items-center gap-4 p-3 bg-[#131722] rounded-md mb-3">
                    {post.targetPrice && (
                      <div>
                        <div className="text-[10px] text-[#787B86] uppercase mb-0.5">Alvo</div>
                        <div className="text-sm font-semibold text-[#26A69A]">${post.targetPrice.toLocaleString()}</div>
                      </div>
                    )}
                    {post.stopLoss && (
                      <div>
                        <div className="text-[10px] text-[#787B86] uppercase mb-0.5">Stop Loss</div>
                        <div className="text-sm font-semibold text-[#EF5350]">${post.stopLoss.toLocaleString()}</div>
                      </div>
                    )}
                    <div>
                      <div className="text-[10px] text-[#787B86] uppercase mb-0.5">Prazo</div>
                      <div className="text-sm font-semibold text-white">{post.timeframe}</div>
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-[#2A2E39] text-[#787B86] text-xs rounded hover:bg-[#363A45] transition-colors cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Post Actions */}
              <div className="px-4 py-3 border-t border-[#2A2E39] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 text-sm transition-colors ${
                      post.liked
                        ? 'text-[#EF5350]'
                        : 'text-[#787B86] hover:text-[#EF5350]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} />
                    <span>{post.likes}</span>
                  </button>
                  
                  <button className="flex items-center gap-1.5 text-sm text-[#787B86] hover:text-white transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </button>
                  
                  <button className="flex items-center gap-1.5 text-sm text-[#787B86] hover:text-white transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>{post.shares}</span>
                  </button>
                </div>
                
                <button
                  onClick={() => toggleBookmark(post.id)}
                  className={`p-1.5 rounded transition-colors ${
                    post.bookmarked
                      ? 'text-[#2962FF] bg-[#2962FF]/10'
                      : 'text-[#787B86] hover:text-white hover:bg-[#2A2E39]'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${post.bookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
