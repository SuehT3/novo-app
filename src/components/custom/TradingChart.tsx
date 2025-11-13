"use client";

import { useEffect, useRef, useState } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import type { IChartApi, ISeriesApi, CandlestickData, Time } from 'lightweight-charts';
import { Asset, TimeInterval } from '@/lib/types';
import { 
  TrendingUp, 
  Activity, 
  BarChart2, 
  Maximize2, 
  Plus,
  Minus,
  Pencil,
  Type,
  Circle,
  Square,
  TrendingDown,
  Ruler,
  Save,
  Camera,
  Settings
} from 'lucide-react';

interface TradingChartProps {
  asset: Asset;
  interval: TimeInterval;
  onIntervalChange: (interval: TimeInterval) => void;
}

export default function TradingChart({ asset, interval, onIntervalChange }: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);
  const [indicators, setIndicators] = useState<string[]>([]);
  const [drawingTool, setDrawingTool] = useState<string | null>(null);

  const intervals: TimeInterval[] = ['1m', '5m', '15m', '1h', '4h', '1d', '1w', '1M'];

  // Gerar dados de candles simulados
  const generateCandleData = (): CandlestickData[] => {
    const data: CandlestickData[] = [];
    let basePrice = asset.price;
    const now = Date.now() / 1000;
    const intervalSeconds: Record<TimeInterval, number> = {
      '1m': 60,
      '5m': 300,
      '15m': 900,
      '1h': 3600,
      '4h': 14400,
      '1d': 86400,
      '1w': 604800,
      '1M': 2592000
    };
    
    const seconds = intervalSeconds[interval];
    const numCandles = 200;

    for (let i = numCandles; i >= 0; i--) {
      const time = (now - (i * seconds)) as Time;
      const volatility = basePrice * 0.02;
      const open = basePrice + (Math.random() - 0.5) * volatility;
      const close = open + (Math.random() - 0.5) * volatility;
      const high = Math.max(open, close) + Math.random() * volatility * 0.5;
      const low = Math.min(open, close) - Math.random() * volatility * 0.5;
      
      data.push({
        time,
        open,
        high,
        low,
        close
      });
      
      basePrice = close;
    }
    
    return data;
  };

  // Gerar dados de volume
  const generateVolumeData = (candleData: CandlestickData[]) => {
    return candleData.map(candle => ({
      time: candle.time,
      value: Math.random() * 1000000 + 500000,
      color: candle.close >= candle.open ? '#26A69A80' : '#EF535080'
    }));
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Criar gráfico
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#131722' },
        textColor: '#D9D9D9',
      },
      grid: {
        vertLines: { color: '#1E222D' },
        horzLines: { color: '#1E222D' },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      timeScale: {
        borderColor: '#2B2B43',
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderColor: '#2B2B43',
      },
      crosshair: {
        mode: 1,
        vertLine: {
          color: '#758696',
          width: 1,
          style: 3,
          labelBackgroundColor: '#2962FF',
        },
        horzLine: {
          color: '#758696',
          width: 1,
          style: 3,
          labelBackgroundColor: '#2962FF',
        },
      },
    });

    chartRef.current = chart;

    // Adicionar série de candles
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26A69A',
      downColor: '#EF5350',
      borderUpColor: '#26A69A',
      borderDownColor: '#EF5350',
      wickUpColor: '#26A69A',
      wickDownColor: '#EF5350',
    });

    candlestickSeriesRef.current = candlestickSeries;

    // Adicionar série de volume
    const volumeSeries = chart.addHistogramSeries({
      color: '#26A69A',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
    });

    volumeSeriesRef.current = volumeSeries;

    // Configurar escala de preço para volume
    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    // Gerar e definir dados
    const candleData = generateCandleData();
    const volumeData = generateVolumeData(candleData);
    
    candlestickSeries.setData(candleData);
    volumeSeries.setData(volumeData);

    // Ajustar visualização
    chart.timeScale().fitContent();

    // Resize handler
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    // Atualização em tempo real
    const updateInterval = setInterval(() => {
      if (candlestickSeriesRef.current && volumeSeriesRef.current) {
        const lastCandle = candleData[candleData.length - 1];
        const newPrice = lastCandle.close + (Math.random() - 0.5) * (asset.price * 0.001);
        
        const updatedCandle: CandlestickData = {
          time: lastCandle.time,
          open: lastCandle.open,
          high: Math.max(lastCandle.high, newPrice),
          low: Math.min(lastCandle.low, newPrice),
          close: newPrice
        };
        
        candlestickSeriesRef.current.update(updatedCandle);
      }
    }, 1000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(updateInterval);
      chart.remove();
    };
  }, [asset, interval]);

  const toggleIndicator = (indicator: string) => {
    setIndicators(prev => 
      prev.includes(indicator) 
        ? prev.filter(i => i !== indicator)
        : [...prev, indicator]
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#131722]">
      {/* Top Toolbar */}
      <div className="h-12 border-b border-[#1E222D] flex items-center justify-between px-3">
        {/* Left - Time Intervals */}
        <div className="flex items-center gap-1">
          {intervals.map((int) => (
            <button
              key={int}
              onClick={() => onIntervalChange(int)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                interval === int
                  ? 'bg-[#2962FF] text-white'
                  : 'text-[#787B86] hover:text-white hover:bg-[#1E222D]'
              }`}
            >
              {int}
            </button>
          ))}
        </div>

        {/* Right - Chart Tools */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setDrawingTool(drawingTool === 'line' ? null : 'line')}
            className={`p-2 rounded transition-colors ${
              drawingTool === 'line'
                ? 'bg-[#2962FF] text-white'
                : 'text-[#787B86] hover:text-white hover:bg-[#1E222D]'
            }`}
            title="Linha de tendência"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDrawingTool(drawingTool === 'horizontal' ? null : 'horizontal')}
            className={`p-2 rounded transition-colors ${
              drawingTool === 'horizontal'
                ? 'bg-[#2962FF] text-white'
                : 'text-[#787B86] hover:text-white hover:bg-[#1E222D]'
            }`}
            title="Linha horizontal"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDrawingTool(drawingTool === 'fibonacci' ? null : 'fibonacci')}
            className={`p-2 rounded transition-colors ${
              drawingTool === 'fibonacci'
                ? 'bg-[#2962FF] text-white'
                : 'text-[#787B86] hover:text-white hover:bg-[#1E222D]'
            }`}
            title="Fibonacci"
          >
            <Ruler className="w-4 h-4" />
          </button>
          <button
            className="p-2 text-[#787B86] hover:text-white hover:bg-[#1E222D] rounded transition-colors"
            title="Texto"
          >
            <Type className="w-4 h-4" />
          </button>
          
          <div className="w-px h-6 bg-[#1E222D] mx-1" />
          
          <button
            className="p-2 text-[#787B86] hover:text-white hover:bg-[#1E222D] rounded transition-colors"
            title="Salvar"
          >
            <Save className="w-4 h-4" />
          </button>
          <button
            className="p-2 text-[#787B86] hover:text-white hover:bg-[#1E222D] rounded transition-colors"
            title="Captura de tela"
          >
            <Camera className="w-4 h-4" />
          </button>
          <button
            className="p-2 text-[#787B86] hover:text-white hover:bg-[#1E222D] rounded transition-colors"
            title="Configurações"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            className="p-2 text-[#787B86] hover:text-white hover:bg-[#1E222D] rounded transition-colors"
            title="Tela cheia"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Secondary Toolbar - Indicators */}
      <div className="h-10 border-b border-[#1E222D] flex items-center px-3 gap-2">
        <button
          onClick={() => toggleIndicator('RSI')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
            indicators.includes('RSI')
              ? 'bg-[#2962FF] text-white'
              : 'text-[#787B86] hover:text-white hover:bg-[#1E222D]'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          RSI
        </button>
        <button
          onClick={() => toggleIndicator('MACD')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
            indicators.includes('MACD')
              ? 'bg-[#2962FF] text-white'
              : 'text-[#787B86] hover:text-white hover:bg-[#1E222D]'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          MACD
        </button>
        <button
          onClick={() => toggleIndicator('BB')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
            indicators.includes('BB')
              ? 'bg-[#2962FF] text-white'
              : 'text-[#787B86] hover:text-white hover:bg-[#1E222D]'
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5" />
          Bollinger
        </button>
        <button
          onClick={() => toggleIndicator('MA')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
            indicators.includes('MA')
              ? 'bg-[#2962FF] text-white'
              : 'text-[#787B86] hover:text-white hover:bg-[#1E222D]'
          }`}
        >
          <TrendingDown className="w-3.5 h-3.5" />
          MA
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#787B86] hover:text-white hover:bg-[#1E222D] rounded transition-colors">
          <Plus className="w-3.5 h-3.5" />
          Indicador
        </button>
      </div>

      {/* Chart Container */}
      <div ref={chartContainerRef} className="flex-1" />
    </div>
  );
}
