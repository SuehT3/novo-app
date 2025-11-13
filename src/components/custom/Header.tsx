"use client";

import { useState, useEffect } from 'react';
import { Search, TrendingUp, BarChart3, Users, Bell, Settings, Menu } from 'lucide-react';
import { Asset } from '@/lib/types';

interface HeaderProps {
  selectedAsset: Asset;
  onAssetChange: (asset: Asset) => void;
  activeTab: 'chart' | 'community';
  onTabChange: (tab: 'chart' | 'community') => void;
}

export default function Header({ selectedAsset, onAssetChange, activeTab, onTabChange }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="h-14 bg-[#131722] border-b border-[#1E222D] flex items-center justify-between px-4 flex-shrink-0">
      {/* Left Section - Logo & Navigation */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#2962FF] to-[#1E53E5] rounded flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold hidden sm:block">TradingView</span>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1">
          <button
            onClick={() => onTabChange('chart')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'chart'
                ? 'bg-[#1E222D] text-white'
                : 'text-[#787B86] hover:text-white hover:bg-[#1E222D]'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Gráfico</span>
          </button>
          <button
            onClick={() => onTabChange('community')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'community'
                ? 'bg-[#1E222D] text-white'
                : 'text-[#787B86] hover:text-white hover:bg-[#1E222D]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Comunidade</span>
          </button>
        </nav>
      </div>

      {/* Center Section - Asset Info */}
      <div className="flex items-center gap-4 flex-1 justify-center max-w-2xl mx-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#787B86]" />
          <input
            type="text"
            placeholder="Buscar símbolos..."
            className="w-full bg-[#1E222D] border border-[#2A2E39] rounded-md pl-10 pr-4 py-2 text-sm text-white placeholder-[#787B86] focus:outline-none focus:border-[#2962FF] transition-colors"
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
          />
        </div>

        {/* Selected Asset Info */}
        {mounted && (
          <div className="hidden lg:flex items-center gap-3 bg-[#1E222D] px-4 py-2 rounded-md">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">{selectedAsset.symbol}</span>
                <span className="text-xs text-[#787B86]">{selectedAsset.type.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-lg font-bold">
                  ${selectedAsset.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className={`text-xs font-medium ${selectedAsset.changePercent >= 0 ? 'text-[#26A69A]' : 'text-[#EF5350]'}`}>
                  {selectedAsset.changePercent >= 0 ? '+' : ''}{selectedAsset.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-2">
        <button className="p-2 text-[#787B86] hover:text-white hover:bg-[#1E222D] rounded-md transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 text-[#787B86] hover:text-white hover:bg-[#1E222D] rounded-md transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        <button className="hidden sm:flex items-center gap-2 bg-[#2962FF] hover:bg-[#1E53E5] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
          Entrar
        </button>
      </div>
    </header>
  );
}
