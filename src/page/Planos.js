import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import CalculadoraPrecos from '../components/CalculadoraPrecos';
import '../style/Planos.css';

const Planos = () => {
  return (
    <div className="planos-page">
      <div className="planos-container">
        {/* Header */}
        <div className="planos-header">
          <h1>Planos e Serviços</h1>
          <p>
            Escolha o plano ideal para seu negócio. Todos incluem design responsivo, hospedagem e suporte técnico.
          </p>
        </div>

        {/* Tabela Comparativa */}
        <div className="comparison-section">
          <div className="comparison-header">
            <h2>Comparação de Planos</h2>
          </div>
          <div className="comparison-table">
            <div className="overflow-x-auto">
              <table className="comparison-table-content">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Recursos</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  Básico<br />
                  <span className="text-blue-600 text-xl">R$ 2.000</span>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 bg-blue-50">
                  Profissional<br />
                  <span className="text-blue-600 text-xl">R$ 5.000</span>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  Premium<br />
                  <span className="text-blue-600 text-xl">R$ 9.000</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-gray-700">Número de páginas</td>
                <td className="px-6 py-4 text-center text-gray-700">Até 4</td>
                <td className="px-6 py-4 text-center text-gray-700 bg-blue-50">Até 8</td>
                <td className="px-6 py-4 text-center text-gray-700">Ilimitadas</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-700">Design responsivo (mobile)</td>
                <td className="px-6 py-4 text-center"><CheckCircle className="w-6 h-6 text-green-500 mx-auto" /></td>
                <td className="px-6 py-4 text-center bg-blue-50"><CheckCircle className="w-6 h-6 text-green-500 mx-auto" /></td>
                <td className="px-6 py-4 text-center"><CheckCircle className="w-6 h-6 text-green-500 mx-auto" /></td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-700">Formulário de contato</td>
                <td className="px-6 py-4 text-center"><CheckCircle className="w-6 h-6 text-green-500 mx-auto" /></td>
                <td className="px-6 py-4 text-center bg-blue-50"><CheckCircle className="w-6 h-6 text-green-500 mx-auto" /></td>
                <td className="px-6 py-4 text-center"><CheckCircle className="w-6 h-6 text-green-500 mx-auto" /></td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-700">Hospedagem Firebase</td>
                <td className="px-6 py-4 text-center"><CheckCircle className="w-6 h-6 text-green-500 mx-auto" /></td>
                <td className="px-6 py-4 text-center bg-blue-50"><CheckCircle className="w-6 h-6 text-green-500 mx-auto" /></td>
                <td className="px-6 py-4 text-center"><CheckCircle className="w-6 h-6 text-green-500 mx-auto" /></td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-700">Galeria de fotos</td>
                <td className="px-6 py-4 text-center"><XCircle className="w-6 h-6 text-gray-300 mx-auto" /></td>
                <td className="px-6 py-4 text-center bg-blue-50"><CheckCircle className="w-6 h-6 text-green-500 mx-auto" /></td>
                <td className="px-6 py-4 text-center"><CheckCircle className="w-6 h-6 text-green-500 mx-auto" /></td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-700">Sistema de agendamento</td>
                <td className="px-6 py-4 text-center text-gray-500 text-sm">Simples</td>
                <td className="px-6 py-4 text-center text-gray-700 bg-blue-50">Com calendário</td>
                <td className="px-6 py-4 text-center text-gray-700">Avançado</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-700">Lembretes por e-mail/WhatsApp</td>
                <td className="px-6 py-4 text-center"><XCircle className="w-6 h-6 text-gray-300 mx-auto" /></td>
                <td className="px-6 py-4 text-center bg-blue-50"><CheckCircle className="w-6 h-6 text-green-500 mx-auto" /></td>
                <td className="px-6 py-4 text-center"><CheckCircle className="w-6 h-6 text-green-500 mx-auto" /></td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-700">Área de login (cliente/admin)</td>
                <td className="px-6 py-4 text-center"><XCircle className="w-6 h-6 text-gray-300 mx-auto" /></td>
                <td className="px-6 py-4 text-center bg-blue-50 text-gray-700">Simples</td>
                <td className="px-6 py-4 text-center text-gray-700">Completa</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-700">Painel administrativo</td>
                <td className="px-6 py-4 text-center"><XCircle className="w-6 h-6 text-gray-300 mx-auto" /></td>
                <td className="px-6 py-4 text-center bg-blue-50"><XCircle className="w-6 h-6 text-gray-300 mx-auto" /></td>
                <td className="px-6 py-4 text-center"><CheckCircle className="w-6 h-6 text-green-500 mx-auto" /></td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-700">Integração com pagamentos</td>
                <td className="px-6 py-4 text-center"><XCircle className="w-6 h-6 text-gray-300 mx-auto" /></td>
                <td className="px-6 py-4 text-center bg-blue-50"><XCircle className="w-6 h-6 text-gray-300 mx-auto" /></td>
                <td className="px-6 py-4 text-center text-gray-700">Opcional</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-700">Relatórios e automações</td>
                <td className="px-6 py-4 text-center"><XCircle className="w-6 h-6 text-gray-300 mx-auto" /></td>
                <td className="px-6 py-4 text-center bg-blue-50"><XCircle className="w-6 h-6 text-gray-300 mx-auto" /></td>
                <td className="px-6 py-4 text-center"><CheckCircle className="w-6 h-6 text-green-500 mx-auto" /></td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-700">Treinamento para uso</td>
                <td className="px-6 py-4 text-center"><XCircle className="w-6 h-6 text-gray-300 mx-auto" /></td>
                <td className="px-6 py-4 text-center bg-blue-50"><XCircle className="w-6 h-6 text-gray-300 mx-auto" /></td>
                <td className="px-6 py-4 text-center"><CheckCircle className="w-6 h-6 text-green-500 mx-auto" /></td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-700 font-semibold">Suporte técnico</td>
                <td className="px-6 py-4 text-center text-gray-700">1 mês</td>
                <td className="px-6 py-4 text-center text-gray-700 bg-blue-50">3 meses</td>
                <td className="px-6 py-4 text-center text-gray-700">6 meses</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-700 font-semibold">Prazo de entrega</td>
                <td className="px-6 py-4 text-center text-gray-700">7-10 dias</td>
                <td className="px-6 py-4 text-center text-gray-700 bg-blue-50">15-20 dias</td>
                <td className="px-6 py-4 text-center text-gray-700">30-45 dias</td>
              </tr>
              </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Serviços Adicionais */}
        <div className="additional-services">
          <h2 className="section-title">Serviços Adicionais</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>Domínio .com.br</h3>
              <p className="service-price">R$ 50<span className="service-period">/ano</span></p>
              <p className="service-description">Registro e configuração do seu domínio profissional</p>
            </div>
            <div className="service-card">
              <h3>SEO Inicial</h3>
              <p className="service-price">R$ 300</p>
              <p className="service-description">Otimização para mecanismos de busca e Google My Business</p>
            </div>
            <div className="service-card">
              <h3>Criação de Conteúdo</h3>
              <p className="service-price">R$ 200-600<span className="service-period">/página</span></p>
              <p className="service-description">Textos profissionais escritos por especialistas</p>
            </div>
            <div className="service-card">
              <h3>Manutenção Mensal</h3>
              <p className="service-price">R$ 200<span className="service-period">/mês</span></p>
              <p className="service-description">Atualizações, backup e suporte contínuo</p>
            </div>
          </div>
        </div>

        {/* Detalhes dos Planos */}
        <div className="plan-details">
          {/* Plano Básico */}
          <div className="plan-detail-card">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Site Inicial</h3>
              <p className="text-gray-600 text-lg">Plano Básico</p>
            </div>
            <div className="text-4xl font-bold text-blue-600 mt-4 md:mt-0">R$ 2.000</div>
          </div>
          <p className="text-gray-700 mb-6">
            Ideal para profissionais que estão começando e precisam de uma presença online profissional. 
            Inclui as páginas essenciais e formulário de contato para começar a receber clientes imediatamente.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Incluído:</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Home, Sobre, Serviços e Contato</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Formulário de agendamento simples</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>100% responsivo para mobile</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Ideal para:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Eletricistas autônomos</li>
                <li>• Fisioterapeutas iniciantes</li>
                <li>• Pequenos consultórios</li>
                <li>• Prestadores de serviços locais</li>
              </ul>
            </div>
          </div>
        </div>

          {/* Plano Intermediário */}
          <div className="plan-detail-card featured-plan">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Profissional</h3>
              <p className="text-gray-600 text-lg">Plano Intermediário</p>
            </div>
            <div className="text-4xl font-bold text-blue-600 mt-4 md:mt-0">R$ 5.000</div>
          </div>
          <p className="text-gray-700 mb-6">
            Para profissionais estabelecidos que querem automatizar agendamentos e ter mais controle sobre seus clientes. 
            Inclui sistema completo de agendamento com notificações automáticas.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Incluído:</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Até 8 páginas + galeria de fotos</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Sistema de agendamento com calendário</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Lembretes automáticos por e-mail e WhatsApp</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Área de login para cliente e administrador</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Integração com Firestore e Storage</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Ideal para:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Clínicas de fisioterapia</li>
                <li>• Empresas de serviços elétricos</li>
                <li>• Consultórios estabelecidos</li>
                <li>• Profissionais com equipe</li>
              </ul>
            </div>
          </div>
        </div>

          {/* Plano Premium */}
          <div className="plan-detail-card">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Gestão Completa</h3>
              <p className="text-gray-600 text-lg">Plano Premium</p>
            </div>
            <div className="text-4xl font-bold text-blue-600 mt-4 md:mt-0">R$ 9.000</div>
          </div>
          <p className="text-gray-700 mb-6">
            Solução completa para profissionais que querem total controle e automação do negócio. 
            Inclui painel administrativo completo, pagamentos online e relatórios detalhados.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Incluído:</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Todas as funcionalidades do Profissional</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Painel administrativo completo</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Integração com pagamentos online (opcional)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Automação de lembretes (e-mail/SMS)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Relatórios mensais automatizados</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Treinamento completo para uso do painel</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Ideal para:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Clínicas com múltiplos profissionais</li>
                <li>• Empresas de médio porte</li>
                <li>• Negócios que precisam de relatórios</li>
                <li>• Profissionais que querem automação total</li>
              </ul>
            </div>
          </div>
          </div>
        </div>

        {/* Formas de Pagamento */}
        <div className="payment-methods">
          <h2>Formas de Pagamento</h2>
          <div className="payment-grid">
            <div className="payment-item">
              <div className="payment-icon">50%</div>
              <h3>Entrada</h3>
              <p>Na contratação do serviço</p>
            </div>
            <div className="payment-item">
              <div className="payment-icon">50%</div>
              <h3>Final</h3>
              <p>Na entrega do site completo</p>
            </div>
            <div className="payment-item">
              <div className="payment-icon">3x</div>
              <h3>Parcelamento</h3>
              <p>Sem juros para projetos acima de R$ 5.000</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="planos-cta">
          <h2>Pronto para começar?</h2>
          <p>
            Solicite um orçamento personalizado e receba uma proposta em até 48 horas
          </p>
          <Link 
            to="/orcamento"
            className="cta-button-primary"
          >
            Solicitar Orçamento Agora
          </Link>
        </div>
      </div>

      {/* Calculadora de Preços */}
      <CalculadoraPrecos />
    </div>
  );
};

export default Planos;

