// Sistema de autenticação simples com senha padrão
// Senha padrão: 565671Je@

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '565671Je@';

// Login com usuário e senha
export const login = (username, password) => {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = btoa(`${username}:${Date.now()}`);
    localStorage.setItem('admin_token', token);
    localStorage.setItem('admin_username', username);
    localStorage.setItem('admin_login_time', Date.now().toString());
    return { success: true, token };
  }
  return { success: false, error: 'Credenciais inválidas' };
};

// Logout
export const logout = () => {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_username');
  localStorage.removeItem('admin_login_time');
};

// Verificar se está autenticado
export const isAuthenticated = () => {
  const token = localStorage.getItem('admin_token');
  const loginTime = localStorage.getItem('admin_login_time');
  
  if (!token || !loginTime) return false;
  
  // Token expira após 24 horas
  const hoursSinceLogin = (Date.now() - parseInt(loginTime)) / (1000 * 60 * 60);
  if (hoursSinceLogin > 24) {
    logout();
    return false;
  }
  
  return true;
};

// Obter usuário atual
export const getCurrentUser = () => {
  return localStorage.getItem('admin_username') || null;
};

// Obter UID do usuário (não usado neste sistema simples)
export const getCurrentUserUID = () => {
  return null;
};

// Enviar email de recuperação de senha (não usado neste sistema simples)
export const sendPasswordReset = async (email) => {
  return { success: false, error: 'Recuperação de senha não disponível. Use a senha padrão.' };
};

// Observer para mudanças de autenticação (não usado neste sistema simples)
export const onAuthChange = (callback) => {
  return () => {};
};

