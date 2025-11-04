// Sistema de autenticação com Firebase
import { 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../config/firebase';

// Login com email e senha
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Obter token do Firebase
    const token = await user.getIdToken();
    
    // Salvar informações do usuário
    localStorage.setItem('admin_token', token);
    localStorage.setItem('admin_email', user.email);
    localStorage.setItem('admin_uid', user.uid);
    localStorage.setItem('admin_login_time', Date.now().toString());
    
    return { success: true, user };
  } catch (error) {
    let errorMessage = 'Erro ao fazer login.';
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'Usuário não encontrado.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Senha incorreta.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Email inválido.';
        break;
      case 'auth/user-disabled':
        errorMessage = 'Usuário desabilitado.';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Muitas tentativas. Tente novamente mais tarde.';
        break;
      default:
        errorMessage = error.message || 'Erro ao fazer login.';
    }
    
    return { success: false, error: errorMessage };
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_email');
    localStorage.removeItem('admin_uid');
    localStorage.removeItem('admin_login_time');
    return { success: true };
  } catch (error) {
    // Limpar localStorage mesmo em caso de erro
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_email');
    localStorage.removeItem('admin_uid');
    localStorage.removeItem('admin_login_time');
    return { success: false, error: error.message };
  }
};

// Verificar se está autenticado
export const isAuthenticated = () => {
  const token = localStorage.getItem('admin_token');
  const email = localStorage.getItem('admin_email');
  const loginTime = localStorage.getItem('admin_login_time');
  
  if (!token || !email || !loginTime) return false;
  
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
  return localStorage.getItem('admin_email') || null;
};

// Obter UID do usuário
export const getCurrentUserUID = () => {
  return localStorage.getItem('admin_uid') || null;
};

// Enviar email de recuperação de senha
export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: 'Email de recuperação enviado com sucesso!' };
  } catch (error) {
    let errorMessage = 'Erro ao enviar email de recuperação.';
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'Email não encontrado.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Email inválido.';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Muitas tentativas. Tente novamente mais tarde.';
        break;
      default:
        errorMessage = error.message || 'Erro ao enviar email de recuperação.';
    }
    
    return { success: false, error: errorMessage };
  }
};

// Observer para mudanças de autenticação
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

