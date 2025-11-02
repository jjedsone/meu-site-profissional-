// Hook customizado para gerenciamento seguro do localStorage
import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Tentar obter do localStorage
      const item = window.localStorage.getItem(key);
      // Parse e retornar se existir, senão retornar valor inicial
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Em caso de erro, retornar valor inicial
      console.error(`Erro ao ler do localStorage (${key}):`, error);
      return initialValue;
    }
  });

  // Função para atualizar o valor
  const setValue = (value) => {
    try {
      // Permitir que value seja uma função para ter a mesma API do useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Salvar estado
      setStoredValue(valueToStore);
      // Salvar no localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Capturar erros, incluindo quota exceeded
      console.error(`Erro ao salvar no localStorage (${key}):`, error);
      
      // Tentar limpar itens antigos se quota excedida
      if (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
        console.warn('Quota do localStorage excedida. Tentando limpar itens antigos...');
        // Aqui você pode implementar lógica para limpar dados antigos
      }
      
      // Em caso de erro, pelo menos atualizar o estado
      if (value instanceof Function) {
        setStoredValue(value(storedValue));
      } else {
        setStoredValue(value);
      }
    }
  };

  // Retornar valor e função de atualização
  return [storedValue, setValue];
};

