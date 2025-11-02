import React from 'react';
import { Star, Quote } from 'lucide-react';
import { getDepoimentos } from '../data/depoimentosData';
import '../style/Depoimentos.css';

const Depoimentos = () => {
  const depoimentos = getDepoimentos();

  return (
    <section className="depoimentos-section">
      <div className="depoimentos-container">
        <div className="depoimentos-header">
          <h2 className="depoimentos-title">
            O que nossos <span className="text-gradient">clientes dizem</span>
          </h2>
          <p className="depoimentos-subtitle">
            Mais de 100 projetos entregues com satisfação garantida
          </p>
        </div>

        <div className="depoimentos-grid">
          {depoimentos.map((depoimento) => (
            <div key={depoimento.id} className="depoimento-card">
              <div className="depoimento-content">
                <Quote className="depoimento-quote-icon" />
                <p className="depoimento-text">{depoimento.texto}</p>
              </div>
              
              <div className="depoimento-footer">
                <div className="depoimento-author">
                  <div className="depoimento-avatar">
                    {depoimento.nome.charAt(0).toUpperCase()}
                  </div>
                  <div className="depoimento-info">
                    <h4 className="depoimento-name">{depoimento.nome}</h4>
                    <p className="depoimento-profession">{depoimento.profissao}</p>
                  </div>
                </div>
                
                <div className="depoimento-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`star ${i < depoimento.avaliacao ? 'filled' : ''}`}
                      size={16}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="depoimentos-cta">
          <p className="depoimentos-cta-text">
            Quer fazer parte dessa lista de clientes satisfeitos?
          </p>
          <a href="/orcamento" className="depoimentos-cta-button">
            Solicitar Orçamento
          </a>
        </div>
      </div>
    </section>
  );
};

export default Depoimentos;

