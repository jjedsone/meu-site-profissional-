import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, LogIn, AlertCircle } from 'lucide-react';
import { login } from '../../utils/auth';
import '../../style/Admin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = login(username, password);
      
      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        setError(result.error || 'Credenciais inválidas');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-login-icon-wrapper">
              <Lock className="admin-login-icon" />
            </div>
            <h1 className="admin-login-title">Painel Administrativo</h1>
            <p className="admin-login-subtitle">
              Faça login para gerenciar seu portfólio
            </p>
          </div>

          <form onSubmit={handleSubmit} className="admin-login-form">
            {error && (
              <div className="admin-error-message">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            <div className="admin-form-group">
              <label className="admin-form-label">
                <User className="admin-input-icon" />
                Usuário
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="admin-form-input"
                placeholder="Digite seu usuário"
                required
                autoComplete="username"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">
                <Lock className="admin-input-icon" />
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-form-input"
                placeholder="Digite sua senha"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="admin-login-button"
            >
              {loading ? (
                'Entrando...'
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Entrar
                </>
              )}
            </button>
          </form>

          <div className="admin-login-footer">
            <p className="admin-login-hint">
              💡 Padrão: admin / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

