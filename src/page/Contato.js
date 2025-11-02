import React, { useState } from 'react';
import { Phone, Mail, Linkedin, MapPin, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '../utils/toast';
import { validators } from '../utils/validators';
import '../style/Contato.css';

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  });
  const [enviado, setEnviado] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação
    const emailValidation = validators.email(formData.email);
    if (!emailValidation.isValid) {
      toast.error(emailValidation.message);
      return;
    }

    const requiredName = validators.required(formData.nome, 'Nome');
    if (!requiredName.isValid) {
      toast.error(requiredName.message);
      return;
    }

    const requiredMessage = validators.required(formData.mensagem, 'Mensagem');
    if (!requiredMessage.isValid) {
      toast.error(requiredMessage.message);
      return;
    }
    
    // Salvar mensagem no localStorage
    const novaMensagem = {
      id: Date.now(),
      tipo: 'contato',
      data: new Date().toISOString(),
      dataFormatada: new Date().toLocaleString('pt-BR'),
      status: 'pendente',
      ...formData
    };
    
    try {
      // Buscar mensagens existentes
      const mensagensExistentes = JSON.parse(localStorage.getItem('mensagens_contato') || '[]');
      
      // Adicionar nova mensagem
      mensagensExistentes.push(novaMensagem);
      
      // Salvar no localStorage
      localStorage.setItem('mensagens_contato', JSON.stringify(mensagensExistentes));
      
      console.log('Mensagem salva:', novaMensagem);
      
      // Mostrar sucesso
      toast.success('Mensagem enviada com sucesso! Responderemos em breve.');
      setEnviado(true);
    } catch (error) {
      console.error('Erro ao salvar mensagem:', error);
      toast.error('Erro ao enviar mensagem. Tente novamente.');
      return;
    }
    
    // Reset form
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      assunto: '',
      mensagem: ''
    });
    
    // Resetar mensagem de sucesso após 5 segundos
    setTimeout(() => {
      setEnviado(false);
    }, 5000);
  };

  return (
    <div className="contato-page">
      <div className="contato-container">
        {/* Header */}
        <div className="contato-header">
          <h1>Entre em Contato</h1>
          <p>
            Estamos prontos para transformar sua presença digital. Entre em contato 
            conosco e receba uma proposta personalizada.
          </p>
        </div>

        {/* Content Grid */}
        <div className="contato-content">
          {/* Contact Info */}
          <div className="contact-info">
            <h2>Informações de Contato</h2>
            <p>
              Escolha a forma de contato que preferir. Respondemos rapidamente e 
              com total atenção ao seu projeto.
            </p>

            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="info-content">
                  <h3>WhatsApp</h3>
                  <p>
                    <a href="https://wa.me/5511968396789" target="_blank" rel="noopener noreferrer">
                      (11) 96839-6789
                    </a>
                  </p>
                  <small className="text-gray-500">Resposta rápida via chat</small>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="info-content">
                  <h3>E-mail</h3>
                  <p>
                    <a href="mailto:jedsonmede@gmail.com">
                      jedsonmede@gmail.com
                    </a>
                  </p>
                  <small className="text-gray-500">Envie suas dúvidas detalhadas</small>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <Linkedin className="w-6 h-6" />
                </div>
                <div className="info-content">
                  <h3>LinkedIn</h3>
                  <p>
          <a
            href="https://www.linkedin.com/in/-jedsonfernandes"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/-jedsonfernandes
          </a>
        </p>
                  <small className="text-gray-500">Conecte-se profissionalmente</small>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="info-content">
                  <h3>Localização</h3>
                  <p>São Paulo, SP</p>
                  <small className="text-gray-500">Atendimento online e presencial</small>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="contato-cta">
              <Link to="/orcamento" className="cta-button-primary">
                <Send className="w-5 h-5" />
                Solicitar Orçamento
              </Link>
              <Link to="/faq" className="cta-button-secondary">
                <MessageCircle className="w-5 h-5" />
                Ver Perguntas Frequentes
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <h2>Envie uma Mensagem</h2>
            <p className="form-description">
              Preencha o formulário abaixo e entraremos em contato em até 24 horas.
            </p>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              {enviado && (
                <div className="form-success">
                  <CheckCircle className="w-5 h-5" />
                  <span>Mensagem enviada com sucesso! Entraremos em contato em breve.</span>
                </div>
              )}
              
              <div className="form-group">
                <label className="form-label required">Nome Completo</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Seu nome completo"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label required">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label required">Telefone / WhatsApp</label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label required">Assunto</label>
                <select 
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleInputChange}
                  className="form-select" 
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="orcamento">Solicitar Orçamento</option>
                  <option value="duvida">Dúvidas sobre os Planos</option>
                  <option value="suporte">Suporte Técnico</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label required">Mensagem</label>
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleInputChange}
                  className="form-textarea"
                  rows="5"
                  placeholder="Conte-nos sobre seu projeto ou dúvida..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="form-button">
                <Send className="w-5 h-5" />
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contato;
