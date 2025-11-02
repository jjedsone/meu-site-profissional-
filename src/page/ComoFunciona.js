import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, FileText, Code, Rocket, Settings, HeadphonesIcon } from 'lucide-react';
import '../style/ComoFunciona.css';

const ComoFunciona = () => {
  return (
    <div className="como-funciona-page">
      <div className="como-funciona-container">
        {/* Header */}
        <div className="como-funciona-header">
          <h1>Como Funciona</h1>
          <p>
            Do primeiro contato até o lançamento do seu site: um processo transparente, 
            profissional e sem complicações.
          </p>
        </div>

        {/* Processo Principal */}
        <div className="steps-wrapper">
          <div className="steps-container">
            {/* Linha Vertical (desktop) */}
            <div className="steps-line"></div>

            {/* Etapas */}
            <div className="steps-list">
              {/* Etapa 1 */}
              <div className="step-card step-left">
                <div className="step-content">
                  <div className="step-number-badge">1</div>
                  <h3>Você Conta Como Quer</h3>
                  <p className="step-description">
                    Preencha nosso formulário inteligente ou converse com nosso assistente virtual. 
                    Responda perguntas simples sobre seu negócio, público-alvo e necessidades.
                  </p>
                  <ul className="step-features">
                    <li>• Qual seu tipo de negócio</li>
                    <li>• Quais funcionalidades precisa</li>
                    <li>• Exemplos de sites que você gosta</li>
                    <li>• Prazo e orçamento disponível</li>
                  </ul>
                </div>
                <div className="step-icon-wrapper">
                  <div className="step-icon">
                    <MessageSquare className="w-10 h-10" />
                  </div>
                </div>
              </div>

              {/* Etapa 2 */}
              <div className="step-card step-right">
                <div className="step-icon-wrapper">
                  <div className="step-icon">
                    <FileText className="w-10 h-10" />
                  </div>
                </div>
                <div className="step-content">
                  <div className="step-number-badge">2</div>
                  <h3>Análise e Proposta</h3>
                  <p className="step-description">
                    Em até 48 horas, você recebe uma proposta detalhada com:
                  </p>
                  <ul className="step-features">
                    <li>• Plano recomendado para seu negócio</li>
                    <li>• Lista completa de funcionalidades</li>
                    <li>• Cronograma de desenvolvimento</li>
                    <li>• Investimento total e formas de pagamento</li>
                    <li>• Exemplos de sites similares</li>
                  </ul>
                </div>
              </div>

              {/* Etapa 3 */}
              <div className="step-card step-left">
                <div className="step-content">
                  <div className="step-number-badge">3</div>
                  <h3>Aprovação e Início</h3>
                  <p className="step-description">
                    Após sua aprovação, iniciamos o projeto:
                  </p>
                  <ul className="step-features">
                    <li>• Assinatura do contrato digital</li>
                    <li>• Pagamento da primeira parcela (50%)</li>
                    <li>• Criação do painel do cliente</li>
                    <li>• Coleta de materiais (logo, fotos, textos)</li>
                    <li>• Definição final de layout</li>
                  </ul>
                </div>
                <div className="step-icon-wrapper">
                  <div className="step-icon">
                    <Settings className="w-10 h-10" />
                  </div>
                </div>
              </div>

              {/* Etapa 4 */}
              <div className="step-card step-right">
                <div className="step-icon-wrapper">
                  <div className="step-icon">
                    <Code className="w-10 h-10" />
                  </div>
                </div>
                <div className="step-content">
                  <div className="step-number-badge">4</div>
                  <h3>Desenvolvimento</h3>
                  <p className="step-description">
                    Enquanto desenvolvemos seu site, você acompanha tudo:
                  </p>
                  <ul className="step-features">
                    <li>• Acesso ao painel com status em tempo real</li>
                    <li>• Prévias do design durante o desenvolvimento</li>
                    <li>• Possibilidade de solicitar ajustes</li>
                    <li>• Comunicação direta via WhatsApp</li>
                    <li>• Atualizações regulares sobre o progresso</li>
                  </ul>
                </div>
              </div>

              {/* Etapa 5 */}
              <div className="step-card step-left">
                <div className="step-content">
                  <div className="step-number-badge">5</div>
                  <h3>Revisão e Ajustes</h3>
                  <p className="step-description">
                    Antes do lançamento, você revisa tudo:
                  </p>
                  <ul className="step-features">
                    <li>• Apresentação do site completo</li>
                    <li>• Teste de todas as funcionalidades</li>
                    <li>• Solicitação de ajustes necessários</li>
                    <li>• Aprovação final do conteúdo</li>
                    <li>• Verificação em diferentes dispositivos</li>
                  </ul>
                </div>
                <div className="step-icon-wrapper">
                  <div className="step-icon">
                    <Settings className="w-10 h-10" />
                  </div>
                </div>
              </div>

              {/* Etapa 6 */}
              <div className="step-card step-right">
                <div className="step-icon-wrapper">
                  <div className="step-icon">
                    <Rocket className="w-10 h-10" />
                  </div>
                </div>
                <div className="step-content">
                  <div className="step-number-badge">6</div>
                  <h3>Lançamento</h3>
                  <p className="step-description">
                    Seu site vai ao ar de forma profissional:
                  </p>
                  <ul className="step-features">
                    <li>• Configuração do domínio</li>
                    <li>• Deploy em servidor de alta performance</li>
                    <li>• Configuração de SSL (segurança)</li>
                    <li>• Otimização para Google (SEO básico)</li>
                    <li>• Integração com Google Analytics</li>
                  </ul>
                </div>
              </div>

              {/* Etapa 7 */}
              <div className="step-card step-left">
                <div className="step-content">
                  <div className="step-number-badge">7</div>
                  <h3>Treinamento e Suporte</h3>
                  <p className="step-description">
                    Você não fica sozinho após o lançamento:
                  </p>
                  <ul className="step-features">
                    <li>• Treinamento completo para uso do site</li>
                    <li>• Manual de uso detalhado</li>
                    <li>• Período de suporte incluso no plano</li>
                    <li>• Assistência para dúvidas e problemas</li>
                    <li>• Opção de manutenção mensal</li>
                  </ul>
                </div>
                <div className="step-icon-wrapper">
                  <div className="step-icon">
                    <HeadphonesIcon className="w-10 h-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prazos */}
        <div className="timeline-section">
          <div className="timeline-header">
            <h2>Prazos de Entrega</h2>
          </div>
          <div className="timeline-grid">
            <div className="timeline-item">
              <h3 className="timeline-label">Plano Básico</h3>
              <div className="timeline-day">7-10</div>
              <p className="timeline-text">dias úteis</p>
              <ul className="timeline-features">
                <li>• Até 4 páginas</li>
                <li>• Design simples</li>
                <li>• Funcionalidades básicas</li>
              </ul>
            </div>
            <div className="timeline-item featured-timeline">
              <h3 className="timeline-label">Plano Profissional</h3>
              <div className="timeline-day">15-20</div>
              <p className="timeline-text">dias úteis</p>
              <ul className="timeline-features">
                <li>• Até 8 páginas</li>
                <li>• Sistema de agendamento</li>
                <li>• Integrações avançadas</li>
              </ul>
            </div>
            <div className="timeline-item">
              <h3 className="timeline-label">Plano Premium</h3>
              <div className="timeline-day">30-45</div>
              <p className="timeline-text">dias úteis</p>
              <ul className="timeline-features">
                <li>• Páginas ilimitadas</li>
                <li>• Painel administrativo</li>
                <li>• Todas as funcionalidades</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Diferenciais */}
        <div className="diferenciais-section">
          <h2 className="section-title">Por que escolher nosso processo?</h2>
          <div className="diferenciais-grid">
            <div className="diferencial-card">
              <div className="diferencial-icon">✅</div>
              <h3>Transparência Total</h3>
              <p>Você acompanha cada etapa do desenvolvimento</p>
            </div>
            <div className="diferencial-card">
              <div className="diferencial-icon">💬</div>
              <h3>Comunicação Direta</h3>
              <p>Contato direto via WhatsApp sem intermediários</p>
            </div>
            <div className="diferencial-card">
              <div className="diferencial-icon">🎯</div>
              <h3>Foco no seu Negócio</h3>
              <p>Soluções pensadas especialmente para você</p>
            </div>
            <div className="diferencial-card">
              <div className="diferencial-icon">🚀</div>
              <h3>Entrega Garantida</h3>
              <p>Cumprimos os prazos acordados</p>
            </div>
          </div>
        </div>

        {/* FAQ Rápido */}
        <div className="quick-faq-section">
          <h2 className="section-title">Perguntas Frequentes</h2>
          <div className="quick-faq-list">
            <div className="quick-faq-item">
              <h3>Preciso fornecer o conteúdo (textos e fotos)?</h3>
              <p>
                Idealmente sim, pois você conhece melhor seu negócio. Mas oferecemos serviço de criação 
                de conteúdo profissional como adicional.
              </p>
            </div>
            <div className="quick-faq-item">
              <h3>Posso fazer alterações depois do lançamento?</h3>
              <p>
                Sim! Incluímos um período de suporte onde você pode solicitar ajustes. Também oferecemos 
                planos de manutenção mensal.
              </p>
            </div>
            <div className="quick-faq-item">
              <h3>O site será meu?</h3>
              <p>
                Totalmente! Você terá propriedade completa do código e poderá migrar para outro 
                servidor quando quiser.
              </p>
            </div>
            <div className="quick-faq-item">
              <h3>Como funciona o pagamento?</h3>
              <p>
                50% na contratação e 50% na entrega. Para projetos acima de R$ 5.000, oferecemos 
                parcelamento em até 3x sem juros.
              </p>
            </div>
          </div>
          <div className="quick-faq-link">
            <Link to="/faq" className="faq-link-button">
              Ver todas as perguntas frequentes →
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="processo-cta">
          <h2>Pronto para começar?</h2>
          <p>
            O primeiro passo é simples: conte-nos sobre seu negócio e receberá uma proposta personalizada
          </p>
          <Link 
            to="/orcamento"
            className="cta-button-primary"
          >
            Solicitar Orçamento Agora
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComoFunciona;

