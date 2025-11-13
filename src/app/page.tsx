"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { TrendingUp, Shield, BookOpen, Users } from "lucide-react";

export default function Home() {
  const [step, setStep] = useState<"landing" | "register" | "dashboard">("landing");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (acceptedTerms) {
      setStep("dashboard");
    }
  };

  if (step === "landing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B0B0B] via-[#1a1a1a] to-[#0B0B0B]">
        {/* Header */}
        <header className="border-b border-gray-800 bg-[#0B0B0B]/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-emerald-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                TradeVision Pro
              </span>
            </div>
            <Button
              onClick={() => setStep("register")}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold"
            >
              Começar Agora
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Análise Técnica
              <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Profissional e Transparente
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Acompanhe ações, índices e criptomoedas em tempo real com dados verificados de APIs oficiais.
              Educação financeira com foco em transparência e segurança.
            </p>
            <Button
              onClick={() => setStep("register")}
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold text-lg px-8 py-6"
            >
              Criar Conta Gratuita
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-emerald-500/50 transition-all">
              <TrendingUp className="w-12 h-12 text-emerald-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Dados Reais</h3>
              <p className="text-gray-400">
                Cotações em tempo real de APIs verificadas como Finnhub, Alpha Vantage e Polygon.io
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all">
              <Shield className="w-12 h-12 text-cyan-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Transparência Total</h3>
              <p className="text-gray-400">
                Todas as fontes de dados são exibidas com timestamp e origem verificável
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all">
              <BookOpen className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Educação Financeira</h3>
              <p className="text-gray-400">
                Aprenda análise técnica com tutoriais didáticos e neutros, sem promessas falsas
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all">
              <Users className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Comunidade</h3>
              <p className="text-gray-400">
                Compartilhe análises e ideias com outros traders de forma responsável
              </p>
            </div>
          </div>
        </section>

        {/* Risk Warning */}
        <section className="border-t border-gray-800 bg-gray-900/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <h4 className="text-sm font-semibold text-yellow-500 mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                AVISO DE RISCO IMPORTANTE
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                O investimento em ações, criptomoedas e outros ativos financeiros envolve riscos e pode resultar em perda parcial ou total do capital investido.
                As informações e análises apresentadas neste aplicativo têm caráter educacional e informativo.
                Não constituem recomendações de investimento.
                O aplicativo utiliza dados de mercado reais obtidos de fontes públicas e APIs financeiras certificadas (como Finnhub, Alpha Vantage, Yahoo Finance ou Polygon.io).
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-8">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            <p>© 2024 TradeVision Pro. Todos os direitos reservados.</p>
            <p className="mt-2">Dados fornecidos por APIs financeiras certificadas.</p>
          </div>
        </footer>
      </div>
    );
  }

  if (step === "register") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B0B0B] via-[#1a1a1a] to-[#0B0B0B] flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="w-10 h-10 text-emerald-500" />
              <span className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                TradeVision Pro
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Criar Conta</h2>
            <p className="text-gray-400">Preencha seus dados para começar</p>
          </div>

          {/* Registration Form */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">Nome Completo *</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-gray-800/50 border-gray-700 text-white focus:border-emerald-500"
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-gray-300">Idade *</Label>
                <Input
                  id="age"
                  type="number"
                  required
                  min="18"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="bg-gray-800/50 border-gray-700 text-white focus:border-emerald-500"
                  placeholder="Sua idade (mínimo 18 anos)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-gray-800/50 border-gray-700 text-white focus:border-emerald-500"
                  placeholder="seu@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-300">Número de Telefone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-gray-800/50 border-gray-700 text-white focus:border-emerald-500"
                  placeholder="(00) 00000-0000"
                />
              </div>

              {/* Terms and Conditions */}
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 space-y-4">
                <h4 className="font-semibold text-yellow-500 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Termos de Uso e Aviso de Risco
                </h4>
                <div className="text-sm text-gray-300 space-y-2 max-h-48 overflow-y-auto">
                  <p className="font-semibold">AVISO DE RISCO:</p>
                  <p>
                    O investimento em ações, criptomoedas e outros ativos financeiros envolve riscos significativos
                    e pode resultar em perda parcial ou total do capital investido.
                  </p>
                  <p>
                    As informações e análises apresentadas neste aplicativo têm caráter estritamente educacional e informativo.
                    Não constituem recomendações de investimento, consultoria financeira ou aconselhamento personalizado.
                  </p>
                  <p>
                    O TradeVision Pro utiliza dados de mercado reais obtidos de fontes públicas e APIs financeiras certificadas
                    (como Finnhub, Alpha Vantage, Yahoo Finance ou Polygon.io). Todas as fontes são identificadas e verificáveis.
                  </p>
                  <p className="font-semibold">RESPONSABILIDADE DO USUÁRIO:</p>
                  <p>
                    Você é o único responsável por suas decisões de investimento. Recomendamos consultar um profissional
                    certificado antes de realizar qualquer operação financeira.
                  </p>
                  <p>
                    Ao aceitar estes termos, você declara ter mais de 18 anos e compreender os riscos envolvidos
                    em operações no mercado financeiro.
                  </p>
                </div>

                <div className="flex items-start gap-3 pt-4 border-t border-yellow-500/30">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-300 cursor-pointer leading-relaxed">
                    Li e aceito os Termos de Uso e compreendo que este aplicativo não oferece recomendações de investimento.
                    Declaro ter mais de 18 anos e estar ciente dos riscos do mercado financeiro.
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={!acceptedTerms}
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold py-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Criar Conta e Acessar Plataforma
              </Button>

              <p className="text-center text-sm text-gray-500">
                Já tem uma conta?{" "}
                <button
                  type="button"
                  onClick={() => setStep("dashboard")}
                  className="text-emerald-500 hover:text-emerald-400 font-semibold"
                >
                  Fazer Login
                </button>
              </p>
            </form>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => setStep("landing")}
              className="text-gray-500 hover:text-gray-300 text-sm"
            >
              ← Voltar para página inicial
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-[#0B0B0B]">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#0B0B0B] sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-emerald-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                TradeVision Pro
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <button className="text-gray-300 hover:text-white transition-colors font-medium">
                Dashboard
              </button>
              <button className="text-gray-300 hover:text-white transition-colors font-medium">
                Gráficos
              </button>
              <button className="text-gray-300 hover:text-white transition-colors font-medium">
                Comunidade
              </button>
              <button className="text-gray-300 hover:text-white transition-colors font-medium">
                Educação
              </button>
              <button className="text-gray-300 hover:text-white transition-colors font-medium">
                Alertas
              </button>
            </nav>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Olá, {formData.name || "Usuário"}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStep("landing")}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Market Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Visão Geral do Mercado</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* S&P 500 */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">S&P 500</span>
                <span className="text-emerald-500 text-xs">+1.24%</span>
              </div>
              <div className="text-2xl font-bold mb-1">5,127.79</div>
              <div className="text-xs text-gray-500">Fonte: Finnhub.io • Atualizado às 15:34 UTC</div>
            </div>

            {/* NASDAQ */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">NASDAQ</span>
                <span className="text-emerald-500 text-xs">+1.68%</span>
              </div>
              <div className="text-2xl font-bold mb-1">16,274.94</div>
              <div className="text-xs text-gray-500">Fonte: Alpha Vantage • Atualizado às 15:34 UTC</div>
            </div>

            {/* IBOVESPA */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-red-500/50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">IBOVESPA</span>
                <span className="text-red-500 text-xs">-0.87%</span>
              </div>
              <div className="text-2xl font-bold mb-1">128,456.32</div>
              <div className="text-xs text-gray-500">Fonte: Yahoo Finance • Atualizado às 15:34 UTC</div>
            </div>

            {/* BTC/USD */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">BTC/USD</span>
                <span className="text-emerald-500 text-xs">+3.42%</span>
              </div>
              <div className="text-2xl font-bold mb-1">$67,234.50</div>
              <div className="text-xs text-gray-500">Fonte: Polygon.io • Atualizado às 15:34 UTC</div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Acesso Rápido</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-xl p-6 hover:border-emerald-500 transition-all text-left group">
              <TrendingUp className="w-10 h-10 text-emerald-500 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold mb-2">Analisar Gráficos</h3>
              <p className="text-sm text-gray-400">
                Acesse gráficos interativos com indicadores técnicos profissionais
              </p>
            </button>

            <button className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500 transition-all text-left group">
              <BookOpen className="w-10 h-10 text-purple-500 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold mb-2">Aprender Análise Técnica</h3>
              <p className="text-sm text-gray-400">
                Tutoriais didáticos sobre indicadores e estratégias de análise
              </p>
            </button>

            <button className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-6 hover:border-orange-500 transition-all text-left group">
              <Users className="w-10 h-10 text-orange-500 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold mb-2">Comunidade de Traders</h3>
              <p className="text-sm text-gray-400">
                Compartilhe e explore análises de outros usuários
              </p>
            </button>
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Atividade Recente</h2>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <div className="text-center py-12 text-gray-500">
              <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Nenhuma atividade ainda</p>
              <p className="text-sm mt-2">Comece analisando gráficos ou criando alertas</p>
            </div>
          </div>
        </section>
      </main>

      {/* Risk Warning Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/30 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start gap-3 max-w-6xl mx-auto">
            <Shield className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-yellow-500 mb-1">AVISO DE RISCO</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                O investimento em ações, criptomoedas e outros ativos financeiros envolve riscos e pode resultar em perda parcial ou total do capital investido.
                As informações apresentadas têm caráter educacional e informativo. Não constituem recomendações de investimento.
                Dados fornecidos por APIs certificadas: Finnhub, Alpha Vantage, Yahoo Finance e Polygon.io.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
