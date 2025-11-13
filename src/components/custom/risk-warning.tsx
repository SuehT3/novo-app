import { Shield } from "lucide-react";

export function RiskWarning() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900/30 backdrop-blur-sm">
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
  );
}
