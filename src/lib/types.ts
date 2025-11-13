export interface Asset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  type: 'crypto' | 'stock' | 'forex' | 'commodity' | 'index';
}

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Order {
  id: string;
  type: 'buy' | 'sell';
  asset: string;
  amount: number;
  price: number;
  timestamp: Date;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface Position {
  asset: string;
  amount: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
}

export interface TraderIdea {
  id: string;
  author: {
    name: string;
    avatar: string;
    reputation: number;
    followers: number;
  };
  asset: string;
  title: string;
  description: string;
  image?: string;
  type: 'long' | 'short' | 'neutral';
  targetPrice?: number;
  stopLoss?: number;
  timeframe: string;
  likes: number;
  comments: number;
  timestamp: Date;
  tags: string[];
}

export interface Indicator {
  id: string;
  name: string;
  type: 'RSI' | 'MACD' | 'BB' | 'MA' | 'Volume' | 'Ichimoku';
  enabled: boolean;
  settings: Record<string, number>;
}

export interface Alert {
  id: string;
  asset: string;
  condition: 'price_above' | 'price_below' | 'rsi_overbought' | 'rsi_oversold';
  value: number;
  active: boolean;
  triggered: boolean;
}

export type TimeInterval = '1m' | '5m' | '15m' | '1h' | '4h' | '1d' | '1w' | '1M';

export interface ChartSettings {
  interval: TimeInterval;
  chartType: 'candlestick' | 'line' | 'area' | 'bars';
  indicators: Indicator[];
  drawings: any[];
}
