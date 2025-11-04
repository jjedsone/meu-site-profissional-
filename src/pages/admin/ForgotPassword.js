import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { sendPasswordReset } from '../../utils/auth';
import '../../style/Admin.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const result = await sendPasswordReset(email);
      
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/admin/login');
        }, 3000);
      } else {
        setError(result.error || 'Erro ao enviar email de recuperação.');
      }
    } catch (err) {
      setError('Erro ao enviar email de recuperação. Tente novamente.');
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
              <Mail className="admin-login-icon" />
            </div>
            <h1 className="admin-login-title">Recuperar Senha</h1>
            <p className="admin-login-subtitle">
              Digite seu email e enviaremos um link para redefinir sua senha
            </p>
          </div>

          {success ? (
            <div className="admin-success-message">
              <CheckCircle className="w-6 h-6" />
              <div>
                <h3>Email enviado com sucesso!</h3>
                <p>
                  Verifique sua caixa de entrada e clique no link para redefinir sua senha.
                  <br />
                  Você será redirecionado para a página de login em alguns segundos...
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="admin-login-form">
              {error && (
                <div className="admin-error-message">
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="admin-form-group">
                <label className="admin-form-label">
                  <Mail className="admin-input-icon" />
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="admin-form-input"
                  placeholder="Digite seu email"
                  required
                  autoComplete="email"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="admin-login-button"
              >
                {loading ? (
                  'Enviando...'
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar Email de Recuperação
                  </>
                )}
              </button>
            </form>
          )}

          <div className="admin-login-footer">
            <Link 
              to="/admin/login" 
              className="admin-forgot-password-link"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para o login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

