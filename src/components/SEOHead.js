import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEOHead = () => {
  const location = useLocation();

  useEffect(() => {
    const seoData = getSEOData(location.pathname);
    
    // Atualizar título
    document.title = seoData.title;
    
    // Atualizar ou criar meta tags
    updateMetaTag('description', seoData.description);
    updateMetaTag('keywords', seoData.keywords);
    updateMetaTag('og:title', seoData.title);
    updateMetaTag('og:description', seoData.description);
    updateMetaTag('og:type', 'website');
    updateMetaTag('og:url', window.location.href);
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', seoData.title);
    updateMetaTag('twitter:description', seoData.description);
    
    // Atualizar lang
    document.documentElement.lang = 'pt-BR';
    
  }, [location.pathname]);

  const updateMetaTag = (name, content) => {
    if (!content) return;
    
    // Para Open Graph e Twitter usar 'property', senão 'name'
    const attr = name.startsWith('og:') || name.startsWith('twitter:') ? 'property' : 'name';
    
    let element = document.querySelector(`meta[${attr}="${name}"]`);
    
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attr, name);
      document.head.appendChild(element);
    }
    
    element.setAttribute('content', content);
  };

  const getSEOData = (pathname) => {
    const baseUrl = window.location.origin;
    const defaultImage = `${baseUrl}/logo512.png`;
    
    const seoMap = {
      '/': {
        title: 'WebPro Sites - Sites Profissionais para Todas as Áreas',
        description: 'Criamos sites profissionais para médicos, advogados, contadores e todas as áreas. Planos claros, agendamento integrado e suporte que funciona.',
        keywords: 'criação de sites, sites profissionais, sites para médicos, sites para advogados, sites responsivos, agendamento online',
      },
      '/planos': {
        title: 'Planos e Preços - WebPro Sites',
        description: 'Escolha o plano ideal para seu negócio. Planos Básico, Profissional e Premium com preços transparentes e sem pegadinhas.',
        keywords: 'planos sites, preços sites, criação sites preço, planos websites',
      },
      '/portfolio': {
        title: 'Portfólio - Sites Criados - WebPro Sites',
        description: 'Veja exemplos reais de sites criados para diferentes nichos. Cada projeto é único e desenvolvido especificamente para o cliente.',
        keywords: 'portfólio sites, exemplos sites, sites criados, portfolio websites',
      },
      '/como-funciona': {
        title: 'Como Funciona - Processo de Criação - WebPro Sites',
        description: 'Entenda nosso processo passo a passo. Do primeiro contato até a entrega do site, tudo explicado de forma clara e transparente.',
        keywords: 'como criar site, processo criação site, como funciona criação site',
      },
      '/orcamento': {
        title: 'Solicitar Orçamento - WebPro Sites',
        description: 'Solicite seu orçamento personalizado. Preencha o formulário e receba uma proposta detalhada em até 24 horas.',
        keywords: 'solicitar orçamento, orçamento site, pedir orçamento, cotação site',
      },
      '/faq': {
        title: 'Perguntas Frequentes (FAQ) - WebPro Sites',
        description: 'Respostas para as principais dúvidas sobre criação de sites, planos, prazos, valores e muito mais.',
        keywords: 'perguntas frequentes, dúvidas sites, faq sites, perguntas criação site',
      },
      '/contato': {
        title: 'Contato - WebPro Sites',
        description: 'Entre em contato conosco. Estamos prontos para tirar suas dúvidas e ajudar você a criar o site dos seus sonhos.',
        keywords: 'contato criação sites, fale conosco, contato webpro sites',
      },
    };

    const seo = seoMap[pathname] || {
      title: 'WebPro Sites - Sites Profissionais para Todas as Áreas',
      description: 'Criamos sites profissionais para médicos, advogados, contadores e todas as áreas.',
      keywords: 'criação de sites, sites profissionais, sites responsivos',
    };

    return {
      ...seo,
      image: defaultImage,
    };
  };

  return null;
};

export default SEOHead;

