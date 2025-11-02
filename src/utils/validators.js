// Utilitários de validação

export const validators = {
  // Validar email
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return { isValid: false, message: 'Email é obrigatório' };
    }
    if (!emailRegex.test(email)) {
      return { isValid: false, message: 'Email inválido' };
    }
    return { isValid: true };
  },

  // Validar telefone brasileiro
  phone: (phone) => {
    // Remove caracteres não numéricos
    const cleanPhone = phone?.replace(/\D/g, '') || '';
    
    if (!phone) {
      return { isValid: false, message: 'Telefone é obrigatório' };
    }
    
    // Deve ter entre 10 e 11 dígitos (com DDD)
    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      return { isValid: false, message: 'Telefone deve ter 10 ou 11 dígitos' };
    }
    
    return { isValid: true };
  },

  // Validar CPF
  cpf: (cpf) => {
    const cleanCpf = cpf?.replace(/\D/g, '') || '';
    
    if (!cpf) {
      return { isValid: false, message: 'CPF é obrigatório' };
    }
    
    if (cleanCpf.length !== 11) {
      return { isValid: false, message: 'CPF deve ter 11 dígitos' };
    }
    
    // Validação simples de CPF (pode ser melhorada)
    if (/^(\d)\1{10}$/.test(cleanCpf)) {
      return { isValid: false, message: 'CPF inválido' };
    }
    
    return { isValid: true };
  },

  // Validar URL
  url: (url) => {
    if (!url) {
      return { isValid: false, message: 'URL é obrigatória' };
    }
    
    try {
      new URL(url);
      return { isValid: true };
    } catch {
      return { isValid: false, message: 'URL inválida' };
    }
  },

  // Validar campo obrigatório
  required: (value, fieldName = 'Campo') => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return { isValid: false, message: `${fieldName} é obrigatório` };
    }
    return { isValid: true };
  },

  // Validar mínimo de caracteres
  minLength: (value, min, fieldName = 'Campo') => {
    if (!value || value.length < min) {
      return { isValid: false, message: `${fieldName} deve ter no mínimo ${min} caracteres` };
    }
    return { isValid: true };
  },

  // Validar máximo de caracteres
  maxLength: (value, max, fieldName = 'Campo') => {
    if (value && value.length > max) {
      return { isValid: false, message: `${fieldName} deve ter no máximo ${max} caracteres` };
    }
    return { isValid: true };
  },
};

