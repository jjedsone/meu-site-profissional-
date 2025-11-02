import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import '../styles/chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Olá! 👋 Sou o assistente virtual. Como posso ajudá-lo hoje?',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [conversationStep, setConversationStep] = useState('inicio');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addBotMessage = (text) => {
    setMessages(prev => [
      ...prev,
      {
        type: 'bot',
        text,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [
      ...prev,
      {
        type: 'user',
        text,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleQuickReply = (option) => {
    addUserMessage(option.text);
    
    setTimeout(() => {
      if (option.action) {
        option.action();
      }
    }, 500);
  };

  const processBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Detecção de palavras-chave
    if (lowerMessage.includes('preço') || lowerMessage.includes('valor') || lowerMessage.includes('quanto custa')) {
      addBotMessage(
        'Nossos planos variam de acordo com as funcionalidades:\n\n' +
        '💼 Básico: R$ 2.000 (até 4 páginas)\n' +
        '⭐ Profissional: R$ 5.000 (com agendamento)\n' +
        '🚀 Premium: R$ 9.000 (gestão completa)\n\n' +
        'Qual desses atende melhor sua necessidade?'
      );
      setConversationStep('escolha_plano');
    } 
    else if (lowerMessage.includes('prazo') || lowerMessage.includes('quanto tempo')) {
      addBotMessage(
        'Os prazos de entrega são:\n\n' +
        '⚡ Plano Básico: 7-10 dias úteis\n' +
        '📅 Plano Profissional: 15-20 dias úteis\n' +
        '🎯 Plano Premium: 30-45 dias úteis\n\n' +
        'Precisa de algum prazo específico?'
      );
    }
    else if (lowerMessage.includes('agendamento') || lowerMessage.includes('calendario')) {
      addBotMessage(
        'Oferecemos sistema completo de agendamento online! 📅\n\n' +
        'Funcionalidades:\n' +
        '✅ Calendário integrado\n' +
        '✅ Confirmação automática\n' +
        '✅ Lembretes por WhatsApp e e-mail\n' +
        '✅ Área do cliente\n\n' +
        'Essa funcionalidade está nos planos Profissional (R$ 5.000) e Premium (R$ 9.000).\n\n' +
        'Gostaria de receber um orçamento?'
      );
    }
    else if (lowerMessage.includes('profissional') || lowerMessage.includes('negócio') || lowerMessage.includes('empresa')) {
      addBotMessage(
        'Excelente! Criamos sites para profissionais de todas as áreas! 💼\n\n' +
        'Funcionalidades que funcionam para qualquer negócio:\n' +
        '✅ Site institucional profissional\n' +
        '✅ Portfólio de trabalhos\n' +
        '✅ Formulário de contato\n' +
        '✅ Integração com WhatsApp\n' +
        '✅ Blog para autoridade\n\n' +
        'Qual é sua área de atuação?'
      );
      setConversationStep('profissional');
    }
    else if (lowerMessage.includes('sim') || lowerMessage.includes('quero')) {
      if (conversationStep === 'profissional') {
        addBotMessage(
          'Excelente! Vou marcar isso no seu brief. 📝\n\n' +
          'Para calcular uma estimativa mais precisa, preciso saber:\n' +
          '• Quantas páginas você precisa?\n' +
          '• Tem logo e fotos prontas?\n' +
          '• Qual o prazo ideal para entrega?\n\n' +
          'Quer preencher o formulário completo agora ou prefere conversar mais sobre as opções?'
        );
        setConversationStep('coleta_info');
      }
    }
    else if (lowerMessage.includes('formulário') || lowerMessage.includes('formulario') || lowerMessage.includes('orçamento')) {
      addBotMessage(
        'Perfeito! Te encaminho para o formulário de orçamento. ✅\n\n' +
        'Lá você poderá detalhar todas as suas necessidades e em até 48 horas você receberá uma proposta completa.\n\n' +
        '👉 <a href="/orcamento" class="text-blue-600 underline font-semibold">Acessar Formulário de Orçamento</a>'
      );
    }
    else if (lowerMessage.includes('pagamento') || lowerMessage.includes('pagar')) {
      addBotMessage(
        'Formas de pagamento disponíveis: 💳\n\n' +
        '• 50% na contratação\n' +
        '• 50% na entrega\n\n' +
        'Para projetos acima de R$ 5.000, oferecemos parcelamento em até 3x sem juros!\n\n' +
        'Tem alguma dúvida específica sobre pagamento?'
      );
    }
    else if (lowerMessage.includes('suporte') || lowerMessage.includes('manutenção')) {
      addBotMessage(
        'Todos os planos incluem período de suporte! 🛠️\n\n' +
        '• Básico: 1 mês de suporte\n' +
        '• Profissional: 3 meses de suporte\n' +
        '• Premium: 6 meses de suporte + treinamento\n\n' +
        'Também oferecemos manutenção mensal por R$ 200/mês após o período incluso.\n\n' +
        'Precisa de mais informações?'
      );
    }
    else {
      // Resposta genérica
      addBotMessage(
        'Entendi! Posso ajudá-lo com:\n\n' +
        '• Informações sobre planos e preços\n' +
        '• Prazos de entrega\n' +
        '• Funcionalidades disponíveis\n' +
        '• Formas de pagamento\n\n' +
        'Sobre qual desses você gostaria de saber mais?'
      );
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (inputText.trim()) {
      addUserMessage(inputText);
      const userMsg = inputText;
      setInputText('');
      
      setTimeout(() => {
        processBotResponse(userMsg);
      }, 800);
    }
  };

  const quickReplies = [
    { text: '💰 Quanto custa?', action: () => processBotResponse('quanto custa') },
    { text: '⏱️ Prazo de entrega?', action: () => processBotResponse('quanto tempo') },
    { text: '📅 Sistema de agendamento?', action: () => processBotResponse('agendamento') },
    { text: '📝 Solicitar orçamento', action: () => processBotResponse('orçamento') }
  ];

  return (
    <>
      {/* Botão Flutuante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full p-5 shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-110 z-50 animate-pulse-slow group"
          aria-label="Abrir chat"
        >
          <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></span>
        </button>
      )}

      {/* Janela do Chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border-2 border-blue-200 animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-5 rounded-t-2xl flex justify-between items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-pattern-tech-dots opacity-20"></div>
            <div className="flex items-center relative z-10">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-3 shadow-lg">
                <MessageCircle className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Assistente Virtual</h3>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-xs text-blue-100">Online agora</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-2 transition-all relative z-10 group"
              aria-label="Fechar chat"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            </button>
          </div>

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-gray-50 to-blue-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 shadow-md ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                      : 'bg-white text-gray-800 border-2 border-gray-100'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line leading-relaxed" dangerouslySetInnerHTML={{ __html: message.text }} />
                  <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Respostas Rápidas */}
            {messages.length <= 2 && (
              <div className="flex flex-wrap gap-2 mt-4 animate-fade-in-up delay-200">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="bg-white border-2 border-blue-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all transform hover:scale-105 shadow-sm"
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t-2 border-gray-200 bg-white rounded-b-2xl">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-5 py-3 border-2 border-gray-300 rounded-full focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all outline-none"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-3 rounded-full hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-110"
                aria-label="Enviar mensagem"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;

