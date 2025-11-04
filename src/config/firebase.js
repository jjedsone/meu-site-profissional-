// Firebase Configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Configuração do Firebase
// Você precisa preencher com as credenciais do seu projeto Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDummyKeyReplaceWithYourOwn",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "meu-site-profissional-e0daf.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "meu-site-profissional-e0daf",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "meu-site-profissional-e0daf.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789:web:abcdef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;

