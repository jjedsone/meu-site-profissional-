import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, CheckCircle, Smartphone, Globe, Eye } from 'lucide-react';
import PhoneMockup from '../components/PhoneMockup';
import { getProjectsByCategory, categoriasDisponiveis } from '../data/portfolioData';
import '../style/Portfolio.css';

const Portfolio = () => {
  const [filtro, setFiltro] = useState('todos');
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);

  const projetosFiltrados = getProjectsByCategory(filtro);

  return (
    <div className="portfolio-page">
      <div className="portfolio-container">
        {/* Header */}
        <div className="portfolio-header">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Smartphone className="w-10 h-10 text-blue-600" />
            <h1 className="text-5xl font-bold">Portfólio de Sites</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veja exemplos reais de sites criados para diferentes nichos. Cada projeto é único e 
            desenvolvido especificamente para atender às necessidades do cliente.
          </p>
        </div>

        {/* Filtros */}
        <div className="portfolio-filters">
          <button
            key="todos"
            onClick={() => setFiltro('todos')}
            className={`filter-button ${filtro === 'todos' ? 'active' : ''}`}
          >
            Todos
          </button>
          {categoriasDisponiveis.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFiltro(cat.value)}
              className={`filter-button ${filtro === cat.value ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid de Projetos com Mockups de Celular */}
        <div className="portfolio-grid-with-mockups">
          {projetosFiltrados.map((projeto) => (
            <div key={projeto.id} className="portfolio-card-with-mockup">
              {/* Mockup do Celular */}
              <div className="portfolio-mockup-wrapper">
                <PhoneMockup
                  siteUrl={projeto.siteUrl}
                  screenshot={projeto.screenshot}
                  title={projeto.titulo}
                  category={projeto.categoriaLabel}
                  showControls={false}
                  className="animated"
                />
              </div>

              {/* Conteúdo do Projeto */}
              <div className="portfolio-card-content">
                <div className="portfolio-card-header">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <span className="card-category">{projeto.categoriaLabel}</span>
                      <h3 className="portfolio-card-title">{projeto.titulo}</h3>
                    </div>
                    <span className="portfolio-badge">{projeto.plano}</span>
                  </div>
                  <p className="card-description">{projeto.descricao}</p>
                </div>
                
                {/* Funcionalidades */}
                <div className="portfolio-features">
                  <h4 className="portfolio-features-title">Funcionalidades Incluídas:</h4>
                  <ul className="portfolio-features-list">
                    {projeto.funcionalidades.map((func, index) => (
                      <li key={index} className="portfolio-feature-item">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>{func}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tecnologias */}
                {projeto.tecnologias && (
                  <div className="portfolio-tech-stack">
                    <span className="portfolio-tech-label">Tecnologias:</span>
                    <div className="portfolio-tech-tags">
                      {projeto.tecnologias.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Botões de Ação */}
                <div className="portfolio-card-actions">
                  {projeto.siteUrl && (
                    <a
                      href={projeto.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-action-btn primary"
                    >
                      <Globe className="w-4 h-4" />
                      Visitar Site
                    </a>
                  )}
                  <button
                    onClick={() => setProjetoSelecionado(projeto)}
                    className="portfolio-action-btn secondary"
                  >
                    <Eye className="w-4 h-4" />
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Seção de Personalização */}
        <div className="portfolio-personalization">
          <div className="portfolio-personalization-content">
            <h2 className="portfolio-personalization-title">
              Todos os sites são 100% personalizados
            </h2>
            <p className="portfolio-personalization-subtitle">
              Os exemplos acima são apenas referências. Seu site será único e desenvolvido 
              especificamente para atender às necessidades do seu negócio.
            </p>
            <div className="portfolio-personalization-grid">
              <div className="personalization-item">
                <div className="personalization-icon">🎨</div>
                <h3 className="personalization-item-title">Design Exclusivo</h3>
                <p className="personalization-item-text">Layout personalizado com suas cores e identidade visual</p>
              </div>
              <div className="personalization-item">
                <div className="personalization-icon">⚙️</div>
                <h3 className="personalization-item-title">Funcionalidades sob Medida</h3>
                <p className="personalization-item-text">Desenvolvemos exatamente o que você precisa</p>
              </div>
              <div className="personalization-item">
                <div className="personalization-icon">📱</div>
                <h3 className="personalization-item-title">Totalmente Responsivo</h3>
                <p className="personalization-item-text">Funciona perfeitamente em qualquer dispositivo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Exemplos por Funcionalidade */}
        <div className="portfolio-features-section">
          <h2 className="portfolio-features-section-title">Funcionalidades Disponíveis</h2>
          <div className="portfolio-features-grid">
            {[
              { icon: '📅', title: 'Agendamento Online', desc: 'Sistema completo com calendário e confirmações automáticas' },
              { icon: '💳', title: 'Pagamento Online', desc: 'Integração com cartões e PIX' },
              { icon: '📸', title: 'Galeria de Fotos', desc: 'Mostre seu trabalho com galerias elegantes' },
              { icon: '💬', title: 'Chat e WhatsApp', desc: 'Atendimento direto integrado ao site' },
              { icon: '📊', title: 'Painel Admin', desc: 'Gerencie tudo em um só lugar' },
              { icon: '📧', title: 'E-mail Marketing', desc: 'Lembretes e campanhas automáticas' },
              { icon: '🔐', title: 'Área do Cliente', desc: 'Login seguro com histórico e agendamentos' },
              { icon: '📱', title: 'Google Agenda', desc: 'Sincronização com seu calendário' }
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal de Detalhes */}
        {projetoSelecionado && (
          <div className="portfolio-modal-overlay" onClick={() => setProjetoSelecionado(null)}>
            <div className="portfolio-modal" onClick={(e) => e.stopPropagation()}>
              <button 
                className="portfolio-modal-close"
                onClick={() => setProjetoSelecionado(null)}
              >
                ×
              </button>
              <div className="portfolio-modal-content">
                <div className="portfolio-modal-mockup">
                  <PhoneMockup
                    siteUrl={projetoSelecionado.siteUrl}
                    screenshot={projetoSelecionado.screenshot}
                    title={projetoSelecionado.titulo}
                    showControls={false}
                  />
                </div>
                <div className="portfolio-modal-info">
                  <h2 className="portfolio-modal-title">{projetoSelecionado.titulo}</h2>
                  <p className="portfolio-modal-description">{projetoSelecionado.descricao}</p>
                  <div className="portfolio-modal-features">
                    <h3>Funcionalidades:</h3>
                    <ul>
                      {projetoSelecionado.funcionalidades.map((func, index) => (
                        <li key={index}>
                          <CheckCircle className="w-4 h-4" />
                          {func}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {projetoSelecionado.siteUrl && (
                    <a
                      href={projetoSelecionado.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-modal-link"
                    >
                      <Globe className="w-5 h-5" />
                      Visitar Site Completo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="portfolio-cta">
          <h2 className="portfolio-cta-title">Pronto para ter um site como esses?</h2>
          <p className="portfolio-cta-subtitle">
            Conte-nos sobre seu negócio e criaremos uma proposta personalizada
          </p>
          <Link to="/orcamento" className="cta-button">
            Solicitar Meu Orçamento
            <ExternalLink className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;

