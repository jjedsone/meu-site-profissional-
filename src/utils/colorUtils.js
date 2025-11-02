// Utilitários para gerenciamento de cores personalizadas

// Função para converter hex para RGB
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

// Função para calcular cor mais escura
export const escurecerCor = (hex, percent) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const r = Math.max(0, Math.floor(rgb.r * (1 - percent / 100)));
  const g = Math.max(0, Math.floor(rgb.g * (1 - percent / 100)));
  const b = Math.max(0, Math.floor(rgb.b * (1 - percent / 100)));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

// Função para calcular cor mais clara
export const clarearCor = (hex, percent) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const r = Math.min(255, Math.floor(rgb.r + (255 - rgb.r) * (percent / 100)));
  const g = Math.min(255, Math.floor(rgb.g + (255 - rgb.g) * (percent / 100)));
  const b = Math.min(255, Math.floor(rgb.b + (255 - rgb.b) * (percent / 100)));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

// Função para aplicar cores ao site
export const aplicarCores = (coresConfig) => {
  const root = document.documentElement;
  
  // Aplicar cor primária e variações
  root.style.setProperty('--primary', coresConfig.primary);
  root.style.setProperty('--primary-50', clarearCor(coresConfig.primary, 90));
  root.style.setProperty('--primary-100', clarearCor(coresConfig.primary, 80));
  root.style.setProperty('--primary-200', clarearCor(coresConfig.primary, 60));
  root.style.setProperty('--primary-300', clarearCor(coresConfig.primary, 40));
  root.style.setProperty('--primary-400', clarearCor(coresConfig.primary, 20));
  root.style.setProperty('--primary-500', coresConfig.primary);
  root.style.setProperty('--primary-600', coresConfig.primary);
  root.style.setProperty('--primary-700', escurecerCor(coresConfig.primary, 15));
  root.style.setProperty('--primary-800', escurecerCor(coresConfig.primary, 25));
  root.style.setProperty('--primary-900', escurecerCor(coresConfig.primary, 35));
  root.style.setProperty('--primary-dark', escurecerCor(coresConfig.primary, 20));
  
  // Aplicar cor accent e variações
  root.style.setProperty('--accent', coresConfig.accent);
  root.style.setProperty('--accent-50', clarearCor(coresConfig.accent, 90));
  root.style.setProperty('--accent-100', clarearCor(coresConfig.accent, 80));
  root.style.setProperty('--accent-200', clarearCor(coresConfig.accent, 60));
  root.style.setProperty('--accent-300', clarearCor(coresConfig.accent, 40));
  root.style.setProperty('--accent-400', clarearCor(coresConfig.accent, 20));
  root.style.setProperty('--accent-500', coresConfig.accent);
  root.style.setProperty('--accent-600', coresConfig.accent);
  root.style.setProperty('--accent-700', escurecerCor(coresConfig.accent, 15));
  
  // Criar gradientes
  const gradiente = `linear-gradient(135deg, ${coresConfig.gradientStart} 0%, ${coresConfig.gradientEnd} 100%)`;
  const gradienteVertical = `linear-gradient(180deg, ${coresConfig.gradientStart} 0%, ${coresConfig.gradientEnd} 100%)`;
  const gradienteHorizontal = `linear-gradient(90deg, ${coresConfig.gradientStart} 0%, ${coresConfig.accent} 50%, ${coresConfig.gradientEnd} 100%)`;
  
  root.style.setProperty('--gradient-primary', gradiente);
  root.style.setProperty('--gradient-tech', gradiente);
  root.style.setProperty('--site-gradient', gradiente);
  root.style.setProperty('--site-gradient-vertical', gradienteVertical);
  root.style.setProperty('--site-gradient-horizontal', gradienteHorizontal);
  
  // Aplicar cores customizadas para uso em todo o site
  root.style.setProperty('--site-primary', coresConfig.primary);
  root.style.setProperty('--site-accent', coresConfig.accent);
  root.style.setProperty('--site-gradient-start', coresConfig.gradientStart);
  root.style.setProperty('--site-gradient-end', coresConfig.gradientEnd);
  
  // Aplicar cores em elementos específicos com RGBA para sombras
  const rgbPrimary = hexToRgb(coresConfig.primary);
  if (rgbPrimary) {
    root.style.setProperty('--site-primary-rgb', `${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}`);
    root.style.setProperty('--site-primary-shadow', `rgba(${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}, 0.3)`);
    root.style.setProperty('--site-primary-shadow-light', `rgba(${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}, 0.1)`);
    root.style.setProperty('--site-primary-shadow-heavy', `rgba(${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}, 0.4)`);
  }
  
  const rgbAccent = hexToRgb(coresConfig.accent);
  if (rgbAccent) {
    root.style.setProperty('--site-accent-rgb', `${rgbAccent.r}, ${rgbAccent.g}, ${rgbAccent.b}`);
    root.style.setProperty('--site-accent-shadow', `rgba(${rgbAccent.r}, ${rgbAccent.g}, ${rgbAccent.b}, 0.3)`);
  }
  
  // Aplicar cores de tema (se definidas)
  if (coresConfig.bodyBackground) {
    // Se bodyBackground é uma cor sólida, usar ela diretamente; senão é um gradiente
    const bgIsGradient = coresConfig.bodyBackground.includes('gradient') || coresConfig.bodyBackground.includes('linear-gradient');
    
    root.style.setProperty('--site-body-bg', bgIsGradient ? coresConfig.bodyBackground : coresConfig.bodyBackground);
    root.style.setProperty('--site-body-text', coresConfig.bodyText || '#1f2937');
    root.style.setProperty('--site-navbar-bg', coresConfig.navbarBackground || '#ffffff');
    root.style.setProperty('--site-navbar-text', coresConfig.navbarText || '#475569');
    root.style.setProperty('--site-card-bg', coresConfig.cardBackground || '#ffffff');
    root.style.setProperty('--site-card-text', coresConfig.cardText || '#1e293b');
    
    // Aplicar diretamente no body
    if (!bgIsGradient) {
      document.body.style.backgroundColor = coresConfig.bodyBackground;
    } else {
      document.body.style.background = coresConfig.bodyBackground;
      document.body.style.backgroundImage = 'none';
    }
    document.body.style.color = coresConfig.bodyText || '#1f2937';
  }
};

