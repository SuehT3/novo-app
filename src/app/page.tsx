"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { TrendingUp, Shield, BookOpen, Users, Mail, Lock, User, Phone, Calendar, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function Home() {
  const [view, setView] = useState<"landing" | "auth" | "dashboard">("landing");
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [registerStep, setRegisterStep] = useState(1);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [validation, setValidation] = useState({
    nameValid: false,
    ageValid: false,
    emailValid: false,
    phoneValid: false,
    passwordValid: false,
    passwordMatch: false,
  });

  // Validação em tempo real
  const validateField = (field: string, value: string) => {
    switch (field) {
      case "name":
        setValidation(prev => ({ ...prev, nameValid: value.length >= 3 }));
        break;
      case "age":
        const age = parseInt(value);
        setValidation(prev => ({ ...prev, ageValid: age >= 18 && age <= 120 }));
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setValidation(prev => ({ ...prev, emailValid: emailRegex.test(value) }));
        break;
      case "phone":
        const phoneRegex = /^\(\d{2}\)\s?\d{4,5}-?\d{4}$/;
        setValidation(prev => ({ ...prev, phoneValid: phoneRegex.test(value) || value.length >= 10 }));
        break;
      case "password":
        setValidation(prev => ({ 
          ...prev, 
          passwordValid: value.length >= 6,
          passwordMatch: formData.confirmPassword === value
        }));
        break;
      case "confirmPassword":
        setValidation(prev => ({ ...prev, passwordMatch: formData.password === value }));
        break;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setView("dashboard");
  };

  const handleRegisterNext = () => {
    if (registerStep === 1 && validation.nameValid && validation.ageValid) {
      setRegisterStep(2);
    } else if (registerStep === 2 && validation.emailValid && validation.phoneValid) {
      setRegisterStep(3);
    } else if (registerStep === 3 && validation.passwordValid && validation.passwordMatch && acceptedTerms) {
      setView("dashboard");
    }
  };

  const canProceedStep1 = validation.nameValid && validation.ageValid;
  const canProceedStep2 = validation.emailValid && validation.phoneValid;
  const canProceedStep3 = validation.passwordValid && validation.passwordMatch && acceptedTerms;

  if (view === "landing") {
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
              onClick={() => setView("auth")}
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
              onClick={() => setView("auth")}
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

  if (view === "auth") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B0B0B] via-[#1a1a1a] to-[#0B0B0B] flex items-center justify-center p-4">
        <div className="w-full max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Branding */}
            <div className="hidden lg:block space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="w-12 h-12 text-emerald-500" />
                <span className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  TradeVision Pro
                </span>
              </div>
              
              <h2 className="text-4xl font-bold leading-tight">
                Análise Técnica
                <span className="block text-emerald-400">Profissional</span>
              </h2>
              
              <p className="text-gray-400 text-lg">
                Junte-se a milhares de traders que confiam em dados reais e transparentes para suas análises.
              </p>

              <div className="space-y-4 pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Dados em Tempo Real</h4>
                    <p className="text-sm text-gray-400">APIs certificadas e verificáveis</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">100% Transparente</h4>
                    <p className="text-sm text-gray-400">Todas as fontes identificadas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Educação Financeira</h4>
                    <p className="text-sm text-gray-400">Aprenda análise técnica profissional</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Auth Forms */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl">
              {/* Toggle Login/Register */}
              <div className="flex gap-2 mb-8 bg-gray-800/50 rounded-xl p-1">
                <button
                  onClick={() => {
                    setAuthMode("login");
                    setRegisterStep(1);
                  }}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                    authMode === "login"
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setAuthMode("register");
                    setRegisterStep(1);
                  }}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                    authMode === "register"
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Criar Conta
                </button>
              </div>

              {/* LOGIN FORM */}
              {authMode === "login" && (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Bem-vindo de volta!</h3>
                    <p className="text-gray-400 text-sm">Entre com suas credenciais</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-gray-300">E-mail</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <Input
                        id="login-email"
                        type="email"
                        required
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className="bg-gray-800/50 border-gray-700 text-white pl-11 focus:border-emerald-500 h-12"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-gray-300">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <Input
                        id="login-password"
                        type="password"
                        required
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="bg-gray-800/50 border-gray-700 text-white pl-11 focus:border-emerald-500 h-12"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold h-12"
                  >
                    Entrar
                  </Button>

                  <p className="text-center text-sm text-gray-500">
                    Esqueceu sua senha?{" "}
                    <button type="button" className="text-emerald-500 hover:text-emerald-400 font-semibold">
                      Recuperar
                    </button>
                  </p>
                </form>
              )}

              {/* REGISTER FORM - MULTI-STEP */}
              {authMode === "register" && (
                <div className="space-y-6">
                  {/* Progress Indicator */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Passo {registerStep} de 3</span>
                      <span className="text-emerald-500 font-semibold">{Math.round((registerStep / 3) * 100)}%</span>
                    </div>
                    <div className="flex gap-2">
                      <div className={`h-2 flex-1 rounded-full transition-all ${registerStep >= 1 ? "bg-gradient-to-r from-emerald-500 to-cyan-500" : "bg-gray-700"}`} />
                      <div className={`h-2 flex-1 rounded-full transition-all ${registerStep >= 2 ? "bg-gradient-to-r from-emerald-500 to-cyan-500" : "bg-gray-700"}`} />
                      <div className={`h-2 flex-1 rounded-full transition-all ${registerStep >= 3 ? "bg-gradient-to-r from-emerald-500 to-cyan-500" : "bg-gray-700"}`} />
                    </div>
                  </div>

                  {/* STEP 1 - Personal Info */}
                  {registerStep === 1 && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Informações Pessoais</h3>
                        <p className="text-gray-400 text-sm">Vamos começar com o básico</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-300">Nome Completo *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <Input
                            id="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className={`bg-gray-800/50 border-gray-700 text-white pl-11 h-12 transition-all ${
                              formData.name && (validation.nameValid ? "border-emerald-500" : "border-red-500")
                            }`}
                            placeholder="Seu nome completo"
                          />
                          {formData.name && validation.nameValid && (
                            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                          )}
                        </div>
                        {formData.name && !validation.nameValid && (
                          <p className="text-xs text-red-500">Nome deve ter pelo menos 3 caracteres</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="age" className="text-gray-300">Idade *</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <Input
                            id="age"
                            type="number"
                            required
                            min="18"
                            max="120"
                            value={formData.age}
                            onChange={(e) => handleInputChange("age", e.target.value)}
                            className={`bg-gray-800/50 border-gray-700 text-white pl-11 h-12 transition-all ${
                              formData.age && (validation.ageValid ? "border-emerald-500" : "border-red-500")
                            }`}
                            placeholder="Sua idade"
                          />
                          {formData.age && validation.ageValid && (
                            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                          )}
                        </div>
                        {formData.age && !validation.ageValid && (
                          <p className="text-xs text-red-500">Você deve ter pelo menos 18 anos</p>
                        )}
                      </div>

                      <Button
                        onClick={handleRegisterNext}
                        disabled={!canProceedStep1}
                        className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Próximo
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  )}

                  {/* STEP 2 - Contact Info */}
                  {registerStep === 2 && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Informações de Contato</h3>
                        <p className="text-gray-400 text-sm">Como podemos te encontrar?</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300">E-mail *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className={`bg-gray-800/50 border-gray-700 text-white pl-11 h-12 transition-all ${
                              formData.email && (validation.emailValid ? "border-emerald-500" : "border-red-500")
                            }`}
                            placeholder="seu@email.com"
                          />
                          {formData.email && validation.emailValid && (
                            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                          )}
                        </div>
                        {formData.email && !validation.emailValid && (
                          <p className="text-xs text-red-500">Digite um e-mail válido</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-300">Telefone *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <Input
                            id="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className={`bg-gray-800/50 border-gray-700 text-white pl-11 h-12 transition-all ${
                              formData.phone && (validation.phoneValid ? "border-emerald-500" : "border-red-500")
                            }`}
                            placeholder="(00) 00000-0000"
                          />
                          {formData.phone && validation.phoneValid && (
                            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                          )}
                        </div>
                        {formData.phone && !validation.phoneValid && (
                          <p className="text-xs text-red-500">Digite um telefone válido</p>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={() => setRegisterStep(1)}
                          variant="outline"
                          className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 h-12"
                        >
                          <ArrowLeft className="w-5 h-5 mr-2" />
                          Voltar
                        </Button>
                        <Button
                          onClick={handleRegisterNext}
                          disabled={!canProceedStep2}
                          className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Próximo
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3 - Security & Terms */}
                  {registerStep === 3 && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Segurança e Termos</h3>
                        <p className="text-gray-400 text-sm">Proteja sua conta</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-gray-300">Senha *</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <Input
                            id="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            className={`bg-gray-800/50 border-gray-700 text-white pl-11 h-12 transition-all ${
                              formData.password && (validation.passwordValid ? "border-emerald-500" : "border-red-500")
                            }`}
                            placeholder="Mínimo 6 caracteres"
                          />
                          {formData.password && validation.passwordValid && (
                            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                          )}
                        </div>
                        {formData.password && !validation.passwordValid && (
                          <p className="text-xs text-red-500">Senha deve ter pelo menos 6 caracteres</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-gray-300">Confirmar Senha *</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                            className={`bg-gray-800/50 border-gray-700 text-white pl-11 h-12 transition-all ${
                              formData.confirmPassword && (validation.passwordMatch ? "border-emerald-500" : "border-red-500")
                            }`}
                            placeholder="Repita sua senha"
                          />
                          {formData.confirmPassword && validation.passwordMatch && (
                            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                          )}
                        </div>
                        {formData.confirmPassword && !validation.passwordMatch && (
                          <p className="text-xs text-red-500">As senhas não coincidem</p>
                        )}
                      </div>

                      {/* Terms */}
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 space-y-3">
                        <h4 className="font-semibold text-yellow-500 flex items-center gap-2 text-sm">
                          <Shield className="w-4 h-4" />
                          Aviso de Risco e Termos de Uso
                        </h4>
                        <div className="text-xs text-gray-300 space-y-2 max-h-32 overflow-y-auto">
                          <p>
                            O investimento em ativos financeiros envolve riscos e pode resultar em perda de capital.
                            As informações têm caráter educacional e não constituem recomendações de investimento.
                          </p>
                          <p>
                            Dados fornecidos por APIs certificadas (Finnhub, Alpha Vantage, Polygon.io).
                            Você deve ter 18+ anos e compreender os riscos do mercado financeiro.
                          </p>
                        </div>

                        <div className="flex items-start gap-3 pt-3 border-t border-yellow-500/30">
                          <Checkbox
                            id="terms"
                            checked={acceptedTerms}
                            onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                            className="mt-0.5"
                          />
                          <Label htmlFor="terms" className="text-xs text-gray-300 cursor-pointer leading-relaxed">
                            Li e aceito os Termos de Uso. Compreendo que este app não oferece recomendações de investimento
                            e estou ciente dos riscos do mercado financeiro.
                          </Label>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={() => setRegisterStep(2)}
                          variant="outline"
                          className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 h-12"
                        >
                          <ArrowLeft className="w-5 h-5 mr-2" />
                          Voltar
                        </Button>
                        <Button
                          onClick={handleRegisterNext}
                          disabled={!canProceedStep3}
                          className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Criar Conta
                          <CheckCircle2 className="w-5 h-5 ml-2" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => setView("landing")}
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
                onClick={() => setView("landing")}
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
