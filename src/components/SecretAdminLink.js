import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/SecretAdminLink.css';

const SecretAdminLink = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/admin/login');
  };

  return (
    <div 
      className="secret-admin-link"
      onClick={handleClick}
      title=""
      aria-label=""
    >
      <span className="secret-admin-dot"></span>
    </div>
  );
};

export default SecretAdminLink;

