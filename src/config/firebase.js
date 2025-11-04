// Firebase Configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Configuração do Firebase
// Você precisa preencher com as credenciais do seu projeto Firebase
// Veja o arquivo COMO_OBTER_CREDENCIAIS_FIREBASE.md para instruções

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "meu-site-profissional-e0daf.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "meu-site-profissional-e0daf",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "meu-site-profissional-e0daf.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Validar se a API Key está configurada
if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'AIzaSyDummyKeyReplaceWithYourOwn') {
  console.error('❌ Firebase API Key não configurada!');
  console.error('📖 Veja o arquivo COMO_OBTER_CREDENCIAIS_FIREBASE.md para instruções');
  console.error('💡 Crie um arquivo .env na raiz do projeto com as credenciais do Firebase');
}

// Initialize Firebase
let app;
let auth;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (error) {
  console.error('❌ Erro ao inicializar Firebase:', error);
  console.error('💡 Verifique se as credenciais estão corretas no arquivo .env');
}

export { auth };
export default app;

