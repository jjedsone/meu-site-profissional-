import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Code, Smartphone, Zap, Rocket, Volume2, VolumeX } from 'lucide-react';
import Depoimentos from '../components/Depoimentos';
import '../style/Home.css';

const Home = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoError = () => {
    console.warn('Erro ao carregar vídeo, usando fallback');
    setVideoError(true);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section pattern-tech-dots">
        {/* Video Background */}
        {!videoError && (
          <video 
            ref={videoRef}
            className="hero-video-background"
            autoPlay 
            loop 
            muted 
            playsInline
            preload="metadata"
            onError={handleVideoError}
            onLoadedData={() => setVideoError(false)}
          >
            <source src={`${process.env.PUBLIC_URL || ''}/tecnologia.mp4`} type="video/mp4" />
            <source src="/tecnologia.mp4" type="video/mp4" />
          </video>
        )}
        <div className="hero-video-overlay"></div>
        
        {/* Sound Control Button */}
        <button 
          className="hero-sound-button"
          onClick={toggleSound}
          aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
        >
          {isMuted ? (
            <VolumeX className="sound-icon" />
          ) : (
            <Volume2 className="sound-icon" />
          )}
        </button>
        
        <div className="hero-blob-1 animate-float"></div>
        <div className="hero-blob-2 animate-float delay-300"></div>
        
        <div className="hero-content animate-fade-in-up">
          <div style={{marginBottom: '1.5rem'}}>
            <span className="badge-tech-primary">
              <Code className="icon" />
              Sites Profissionais
            </span>
          </div>
          
          <h1 className="hero-title">
            Crio sites profissionais<br />
            para profissionais de<br />
            <span className="text-tech-gradient">
              Todas as Áreas
            </span>
          </h1>
          
          <p className="hero-subtitle">
            Planos claros, agendamento integrado e suporte que funciona.<br />
            <strong style={{color: '#2563eb'}}>Transforme sua presença digital hoje mesmo.</strong>
          </p>
          
          <div className="hero-buttons">
            <Link to="/orcamento" className="btn-primary">
              <Zap className="icon" />
              Solicitar Orçamento
            </Link>
            
            <Link to="/portfolio" className="btn-outline">
              <Rocket className="icon" />
              Ver Portfólio
            </Link>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="benefits-section">
        <div className="benefits-title animate-fade-in-up">
          <h2>
            Por que escolher nossos <span className="text-tech-gradient">serviços</span>?
          </h2>
          <p>Tecnologia de ponta para seu negócio decolar</p>
        </div>
        
        <div className="benefits-grid">
          <div className="benefit-card animate-fade-in-up">
            <div className="benefit-icon benefit-icon-blue">
              <Code className="icon icon-white" />
            </div>
            <h3>Desenvolvimento Profissional</h3>
            <p>Sites modernos com tecnologia de ponta e design atual</p>
          </div>
          
          <div className="benefit-card animate-fade-in-up delay-100">
            <div className="benefit-icon benefit-icon-cyan">
              <Smartphone className="icon icon-white" />
            </div>
            <h3>100% Responsivo</h3>
            <p>Funciona perfeitamente em todos os dispositivos móveis</p>
          </div>
          
          <div className="benefit-card animate-fade-in-up delay-200">
            <div className="benefit-icon benefit-icon-purple">
              <Zap className="icon icon-white" />
            </div>
            <h3>Rápido e Otimizado</h3>
            <p>Carregamento veloz e otimizado para SEO</p>
          </div>
          
          <div className="benefit-card animate-fade-in-up delay-300">
            <div className="benefit-icon benefit-icon-green">
              <CheckCircle className="icon icon-white" />
            </div>
            <h3>Suporte Incluso</h3>
            <p>Acompanhamento e manutenção garantidos</p>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <Depoimentos />

    </div>
  );
};

export default Home;
