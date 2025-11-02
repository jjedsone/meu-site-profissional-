// Sistema de autenticação simples (pode ser migrado para backend real)
// Por padrão: admin / admin123 (altere depois!)

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

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

export const logout = () => {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_username');
  localStorage.removeItem('admin_login_time');
};

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

export const getCurrentUser = () => {
  return localStorage.getItem('admin_username') || null;
};

