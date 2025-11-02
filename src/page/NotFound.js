import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import '../style/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-content">
          {/* Ilustração 404 */}
          <div className="not-found-illustration">
            <div className="not-found-number">404</div>
            <div className="not-found-animation">
              <div className="not-found-blob-1"></div>
              <div className="not-found-blob-2"></div>
              <div className="not-found-blob-3"></div>
            </div>
          </div>

          {/* Texto */}
          <h1 className="not-found-title">Oops! Página não encontrada</h1>
          <p className="not-found-description">
            A página que você está procurando não existe ou foi movida para outro endereço.
          </p>

          {/* Ações */}
          <div className="not-found-actions">
            <Link to="/" className="not-found-button primary">
              <Home size={20} />
              <span>Voltar para Início</span>
            </Link>
            
            <button 
              onClick={() => window.history.back()} 
              className="not-found-button secondary"
            >
              <ArrowLeft size={20} />
              <span>Voltar</span>
            </button>
          </div>

          {/* Links úteis */}
          <div className="not-found-links">
            <p className="not-found-links-title">Talvez você esteja procurando por:</p>
            <div className="not-found-links-grid">
              <Link to="/planos" className="not-found-link">
                <span>Planos</span>
              </Link>
              <Link to="/portfolio" className="not-found-link">
                <span>Portfólio</span>
              </Link>
              <Link to="/como-funciona" className="not-found-link">
                <span>Como Funciona</span>
              </Link>
              <Link to="/orcamento" className="not-found-link">
                <span>Solicitar Orçamento</span>
              </Link>
              <Link to="/faq" className="not-found-link">
                <span>FAQ</span>
              </Link>
              <Link to="/contato" className="not-found-link">
                <span>Contato</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

