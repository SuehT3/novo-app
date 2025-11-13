"use client";

import { useState } from 'react';
import { Search, Star, TrendingUp, TrendingDown } from 'lucide-react';
import { Asset } from '@/lib/types';

interface AssetListProps {
  onSelectAsset: (asset: Asset) => void;
  selectedSymbol: string;
}

const mockAssets: Asset[] = [
  { symbol: 'BTCUSD', name: 'Bitcoin', price: 45230.50, change: 1250.30, changePercent: 2.84, volume: '28.5B', type: 'crypto' },
  { symbol: 'ETHUSD', name: 'Ethereum', price: 2345.80, change: -45.20, changePercent: -1.89, volume: '12.3B', type: 'crypto' },
  { symbol: 'AAPL', name: 'Apple Inc', price: 178.25, change: 2.15, changePercent: 1.22, volume: '52.1M', type: 'stock' },
  { symbol: 'GOOGL', name: 'Alphabet Inc', price: 142.65, change: -1.35, changePercent: -0.94, volume: '28.4M', type: 'stock' },
  { symbol: 'TSLA', name: 'Tesla Inc', price: 238.45, change: 8.90, changePercent: 3.88, volume: '95.2M', type: 'stock' },
  { symbol: 'EURUSD', name: 'Euro / US Dollar', price: 1.0875, change: 0.0023, changePercent: 0.21, volume: '145B', type: 'forex' },
  { symbol: 'GBPUSD', name: 'British Pound / US Dollar', price: 1.2654, change: -0.0045, changePercent: -0.35, volume: '98B', type: 'forex' },
  { symbol: 'XAUUSD', name: 'Gold', price: 2045.30, change: 12.50, changePercent: 0.61, volume: '18.5B', type: 'commodity' },
  { symbol: 'SPX', name: 'S&P 500', price: 4783.45, change: 23.80, changePercent: 0.50, volume: '3.2B', type: 'index' },
  { symbol: 'SOLUSDT', name: 'Solana', price: 98.45, change: 5.23, changePercent: 5.61, volume: '2.1B', type: 'crypto' },
];

export default function AssetList({ onSelectAsset, selectedSymbol }: AssetListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'crypto' | 'stock' | 'forex' | 'commodity' | 'index'>('all');

  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || asset.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const filters = [
    { key: 'all', label: 'Todos' },
    { key: 'crypto', label: 'Crypto' },
    { key: 'stock', label: 'Ações' },
    { key: 'forex', label: 'Forex' },
    { key: 'commodity', label: 'Commodities' },
    { key: 'index', label: 'Índices' },
  ];

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="p-4 border-b border-[#1E222D]">
        <h2 className="text-sm font-semibold mb-3 text-[#D9D9D9]">Mercados</h2>
        
        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#787B86]" />
          <input
            type="text"
            placeholder="Buscar ativo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#1E222D] text-white text-sm pl-10 pr-4 py-2 rounded-lg border border-transparent focus:border-[#2962FF] focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-1">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key as any)}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                activeFilter === filter.key
                  ? 'bg-[#2962FF] text-white'
                  : 'bg-[#1E222D] text-[#787B86] hover:text-white'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Asset List */}
      <div className="flex-1 overflow-y-auto">
        {filteredAssets.map((asset) => (
          <button
            key={asset.symbol}
            onClick={() => onSelectAsset(asset)}
            className={`w-full p-3 border-b border-[#1E222D] hover:bg-[#1E222D] transition-colors text-left ${
              selectedSymbol === asset.symbol ? 'bg-[#1E222D]' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-1">
              <div className="flex items-center gap-2">
                <Star className="w-3.5 h-3.5 text-[#787B86] hover:text-[#F7931A] cursor-pointer" />
                <div>
                  <div className="font-semibold text-sm text-white">{asset.symbol}</div>
                  <div className="text-xs text-[#787B86]">{asset.name}</div>
                </div>
              </div>
              <div className={`flex items-center gap-1 ${
                asset.changePercent >= 0 ? 'text-[#26A69A]' : 'text-[#EF5350]'
              }`}>
                {asset.changePercent >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">
                ${asset.price.toLocaleString()}
              </span>
              <span className={`text-xs font-medium ${
                asset.changePercent >= 0 ? 'text-[#26A69A]' : 'text-[#EF5350]'
              }`}>
                {asset.changePercent >= 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%
              </span>
            </div>
            
            <div className="text-xs text-[#787B86] mt-1">
              Vol: {asset.volume}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
