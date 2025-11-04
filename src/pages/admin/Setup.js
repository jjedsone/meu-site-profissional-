import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Lock, Mail, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import '../../style/Admin.css';

const Setup = () => {
  const [email, setEmail] = useState('jjedsone@gmail.com');
  const [password, setPassword] = useState('565671Je@');
  const [confirmPassword, setConfirmPassword] = useState('565671Je@');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validações
    if (!email || !email.includes('@')) {
      setError('Email inválido');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setLoading(true);

    try {
      // Criar usuário no Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      console.log('✅ Usuário admin criado com sucesso!');
      console.log('Email:', userCredential.user.email);
      console.log('UID:', userCredential.user.uid);

      setSuccess(true);
      
      // Redirecionar para login após 2 segundos
      setTimeout(() => {
        navigate('/admin/login');
      }, 2000);

    } catch (error) {
      let errorMessage = 'Erro ao criar usuário.';

      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este email já está em uso. Você pode fazer login normalmente.';
          // Se já existe, redirecionar para login
          setTimeout(() => {
            navigate('/admin/login');
          }, 2000);
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email inválido.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Senha muito fraca. Use uma senha mais forte.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Operação não permitida. Verifique as configurações do Firebase.';
          break;
        default:
          errorMessage = error.message || 'Erro ao criar usuário.';
      }

      setError(errorMessage);
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
              <UserPlus className="admin-login-icon" />
            </div>
            <h1 className="admin-login-title">Configuração Inicial</h1>
            <p className="admin-login-subtitle">
              Crie seu acesso único ao painel administrativo
            </p>
          </div>

          {success ? (
            <div className="admin-success-message">
              <CheckCircle className="w-6 h-6" />
              <div>
                <h3>Usuário criado com sucesso!</h3>
                <p>
                  Seu acesso foi criado com:
                  <br />
                  <strong>Email:</strong> {email}
                  <br />
                  Redirecionando para o login...
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
                  Email do Administrador
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="admin-form-input"
                  placeholder="seu-email@gmail.com"
                  required
                  autoComplete="email"
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
                  placeholder="Digite uma senha forte"
                  required
                  autoComplete="new-password"
                  minLength={6}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">
                  <Lock className="admin-input-icon" />
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="admin-form-input"
                  placeholder="Digite a senha novamente"
                  required
                  autoComplete="new-password"
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="admin-login-button"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Criando...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Criar Acesso Administrativo
                  </>
                )}
              </button>
            </form>
          )}

          <div className="admin-login-footer">
            <p className="admin-login-hint">
              ⚠️ Esta página só deve ser usada uma vez para criar o primeiro acesso.
              <br />
              Após criar, você pode fazer login normalmente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup;

