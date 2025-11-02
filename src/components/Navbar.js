import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, DollarSign, Briefcase, HelpCircle, FileText, Menu, X, Code, Sparkles } from 'lucide-react';
import '../style/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar-main">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="navbar-logo-icon">
              <Code className="logo-icon" />
              <Sparkles className="logo-sparkle" />
            </div>
            <span className="navbar-logo-text">WebPro Sites</span>
          </Link>

          {/* Menu Desktop */}
          <div className="navbar-menu">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              <Home size={18} />
              <span>Início</span>
            </Link>
            
            <Link 
              to="/planos" 
              className={`nav-link ${isActive('/planos') ? 'active' : ''}`}
            >
              <DollarSign size={18} />
              <span>Planos</span>
            </Link>
            
            <Link 
              to="/portfolio" 
              className={`nav-link ${isActive('/portfolio') ? 'active' : ''}`}
            >
              <Briefcase size={18} />
              <span>Portfólio</span>
            </Link>
            
            <Link 
              to="/como-funciona" 
              className={`nav-link ${isActive('/como-funciona') ? 'active' : ''}`}
            >
              <FileText size={18} />
              <span>Como Funciona</span>
            </Link>
            
            <Link 
              to="/faq" 
              className={`nav-link ${isActive('/faq') ? 'active' : ''}`}
            >
              <HelpCircle size={18} />
              <span>FAQ</span>
            </Link>

            {/* Botão CTA */}
            <Link 
              to="/orcamento" 
              className="nav-cta-button"
            >
              <span>Solicitar Orçamento</span>
              <Sparkles size={16} />
            </Link>
          </div>

          {/* Botão Menu Mobile */}
          <button
            onClick={toggleMenu}
            className={`mobile-menu-button ${isMenuOpen ? 'active' : ''}`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className={`nav-link mobile-link ${isActive('/') ? 'active' : ''}`}
              >
                <Home size={18} />
                <span>Início</span>
              </Link>
              
              <Link 
                to="/planos" 
                onClick={() => setIsMenuOpen(false)}
                className={`nav-link mobile-link ${isActive('/planos') ? 'active' : ''}`}
              >
                <DollarSign size={18} />
                <span>Planos</span>
              </Link>
              
              <Link 
                to="/portfolio" 
                onClick={() => setIsMenuOpen(false)}
                className={`nav-link mobile-link ${isActive('/portfolio') ? 'active' : ''}`}
              >
                <Briefcase size={18} />
                <span>Portfólio</span>
              </Link>
              
              <Link 
                to="/como-funciona" 
                onClick={() => setIsMenuOpen(false)}
                className={`nav-link mobile-link ${isActive('/como-funciona') ? 'active' : ''}`}
              >
                <FileText size={18} />
                <span>Como Funciona</span>
              </Link>
              
              <Link 
                to="/faq" 
                onClick={() => setIsMenuOpen(false)}
                className={`nav-link mobile-link ${isActive('/faq') ? 'active' : ''}`}
              >
                <HelpCircle size={18} />
                <span>FAQ</span>
              </Link>

              <Link 
                to="/orcamento" 
                onClick={() => setIsMenuOpen(false)}
                className="nav-cta-button mobile-cta"
              >
                <span>Solicitar Orçamento</span>
                <Sparkles size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
