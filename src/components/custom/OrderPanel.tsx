"use client";

import { useState } from 'react';
import { TrendingUp, TrendingDown, Clock, DollarSign } from 'lucide-react';
import { Asset } from '@/lib/types';

interface OrderPanelProps {
  asset: Asset;
}

interface Order {
  id: string;
  type: 'buy' | 'sell';
  asset: string;
  amount: number;
  price: number;
  total: number;
  time: string;
  status: 'completed' | 'pending' | 'cancelled';
}

interface Position {
  asset: string;
  type: 'long' | 'short';
  amount: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
}

export default function OrderPanel({ asset }: OrderPanelProps) {
  const [activeTab, setActiveTab] = useState<'positions' | 'orders' | 'history'>('positions');

  const positions: Position[] = [
    {
      asset: 'BTCUSD',
      type: 'long',
      amount: 0.5,
      entryPrice: 43500,
      currentPrice: 45230.50,
      pnl: 865.25,
      pnlPercent: 3.98
    },
    {
      asset: 'ETHUSD',
      type: 'long',
      amount: 2.5,
      entryPrice: 2890,
      currentPrice: 2845.20,
      pnl: -112.00,
      pnlPercent: -1.55
    }
  ];

  const orders: Order[] = [
    {
      id: '1',
      type: 'buy',
      asset: 'BTCUSD',
      amount: 0.25,
      price: 44800,
      total: 11200,
      time: '14:32:15',
      status: 'pending'
    },
    {
      id: '2',
      type: 'sell',
      asset: 'ETHUSD',
      amount: 1.0,
      price: 2900,
      total: 2900,
      time: '14:28:42',
      status: 'pending'
    }
  ];

  const history: Order[] = [
    {
      id: '3',
      type: 'buy',
      asset: 'BTCUSD',
      amount: 0.5,
      price: 43500,
      total: 21750,
      time: '13:15:23',
      status: 'completed'
    },
    {
      id: '4',
      type: 'buy',
      asset: 'ETHUSD',
      amount: 2.5,
      price: 2890,
      total: 7225,
      time: '12:45:18',
      status: 'completed'
    },
    {
      id: '5',
      type: 'sell',
      asset: 'AAPL',
      amount: 50,
      price: 176.20,
      total: 8810,
      time: '11:30:05',
      status: 'completed'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#131722]">
      {/* Tabs */}
      <div className="h-10 border-b border-[#1E222D] flex items-center px-3">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('positions')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              activeTab === 'positions'
                ? 'bg-[#2962FF] text-white'
                : 'text-[#787B86] hover:text-white hover:bg-[#1E222D]'
            }`}
          >
            Posições
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              activeTab === 'orders'
                ? 'bg-[#2962FF] text-white'
                : 'text-[#787B86] hover:text-white hover:bg-[#1E222D]'
            }`}
          >
            Ordens Abertas
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              activeTab === 'history'
                ? 'bg-[#2962FF] text-white'
                : 'text-[#787B86] hover:text-white hover:bg-[#1E222D]'
            }`}
          >
            Histórico
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'positions' && (
          <div className="p-3">
            {positions.length > 0 ? (
              <div className="space-y-2">
                {positions.map((position, index) => (
                  <div
                    key={index}
                    className="bg-[#1E222D] rounded-lg p-3 border border-[#2A2E39] hover:border-[#363A45] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{position.asset}</span>
                        <span className={`px-2 py-0.5 text-[10px] font-semibold rounded uppercase ${
                          position.type === 'long'
                            ? 'bg-[#26A69A]/20 text-[#26A69A]'
                            : 'bg-[#EF5350]/20 text-[#EF5350]'
                        }`}>
                          {position.type}
                        </span>
                      </div>
                      <div className={`text-sm font-bold ${
                        position.pnl >= 0 ? 'text-[#26A69A]' : 'text-[#EF5350]'
                      }`}>
                        {position.pnl >= 0 ? '+' : ''}{position.pnl.toFixed(2)} USD
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-3 text-xs">
                      <div>
                        <div className="text-[#787B86] mb-1">Quantidade</div>
                        <div className="text-white font-medium">{position.amount}</div>
                      </div>
                      <div>
                        <div className="text-[#787B86] mb-1">Entrada</div>
                        <div className="text-white font-medium">${position.entryPrice.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[#787B86] mb-1">Atual</div>
                        <div className="text-white font-medium">${position.currentPrice.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[#787B86] mb-1">P&L %</div>
                        <div className={`font-bold ${
                          position.pnlPercent >= 0 ? 'text-[#26A69A]' : 'text-[#EF5350]'
                        }`}>
                          {position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex gap-2">
                      <button className="flex-1 py-1.5 bg-[#EF5350] hover:bg-[#EF5350]/80 text-white text-xs font-medium rounded transition-colors">
                        Fechar Posição
                      </button>
                      <button className="px-3 py-1.5 bg-[#2A2E39] hover:bg-[#363A45] text-white text-xs font-medium rounded transition-colors">
                        Editar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <TrendingUp className="w-12 h-12 text-[#787B86] mb-3" />
                <p className="text-sm text-[#787B86]">Nenhuma posição aberta</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-[#1E222D] text-[#787B86]">
                <tr>
                  <th className="text-left py-2 px-3 font-medium">Tipo</th>
                  <th className="text-left py-2 px-3 font-medium">Ativo</th>
                  <th className="text-right py-2 px-3 font-medium">Quantidade</th>
                  <th className="text-right py-2 px-3 font-medium">Preço</th>
                  <th className="text-right py-2 px-3 font-medium">Total</th>
                  <th className="text-left py-2 px-3 font-medium">Hora</th>
                  <th className="text-center py-2 px-3 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E222D]">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#1E222D] transition-colors">
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        order.type === 'buy'
                          ? 'bg-[#26A69A]/20 text-[#26A69A]'
                          : 'bg-[#EF5350]/20 text-[#EF5350]'
                      }`}>
                        {order.type}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-white font-medium">{order.asset}</td>
                    <td className="py-2 px-3 text-right text-white">{order.amount}</td>
                    <td className="py-2 px-3 text-right text-white">${order.price.toLocaleString()}</td>
                    <td className="py-2 px-3 text-right text-white">${order.total.toLocaleString()}</td>
                    <td className="py-2 px-3 text-[#787B86]">{order.time}</td>
                    <td className="py-2 px-3 text-center">
                      <button className="px-2 py-1 bg-[#EF5350] hover:bg-[#EF5350]/80 text-white text-[10px] font-medium rounded transition-colors">
                        Cancelar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-[#1E222D] text-[#787B86]">
                <tr>
                  <th className="text-left py-2 px-3 font-medium">Tipo</th>
                  <th className="text-left py-2 px-3 font-medium">Ativo</th>
                  <th className="text-right py-2 px-3 font-medium">Quantidade</th>
                  <th className="text-right py-2 px-3 font-medium">Preço</th>
                  <th className="text-right py-2 px-3 font-medium">Total</th>
                  <th className="text-left py-2 px-3 font-medium">Hora</th>
                  <th className="text-left py-2 px-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E222D]">
                {history.map((order) => (
                  <tr key={order.id} className="hover:bg-[#1E222D] transition-colors">
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        order.type === 'buy'
                          ? 'bg-[#26A69A]/20 text-[#26A69A]'
                          : 'bg-[#EF5350]/20 text-[#EF5350]'
                      }`}>
                        {order.type}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-white font-medium">{order.asset}</td>
                    <td className="py-2 px-3 text-right text-white">{order.amount}</td>
                    <td className="py-2 px-3 text-right text-white">${order.price.toLocaleString()}</td>
                    <td className="py-2 px-3 text-right text-white">${order.total.toLocaleString()}</td>
                    <td className="py-2 px-3 text-[#787B86]">{order.time}</td>
                    <td className="py-2 px-3">
                      <span className="px-2 py-0.5 bg-[#26A69A]/20 text-[#26A69A] rounded text-[10px] font-semibold uppercase">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
