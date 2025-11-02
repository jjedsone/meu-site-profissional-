import React, { useState } from 'react';
import { CheckCircle, Send } from 'lucide-react';
import { toast } from '../utils/toast';
import { validators } from '../utils/validators';
import '../style/Orcamento.css';

const Orcamento = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    telefone: '',
    profissao: '',
    endereco: '',
    tipoSite: [],
    paginasNecessarias: [],
    integracoes: [],
    exemplosUrls: '',
    publicoAlvo: '',
    prazoDesejado: '',
    orcamentoDisponivel: '',
    observacoes: '',
    consentimento: false
  });

  const [etapa, setEtapa] = useState(1);
  const totalEtapas = 4;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && (name === 'tipoSite' || name === 'paginasNecessarias' || name === 'integracoes')) {
      setFormData(prev => ({
        ...prev,
        [name]: checked 
          ? [...prev[name], value]
          : prev[name].filter(item => item !== value)
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação
    const emailValidation = validators.email(formData.email);
    if (!emailValidation.isValid) {
      toast.error(emailValidation.message);
      return;
    }

    const phoneValidation = validators.phone(formData.telefone);
    if (!phoneValidation.isValid) {
      toast.error(phoneValidation.message);
      return;
    }

    const requiredName = validators.required(formData.nomeCompleto, 'Nome completo');
    if (!requiredName.isValid) {
      toast.error(requiredName.message);
      return;
    }

    if (!formData.consentimento) {
      toast.error('Você deve concordar com os termos de uso');
      return;
    }
    
    // Salvar orçamento no localStorage
    const novoOrcamento = {
      id: Date.now(),
      tipo: 'orcamento',
      data: new Date().toISOString(),
      dataFormatada: new Date().toLocaleString('pt-BR'),
      status: 'pendente',
      ...formData
    };
    
    try {
      // Buscar orçamentos existentes
      const orcamentosExistentes = JSON.parse(localStorage.getItem('orcamentos') || '[]');
      
      // Adicionar novo orçamento
      orcamentosExistentes.push(novoOrcamento);
      
      // Salvar no localStorage
      localStorage.setItem('orcamentos', JSON.stringify(orcamentosExistentes));
      
      console.log('Orçamento salvo:', novoOrcamento);
      
      toast.success('Orçamento enviado com sucesso! Entraremos em contato em até 48 horas.');
    } catch (error) {
      console.error('Erro ao salvar orçamento:', error);
      toast.error('Erro ao enviar orçamento. Tente novamente.');
      return;
    }
    
    // Reset form
    setFormData({
      nomeCompleto: '',
      email: '',
      telefone: '',
      profissao: '',
      endereco: '',
      tipoSite: [],
      paginasNecessarias: [],
      integracoes: [],
      exemplosUrls: '',
      publicoAlvo: '',
      prazoDesejado: '',
      orcamentoDisponivel: '',
      observacoes: '',
      consentimento: false
    });
    setEtapa(1);
  };

  const proximaEtapa = () => {
    if (etapa < totalEtapas) {
      setEtapa(etapa + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const etapaAnterior = () => {
    if (etapa > 1) {
      setEtapa(etapa - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const podeAvancar = () => {
    switch (etapa) {
      case 1:
        return formData.nomeCompleto && formData.email && formData.telefone;
      case 2:
        return formData.profissao && formData.tipoSite.length > 0;
      case 3:
        return formData.paginasNecessarias.length > 0;
      case 4:
        return formData.consentimento;
      default:
        return false;
    }
  };

  return (
    <div className="orcamento-page">
      <div className="orcamento-container">
      {/* Header */}
        <div className="orcamento-header">
          <h1>Solicitar Orçamento</h1>
          <p>
          Preencha o formulário abaixo e receba uma proposta personalizada em até 48 horas
        </p>
      </div>

      {/* Barra de Progresso */}
        <div className="progress-bar">
          <div className="progress-header">
            <span className="progress-step">Etapa {etapa} de {totalEtapas}</span>
            <span className="progress-percentage">
            {Math.round((etapa / totalEtapas) * 100)}% completo
          </span>
        </div>
          <div className="progress-track">
          <div 
              className="progress-fill"
            style={{ width: `${(etapa / totalEtapas) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Formulário */}
        <form onSubmit={handleSubmit} className="orcamento-form-wrapper">
        {/* Etapa 1: Informações Pessoais */}
        {etapa === 1 && (
            <div className="form-content">
              <div className="form-section active">
                <h2>Informações de Contato</h2>
                
                <div className="form-group">
                  <label className="form-label required">
                    Nome Completo
              </label>
              <input
                type="text"
                name="nomeCompleto"
                value={formData.nomeCompleto}
                onChange={handleInputChange}
                    className="form-input"
                placeholder="Seu nome completo"
                required
              />
            </div>

                <div className="form-group-grid">
                  <div className="form-group">
                    <label className="form-label required">
                      E-mail
                </label>
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
                    <label className="form-label required">
                      Telefone (WhatsApp)
                </label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                      className="form-input"
                  placeholder="(00) 00000-0000"
                  required
                />
              </div>
            </div>

                <div className="form-group">
                  <label className="form-label">
                Endereço (Cidade, Bairro)
              </label>
              <input
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleInputChange}
                    className="form-input"
                placeholder="São Paulo, Centro"
              />
                  <p className="form-hint">Para otimização de SEO local</p>
                </div>
              </div>
          </div>
        )}

        {/* Etapa 2: Tipo de Negócio */}
        {etapa === 2 && (
            <div className="form-content">
              <div className="form-section active">
                <h2>Sobre seu Negócio</h2>
                
                <div className="form-group">
                  <label className="form-label required">
                    Profissão / Tipo de Negócio
              </label>
              <select
                name="profissao"
                value={formData.profissao}
                onChange={handleInputChange}
                    className="form-select"
                required
              >
                <option value="">Selecione...</option>
                <option value="saude">Saúde (Médicos, Dentistas, Psicólogos)</option>
                <option value="juridico">Jurídico (Advogados, Escritórios)</option>
                <option value="contabilidade">Contabilidade</option>
                <option value="consultoria">Consultoria Empresarial</option>
                <option value="educacao">Educação (Cursos, Treinamentos)</option>
                <option value="fitness">Fitness e Bem-estar</option>
                <option value="tecnologia">Tecnologia e TI</option>
                <option value="marketing">Marketing e Publicidade</option>
                <option value="imobiliaria">Imobiliária</option>
                <option value="outro">Outro</option>
              </select>
            </div>

                <div className="form-group">
                  <label className="form-label required">
                    Tipo de Site Desejado (selecione um ou mais)
              </label>
                  <div className="checkbox-group">
                {[
                  { value: 'institucional', label: 'Institucional (apresentação da empresa)' },
                  { value: 'agendamento', label: 'Sistema de agendamento online' },
                  { value: 'ecommerce', label: 'E-commerce (venda de produtos)' },
                  { value: 'portfolio', label: 'Portfólio (galeria de trabalhos)' },
                  { value: 'blog', label: 'Blog / Conteúdo' }
                ].map((tipo) => (
                      <label 
                        key={tipo.value} 
                        className={`checkbox-item ${formData.tipoSite.includes(tipo.value) ? 'checked' : ''}`}
                      >
                    <input
                      type="checkbox"
                      name="tipoSite"
                      value={tipo.value}
                      checked={formData.tipoSite.includes(tipo.value)}
                      onChange={handleInputChange}
                    />
                        <span>{tipo.label}</span>
                  </label>
                ))}
              </div>
            </div>

                <div className="form-group">
                  <label className="form-label">
                Público-alvo e Objetivo do Site
              </label>
              <textarea
                name="publicoAlvo"
                value={formData.publicoAlvo}
                onChange={handleInputChange}
                rows="4"
                    className="form-textarea"
                placeholder="Ex: Atender pacientes da região que buscam fisioterapia esportiva..."
              />
                </div>
            </div>
          </div>
        )}

        {/* Etapa 3: Funcionalidades */}
        {etapa === 3 && (
            <div className="form-content">
              <div className="form-section active">
                <h2>Funcionalidades</h2>
                
                <div className="form-group">
                  <label className="form-label required">
                    Páginas Necessárias (selecione as que precisar)
              </label>
                  <div className="checkbox-group">
                {[
                  'Home',
                  'Sobre',
                  'Serviços',
                  'Agendamento',
                  'Blog',
                  'Contato',
                  'Galeria',
                  'Depoimentos'
                ].map((pagina) => (
                      <label 
                        key={pagina} 
                        className={`checkbox-item ${formData.paginasNecessarias.includes(pagina) ? 'checked' : ''}`}
                      >
                    <input
                      type="checkbox"
                      name="paginasNecessarias"
                      value={pagina}
                      checked={formData.paginasNecessarias.includes(pagina)}
                      onChange={handleInputChange}
                    />
                        <span>{pagina}</span>
                  </label>
                ))}
              </div>
            </div>

                <div className="form-group">
                  <label className="form-label">
                Integrações Desejadas (opcional)
              </label>
                  <div className="checkbox-group">
                {[
                  { value: 'whatsapp', label: 'WhatsApp Business' },
                  { value: 'pagamento', label: 'Sistema de Pagamento Online' },
                  { value: 'calendario', label: 'Calendário de Agendamento' },
                  { value: 'google-agenda', label: 'Google Agenda' },
                  { value: 'email', label: 'E-mail Marketing / Lembretes' },
                  { value: 'maps', label: 'Google Maps' }
                ].map((integracao) => (
                      <label 
                        key={integracao.value} 
                        className={`checkbox-item ${formData.integracoes.includes(integracao.value) ? 'checked' : ''}`}
                      >
                    <input
                      type="checkbox"
                      name="integracoes"
                      value={integracao.value}
                      checked={formData.integracoes.includes(integracao.value)}
                      onChange={handleInputChange}
                    />
                        <span>{integracao.label}</span>
                  </label>
                ))}
              </div>
            </div>

                <div className="form-group">
                  <label className="form-label">
                Exemplos de Sites que Você Gosta
              </label>
              <textarea
                name="exemplosUrls"
                value={formData.exemplosUrls}
                onChange={handleInputChange}
                rows="3"
                    className="form-textarea"
                placeholder="Cole aqui URLs de sites que servem de inspiração..."
              />
                </div>
            </div>
          </div>
        )}

        {/* Etapa 4: Prazo e Orçamento */}
        {etapa === 4 && (
            <div className="form-content">
              <div className="form-section active">
                <h2>Prazo e Investimento</h2>
            
                <div className="form-group">
                  <label className="form-label">
                Prazo Desejado
              </label>
              <input
                type="date"
                name="prazoDesejado"
                value={formData.prazoDesejado}
                onChange={handleInputChange}
                    className="form-input"
              />
            </div>

                <div className="form-group">
                  <label className="form-label">
                Orçamento Disponível
              </label>
              <select
                name="orcamentoDisponivel"
                value={formData.orcamentoDisponivel}
                onChange={handleInputChange}
                    className="form-select"
              >
                <option value="">Selecione uma faixa...</option>
                <option value="ate-2000">Até R$ 2.000</option>
                <option value="2000-5000">R$ 2.000 - R$ 5.000</option>
                <option value="5000-10000">R$ 5.000 - R$ 10.000</option>
                <option value="acima-10000">Acima de R$ 10.000</option>
                <option value="flexivel">Flexível</option>
              </select>
            </div>

                <div className="form-group">
                  <label className="form-label">
                Observações Adicionais / Referências Visuais
              </label>
              <textarea
                name="observacoes"
                value={formData.observacoes}
                onChange={handleInputChange}
                rows="4"
                    className="form-textarea"
                placeholder="Qualquer informação adicional que possa nos ajudar..."
              />
            </div>

                <div className="consent-box">
                  <label className="consent-label">
                <input
                  type="checkbox"
                  name="consentimento"
                  checked={formData.consentimento}
                  onChange={handleInputChange}
                      className="consent-checkbox"
                  required
                />
                    <span className="consent-text">
                  Concordo com o uso dos meus dados para análise e envio de proposta comercial. 
                  Seus dados estão protegidos de acordo com a LGPD e não serão compartilhados 
                  com terceiros.
                </span>
              </label>
            </div>

            {/* Resumo */}
                <div className="summary-box">
                  <h3 className="summary-title">
                    <CheckCircle className="summary-icon" />
                Resumo do Pedido
              </h3>
                  <div className="summary-content">
                <p><strong>Nome:</strong> {formData.nomeCompleto}</p>
                <p><strong>E-mail:</strong> {formData.email}</p>
                <p><strong>Profissão:</strong> {formData.profissao}</p>
                <p><strong>Tipo de Site:</strong> {formData.tipoSite.join(', ')}</p>
                <p><strong>Páginas:</strong> {formData.paginasNecessarias.join(', ')}</p>
                {formData.integracoes.length > 0 && (
                  <p><strong>Integrações:</strong> {formData.integracoes.join(', ')}</p>
                )}
                  </div>
              </div>
            </div>
          </div>
        )}

        {/* Botões de Navegação */}
          <div className="form-buttons">
          {etapa > 1 ? (
            <button
              type="button"
              onClick={etapaAnterior}
                className="btn-previous"
            >
              ← Voltar
            </button>
          ) : (
            <div></div>
          )}

          {etapa < totalEtapas ? (
            <button
              type="button"
              onClick={proximaEtapa}
              disabled={!podeAvancar()}
                className={`btn-next ${!podeAvancar() ? 'disabled' : ''}`}
            >
              Próximo →
            </button>
          ) : (
            <button
              type="submit"
              disabled={!podeAvancar()}
                className={`btn-submit ${!podeAvancar() ? 'disabled' : ''}`}
              >
                <Send className="w-5 h-5" />
              Enviar Orçamento
            </button>
          )}
        </div>
      </form>

      {/* Informações Adicionais */}
        <div className="info-cards">
          <div className="info-card">
            <div className="info-icon">⚡</div>
            <h3>Resposta Rápida</h3>
            <p>Proposta em até 48 horas</p>
          </div>
          <div className="info-card">
            <div className="info-icon">🎯</div>
            <h3>Sem Compromisso</h3>
            <p>Orçamento gratuito e sem obrigação</p>
        </div>
          <div className="info-card">
            <div className="info-icon">💬</div>
            <h3>Atendimento Direto</h3>
            <p>Você fala diretamente com o desenvolvedor</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Orcamento;

