import React from 'react';
import '../style/PhoneMockup.css';

const PhoneMockup = ({ 
  siteUrl, 
  screenshot, 
  title, 
  category,
  showControls = true,
  className = '' 
}) => {
  return (
    <div className={`phone-mockup-container ${className}`}>
      <div className="phone-mockup">
        {/* Top bar do celular */}
        <div className="phone-notch">
          <div className="phone-speaker"></div>
          <div className="phone-camera"></div>
        </div>
        
        {/* Conteúdo do celular */}
        <div className="phone-screen">
          {siteUrl ? (
            <iframe
              src={siteUrl}
              title={title}
              className="phone-iframe"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              scrolling="yes"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
            />
          ) : screenshot ? (
            <img 
              src={screenshot} 
              alt={title}
              className="phone-screenshot"
            />
          ) : (
            <div className="phone-placeholder">
              <div className="placeholder-icon">📱</div>
              <p className="placeholder-text">Preview do Site</p>
            </div>
          )}
        </div>
        
        {/* Botão home (iOS) */}
        <div className="phone-home-button"></div>
      </div>
      
      {/* Info abaixo do mockup */}
      {showControls && (
        <div className="phone-mockup-info">
          <h3 className="phone-mockup-title">{title}</h3>
          {category && (
            <span className="phone-mockup-category">{category}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default PhoneMockup;
