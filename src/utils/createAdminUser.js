// Script para criar usuário admin no Firebase
// Execute este script no console do navegador após configurar o Firebase

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

// Configuração do usuário admin
// ⚠️ IMPORTANTE: Crie o usuário no Firebase Console, não use este código em produção
const ADMIN_EMAIL = 'jjedsone@gmail.com'; // Email do admin
const ADMIN_PASSWORD = '565671Je@'; // Senha configurada

/**
 * Cria um usuário admin no Firebase Authentication
 * 
 * IMPORTANTE: Execute este código apenas uma vez no console do navegador
 * ou use o Firebase Console para criar o usuário manualmente
 */
export const createAdminUser = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      ADMIN_EMAIL,
      ADMIN_PASSWORD
    );
    
    console.log('✅ Usuário admin criado com sucesso!');
    console.log('Email:', userCredential.user.email);
    console.log('UID:', userCredential.user.uid);
    
    return {
      success: true,
      user: userCredential.user
    };
  } catch (error) {
    let errorMessage = 'Erro ao criar usuário.';
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'Este email já está em uso. Use outro email ou faça login normalmente.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Email inválido.';
        break;
      case 'auth/weak-password':
        errorMessage = 'Senha muito fraca. Use uma senha mais forte.';
        break;
      default:
        errorMessage = error.message || 'Erro ao criar usuário.';
    }
    
    console.error('❌ Erro:', errorMessage);
    return {
      success: false,
      error: errorMessage
    };
  }
};

// Instruções para usar:
// 1. Abra o console do navegador (F12)
// 2. Importe a função: import { createAdminUser } from './utils/createAdminUser';
// 3. Execute: await createAdminUser();
//
// OU crie o usuário diretamente no Firebase Console (recomendado)

