// Sistema de notificação por email usando EmailJS
import emailjs from '@emailjs/browser';

// Configuração do EmailJS
// Você precisa criar uma conta em https://www.emailjs.com/
// e configurar as credenciais aqui
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '';
const ADMIN_EMAIL = 'jjedsone@gmail.com';

// Inicializar EmailJS
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

// Enviar notificação de tentativa de login
export const sendLoginAttemptNotification = async (email, ip, userAgent) => {
  // Se EmailJS não estiver configurado, usar método alternativo
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    console.warn('EmailJS não configurado. Usando método alternativo...');
    return sendNotificationViaWebhook(email, ip, userAgent);
  }

  try {
    const templateParams = {
      to_email: ADMIN_EMAIL,
      from_email: email || 'desconhecido',
      subject: 'Tentativa de Acesso ao Admin - Meu Site Profissional',
      message: `
        Uma tentativa de acesso ao painel administrativo foi detectada:
        
        Email: ${email || 'N/A'}
        IP: ${ip || 'N/A'}
        User Agent: ${userAgent || 'N/A'}
        Data/Hora: ${new Date().toLocaleString('pt-BR')}
        
        Acesse o painel para verificar esta tentativa.
      `,
      reply_to: email || ADMIN_EMAIL
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    return { success: true, messageId: response.text };
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
    // Fallback para método alternativo
    return sendNotificationViaWebhook(email, ip, userAgent);
  }
};

// Método alternativo usando webhook (Formspree ou similar)
const sendNotificationViaWebhook = async (email, ip, userAgent) => {
  try {
    // Usar Formspree ou outro serviço de webhook
    const webhookUrl = process.env.REACT_APP_WEBHOOK_URL || '';
    
    if (!webhookUrl) {
      console.warn('Webhook não configurado. Notificação não enviada.');
      return { success: false, error: 'Serviço de notificação não configurado' };
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        subject: 'Tentativa de Acesso ao Admin',
        message: `
          Uma tentativa de acesso ao painel administrativo foi detectada:
          
          Email: ${email || 'N/A'}
          IP: ${ip || 'N/A'}
          User Agent: ${userAgent || 'N/A'}
          Data/Hora: ${new Date().toLocaleString('pt-BR')}
        `
      })
    });

    if (response.ok) {
      return { success: true };
    } else {
      throw new Error('Erro ao enviar notificação via webhook');
    }
  } catch (error) {
    console.error('Erro ao enviar notificação via webhook:', error);
    return { success: false, error: error.message };
  }
};

// Obter informações do usuário
export const getUserInfo = () => {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    timestamp: new Date().toISOString()
  };
};

// Obter IP do usuário (usando serviço externo)
export const getUserIP = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Erro ao obter IP:', error);
    return 'N/A';
  }
};

