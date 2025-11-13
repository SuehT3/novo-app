"use client";

import { useState } from 'react';
import { Star, TrendingUp, TrendingDown, Search, Plus } from 'lucide-react';
import { Asset } from '@/lib/types';

interface WatchlistPanelProps {
  onSelectAsset: (asset: Asset) => void;
  selectedSymbol: string;
}

// Função para formatar preço de forma consistente
const formatPrice = (price: number): string => {
  return price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

export default function WatchlistPanel({ onSelectAsset, selectedSymbol }: WatchlistPanelProps) {
  const [activeCategory, setActiveCategory] = useState<'favorites' | 'crypto' | 'stocks' | 'forex'>('favorites');

  const assets: Record<string, Asset[]> = {
    favorites: [
      { symbol: 'BTCUSD', name: 'Bitcoin', price: 45230.50, change: 1250.30, changePercent: 2.84, volume: '28.5B', type: 'crypto' },
      { symbol: 'ETHUSD', name: 'Ethereum', price: 2845.20, change: -45.80, changePercent: -1.58, volume: '15.2B', type: 'crypto' },
      { symbol: 'AAPL', name: 'Apple Inc.', price: 178.45, change: 2.35, changePercent: 1.33, volume: '52.3M', type: 'stock' },
      { symbol: 'TSLA', name: 'Tesla Inc.', price: 242.80, change: -5.20, changePercent: -2.10, volume: '98.5M', type: 'stock' },
    ],
    crypto: [
      { symbol: 'BTCUSD', name: 'Bitcoin', price: 45230.50, change: 1250.30, changePercent: 2.84, volume: '28.5B', type: 'crypto' },
      { symbol: 'ETHUSD', name: 'Ethereum', price: 2845.20, change: -45.80, changePercent: -1.58, volume: '15.2B', type: 'crypto' },
      { symbol: 'BNBUSD', name: 'Binance Coin', price: 312.45, change: 8.90, changePercent: 2.93, volume: '1.8B', type: 'crypto' },
      { symbol: 'SOLUSD', name: 'Solana', price: 98.75, change: 4.25, changePercent: 4.50, volume: '2.1B', type: 'crypto' },
      { symbol: 'XRPUSD', name: 'Ripple', price: 0.5234, change: 0.0123, changePercent: 2.41, volume: '1.2B', type: 'crypto' },
      { symbol: 'ADAUSD', name: 'Cardano', price: 0.4567, change: -0.0089, changePercent: -1.91, volume: '890M', type: 'crypto' },
    ],
    stocks: [
      { symbol: 'AAPL', name: 'Apple Inc.', price: 178.45, change: 2.35, changePercent: 1.33, volume: '52.3M', type: 'stock' },
      { symbol: 'MSFT', name: 'Microsoft', price: 378.90, change: 5.60, changePercent: 1.50, volume: '28.7M', type: 'stock' },
      { symbol: 'GOOGL', name: 'Alphabet', price: 142.30, change: -1.20, changePercent: -0.84, volume: '22.1M', type: 'stock' },
      { symbol: 'AMZN', name: 'Amazon', price: 152.80, change: 3.45, changePercent: 2.31, volume: '45.6M', type: 'stock' },
      { symbol: 'TSLA', name: 'Tesla Inc.', price: 242.80, change: -5.20, changePercent: -2.10, volume: '98.5M', type: 'stock' },
      { symbol: 'NVDA', name: 'NVIDIA', price: 495.20, change: 12.80, changePercent: 2.65, volume: '38.9M', type: 'stock' },
    ],
    forex: [
      { symbol: 'EURUSD', name: 'Euro / US Dollar', price: 1.0845, change: 0.0023, changePercent: 0.21, volume: '145B', type: 'forex' },
      { symbol: 'GBPUSD', name: 'British Pound / US Dollar', price: 1.2634, change: -0.0045, changePercent: -0.35, volume: '98B', type: 'forex' },
      { symbol: 'USDJPY', name: 'US Dollar / Japanese Yen', price: 149.85, change: 0.45, changePercent: 0.30, volume: '112B', type: 'forex' },
      { symbol: 'AUDUSD', name: 'Australian Dollar / US Dollar', price: 0.6523, change: 0.0012, changePercent: 0.18, volume: '67B', type: 'forex' },
    ]
  };

  const categories = [
    { id: 'favorites' as const, label: 'Favoritos', icon: Star },
    { id: 'crypto' as const, label: 'Cripto', icon: TrendingUp },
    { id: 'stocks' as const, label: 'Ações', icon: TrendingUp },
    { id: 'forex' as const, label: 'Forex', icon: TrendingUp },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-[#1E222D]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-white">Watchlist</h2>
          <button className="p-1 text-[#787B86] hover:text-white hover:bg-[#1E222D] rounded transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#787B86]" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full bg-[#1E222D] border border-[#2A2E39] rounded pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#787B86] focus:outline-none focus:border-[#2962FF] transition-colors"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex border-b border-[#1E222D]">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
              activeCategory === category.id
                ? 'text-white border-b-2 border-[#2962FF]'
                : 'text-[#787B86] hover:text-white'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Asset List */}
      <div className="flex-1 overflow-y-auto">
        {assets[activeCategory].map((asset) => (
          <button
            key={asset.symbol}
            onClick={() => onSelectAsset(asset)}
            className={`w-full px-3 py-2.5 flex items-center justify-between hover:bg-[#1E222D] transition-colors border-l-2 ${
              selectedSymbol === asset.symbol
                ? 'bg-[#1E222D] border-[#2962FF]'
                : 'border-transparent'
            }`}
          >
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-semibold text-white">{asset.symbol}</span>
                <span className="text-[10px] text-[#787B86] uppercase">{asset.type}</span>
              </div>
              <div className="text-[10px] text-[#787B86] truncate">{asset.name}</div>
            </div>
            
            <div className="text-right ml-2">
              <div className="text-xs font-semibold text-white mb-0.5">
                ${formatPrice(asset.price)}
              </div>
              <div className={`text-[10px] font-medium flex items-center justify-end gap-0.5 ${
                asset.changePercent >= 0 ? 'text-[#26A69A]' : 'text-[#EF5350]'
              }`}>
                {asset.changePercent >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {Math.abs(asset.changePercent).toFixed(2)}%
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
