import React, { useState } from 'react';
import { Calculator, DollarSign, CheckCircle } from 'lucide-react';
import '../style/CalculadoraPrecos.css';

const CalculadoraPrecos = () => {
  const [calculos, setCalculos] = useState({
    plano: 'basico',
    paginas: 4,
    dominio: false,
    seo: false,
    conteudo: 0,
    manutencao: 0,
    servicosAdicionais: []
  });

  const precos = {
    basico: 2000,
    profissional: 5000,
    premium: 9000,
    dominio: 50,
    seo: 300,
    conteudo: { pagina: 200, post: 100 },
    manutencao: 200
  };

  const servicosExtras = [
    { id: 'redes-sociais', nome: 'Integração Redes Sociais', preco: 300 },
    { id: 'blog', nome: 'Blog Integrado', preco: 500 },
    { id: 'whatsapp', nome: 'WhatsApp Integrado', preco: 200 },
    { id: 'google-analytics', nome: 'Google Analytics', preco: 200 },
    { id: 'ssl', nome: 'Certificado SSL Premium', preco: 150 },
  ];

  const calcularTotal = () => {
    let total = precos[calculos.plano];

    // Domínio
    if (calculos.dominio) {
      total += precos.dominio;
    }

    // SEO
    if (calculos.seo) {
      total += precos.seo;
    }

    // Conteúdo
    total += calculos.conteudo * precos.conteudo.pagina;

    // Manutenção mensal
    if (calculos.manutencao > 0) {
      total += calculos.manutencao * precos.manutencao;
    }

    // Serviços adicionais
    calculos.servicosAdicionais.forEach(servicoId => {
      const servico = servicosExtras.find(s => s.id === servicoId);
      if (servico) {
        total += servico.preco;
      }
    });

    return total;
  };

  const formatarPreco = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const handlePlanoChange = (plano) => {
    setCalculos(prev => ({
      ...prev,
      plano,
      paginas: plano === 'basico' ? 4 : plano === 'profissional' ? 8 : 10
    }));
  };

  const handleServicoToggle = (servicoId) => {
    setCalculos(prev => ({
      ...prev,
      servicosAdicionais: prev.servicosAdicionais.includes(servicoId)
        ? prev.servicosAdicionais.filter(id => id !== servicoId)
        : [...prev.servicosAdicionais, servicoId]
    }));
  };

  const total = calcularTotal();

  return (
    <section className="calculadora-section">
      <div className="calculadora-container">
        <div className="calculadora-header">
          <Calculator className="calculadora-icon" />
          <h2 className="calculadora-title">
            Calcule o Preço do <span className="text-gradient">Seu Site</span>
          </h2>
          <p className="calculadora-subtitle">
            Personalize seu orçamento escolhendo os serviços que você precisa
          </p>
        </div>

        <div className="calculadora-content">
          <div className="calculadora-options">
            {/* Seleção de Plano */}
            <div className="calculadora-group">
              <label className="calculadora-group-label">Escolha o Plano Base</label>
              <div className="planos-grid">
                <button
                  className={`plano-option ${calculos.plano === 'basico' ? 'active' : ''}`}
                  onClick={() => handlePlanoChange('basico')}
                >
                  <h3>Básico</h3>
                  <p className="plano-price">{formatarPreco(precos.basico)}</p>
                  <p className="plano-desc">Até 4 páginas</p>
                </button>
                <button
                  className={`plano-option ${calculos.plano === 'profissional' ? 'active' : ''}`}
                  onClick={() => handlePlanoChange('profissional')}
                >
                  <h3>Profissional</h3>
                  <p className="plano-price">{formatarPreco(precos.profissional)}</p>
                  <p className="plano-desc">Até 8 páginas</p>
                </button>
                <button
                  className={`plano-option ${calculos.plano === 'premium' ? 'active' : ''}`}
                  onClick={() => handlePlanoChange('premium')}
                >
                  <h3>Premium</h3>
                  <p className="plano-price">{formatarPreco(precos.premium)}</p>
                  <p className="plano-desc">Páginas ilimitadas</p>
                </button>
              </div>
            </div>

            {/* Extras */}
            <div className="calculadora-group">
              <label className="calculadora-group-label">Serviços Adicionais</label>
              
              <div className="extras-list">
                <label className="extra-item">
                  <input
                    type="checkbox"
                    checked={calculos.dominio}
                    onChange={(e) => setCalculos(prev => ({ ...prev, dominio: e.target.checked }))}
                  />
                  <div className="extra-content">
                    <span className="extra-name">Domínio .com.br (1 ano)</span>
                    <span className="extra-price">+ {formatarPreco(precos.dominio)}</span>
                  </div>
                </label>

                <label className="extra-item">
                  <input
                    type="checkbox"
                    checked={calculos.seo}
                    onChange={(e) => setCalculos(prev => ({ ...prev, seo: e.target.checked }))}
                  />
                  <div className="extra-content">
                    <span className="extra-name">SEO Inicial</span>
                    <span className="extra-price">+ {formatarPreco(precos.seo)}</span>
                  </div>
                </label>

                <div className="extra-item">
                  <label className="extra-name">Criação de Conteúdo (por página)</label>
                  <input
                    type="number"
                    min="0"
                    value={calculos.conteudo}
                    onChange={(e) => setCalculos(prev => ({ ...prev, conteudo: parseInt(e.target.value) || 0 }))}
                    className="input-number"
                  />
                  <span className="extra-price">× {formatarPreco(precos.conteudo.pagina)}</span>
                </div>

                <div className="extra-item">
                  <label className="extra-name">Manutenção Mensal (meses)</label>
                  <input
                    type="number"
                    min="0"
                    value={calculos.manutencao}
                    onChange={(e) => setCalculos(prev => ({ ...prev, manutencao: parseInt(e.target.value) || 0 }))}
                    className="input-number"
                  />
                  <span className="extra-price">× {formatarPreco(precos.manutencao)}/mês</span>
                </div>
              </div>
            </div>

            {/* Serviços Extras */}
            <div className="calculadora-group">
              <label className="calculadora-group-label">Funcionalidades Extras</label>
              <div className="servicos-grid">
                {servicosExtras.map(servico => (
                  <label key={servico.id} className="servico-card">
                    <input
                      type="checkbox"
                      checked={calculos.servicosAdicionais.includes(servico.id)}
                      onChange={() => handleServicoToggle(servico.id)}
                    />
                    <div className="servico-content">
                      <span className="servico-name">{servico.nome}</span>
                      <span className="servico-price">+ {formatarPreco(servico.preco)}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Resumo */}
          <div className="calculadora-summary">
            <div className="summary-header">
              <DollarSign className="summary-icon" />
              <h3>Total do Investimento</h3>
            </div>
            <div className="summary-content">
              <div className="summary-total">
                <span className="total-label">Total</span>
                <span className="total-value">{formatarPreco(total)}</span>
              </div>
              <p className="summary-note">
                <CheckCircle className="icon" />
                Preço final sem taxas adicionais
              </p>
              <a href="/orcamento" className="summary-button">
                Solicitar Orçamento Personalizado
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculadoraPrecos;

