import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../style/FAQ.css';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('todos');
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqs = [
    {
      categoria: 'geral',
      pergunta: 'Quanto tempo leva para criar um site?',
      resposta: 'O prazo varia conforme o plano escolhido: Básico (7-10 dias), Profissional (15-20 dias) e Premium (30-45 dias). Todos os prazos são em dias úteis e começam a contar após a aprovação do projeto e recebimento de todos os materiais necessários.'
    },
    {
      categoria: 'geral',
      pergunta: 'Preciso fornecer o conteúdo (textos e fotos)?',
      resposta: 'Idealmente sim, pois você conhece melhor seu negócio e pode fornecer informações autênticas. No entanto, oferecemos serviço de criação de conteúdo profissional como adicional (R$ 200-600 por página) caso você precise de ajuda.'
    },
    {
      categoria: 'geral',
      pergunta: 'Preciso ter conhecimento técnico para gerenciar o site?',
      resposta: 'Não! Criamos sites fáceis de usar com painel administrativo intuitivo. Para os planos que incluem painel admin, fornecemos treinamento completo. Além disso, você terá acesso a manual de uso e suporte técnico.'
    },
    {
      categoria: 'pagamento',
      pergunta: 'Como funciona o pagamento?',
      resposta: 'Trabalhamos com 50% de entrada na contratação e 50% na entrega do site. Para projetos acima de R$ 5.000, oferecemos parcelamento em até 3x sem juros. Aceitamos PIX, transferência bancária e boleto.'
    },
    {
      categoria: 'pagamento',
      pergunta: 'O que está incluso no valor do plano?',
      resposta: 'Cada plano inclui: desenvolvimento completo do site, design responsivo, hospedagem Firebase, SSL (segurança), otimização básica de SEO, período de suporte técnico e treinamento (conforme o plano). Domínio e serviços adicionais são cobrados à parte.'
    },
    {
      categoria: 'pagamento',
      pergunta: 'Posso cancelar o projeto após iniciar?',
      resposta: 'Sim, mas o valor já pago (entrada de 50%) não é reembolsável, pois o trabalho já foi iniciado. Se o cancelamento ocorrer antes do início do desenvolvimento, devolvemos 80% do valor pago.'
    },
    {
      categoria: 'tecnico',
      pergunta: 'O site será meu? Posso migrar para outro servidor?',
      resposta: 'Sim! Após a conclusão e pagamento integral, você terá propriedade completa do código-fonte. Pode migrar para qualquer servidor que desejar, e podemos ajudar nesse processo se necessário.'
    },
    {
      categoria: 'tecnico',
      pergunta: 'O site funcionará em celulares e tablets?',
      resposta: 'Sim! Todos os nossos sites são 100% responsivos, ou seja, se adaptam automaticamente a qualquer tamanho de tela (desktop, tablet e smartphone) mantendo a funcionalidade e beleza do design.'
    },
    {
      categoria: 'tecnico',
      pergunta: 'Vocês usam WordPress?',
      resposta: 'Não. Utilizamos tecnologias modernas como React e Firebase, que oferecem melhor performance, segurança e escalabilidade. Sites desenvolvidos com essas tecnologias são mais rápidos e menos vulneráveis a ataques.'
    },
    {
      categoria: 'tecnico',
      pergunta: 'O que é hospedagem Firebase?',
      resposta: 'Firebase é uma plataforma do Google que oferece hospedagem rápida e segura. O plano Spark (gratuito) atende a maioria dos sites pequenos e médios. Conforme seu site cresce, podemos migrar para planos pagos conforme a necessidade.'
    },
    {
      categoria: 'funcionalidades',
      pergunta: 'Posso adicionar funcionalidades depois do site pronto?',
      resposta: 'Sim! Oferecemos serviços de expansão e novas funcionalidades após a entrega. Faremos um orçamento específico baseado no que você precisa adicionar.'
    },
    {
      categoria: 'funcionalidades',
      pergunta: 'O sistema de agendamento envia lembretes automáticos?',
      resposta: 'Sim! Nos planos Profissional e Premium, incluímos lembretes automáticos por e-mail e WhatsApp. Os clientes recebem confirmação ao agendar e lembretes antes da consulta.'
    },
    {
      categoria: 'funcionalidades',
      pergunta: 'Posso integrar com sistema de pagamento online?',
      resposta: 'Sim! No plano Premium oferecemos integração com gateways de pagamento como Stripe, PagSeguro ou Mercado Pago. Há custos adicionais das próprias plataformas de pagamento (taxas por transação).'
    },
    {
      categoria: 'funcionalidades',
      pergunta: 'O site terá área do cliente?',
      resposta: 'Sim, nos planos Profissional (área simples) e Premium (área completa). Os clientes podem fazer login, ver histórico de agendamentos, fazer novos agendamentos e acessar informações personalizadas.'
    },
    {
      categoria: 'suporte',
      pergunta: 'O que está incluso no suporte técnico?',
      resposta: 'O suporte inclui: correção de bugs, ajustes de conteúdo, esclarecimento de dúvidas sobre o uso, pequenas modificações e atualizações de segurança. Não inclui desenvolvimento de novas funcionalidades ou redesign completo.'
    },
    {
      categoria: 'suporte',
      pergunta: 'E depois que o período de suporte acabar?',
      resposta: 'Oferecemos plano de manutenção mensal por R$ 200/mês, que inclui suporte contínuo, atualizações, backup, monitoramento e pequenos ajustes. Você também pode contratar suporte pontual quando necessário.'
    },
    {
      categoria: 'suporte',
      pergunta: 'Como funciona o treinamento?',
      resposta: 'Para o plano Premium, oferecemos treinamento completo via videoconferência, onde ensinamos a usar todas as funcionalidades do painel administrativo. Também fornecemos manual de uso detalhado e vídeos tutoriais.'
    },
    {
      categoria: 'seo',
      pergunta: 'O site ficará no Google?',
      resposta: 'Sim! Fazemos a configuração inicial de SEO (otimização para mecanismos de busca) e submissão ao Google. No entanto, aparecer nas primeiras posições depende de fatores como concorrência, conteúdo de qualidade e tempo.'
    },
    {
      categoria: 'seo',
      pergunta: 'O que é SEO e preciso contratar?',
      resposta: 'SEO é a otimização do seu site para aparecer melhor no Google. Todos os planos incluem SEO básico. Oferecemos SEO inicial mais completo por R$ 300 (configuração de Google My Business, meta tags avançadas, sitemap, etc).'
    },
    {
      categoria: 'dominio',
      pergunta: 'Preciso comprar um domínio?',
      resposta: 'Recomendamos fortemente ter um domínio próprio (.com.br) pois passa mais profissionalismo. Oferecemos registro e configuração por R$ 50/ano. Sem domínio próprio, seu site ficará em um subdomínio do Firebase.'
    },
    {
      categoria: 'dominio',
      pergunta: 'Já tenho um domínio, podem usar?',
      resposta: 'Sim! Podemos configurar o site no seu domínio existente. Você precisará nos dar acesso temporário para fazer as configurações de DNS. Fazemos isso sem custo adicional.'
    }
  ];

  const categorias = [
    { id: 'todos', nome: 'Todas' },
    { id: 'geral', nome: 'Geral' },
    { id: 'pagamento', nome: 'Pagamento' },
    { id: 'tecnico', nome: 'Técnico' },
    { id: 'funcionalidades', nome: 'Funcionalidades' },
    { id: 'suporte', nome: 'Suporte' },
    { id: 'seo', nome: 'SEO' },
    { id: 'dominio', nome: 'Domínio' }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchCategory = activeCategory === 'todos' || faq.categoria === activeCategory;
    const matchSearch = searchTerm === '' || 
      faq.pergunta.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.resposta.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-container">
        {/* Header */}
        <div className="faq-header">
          <h1>Perguntas Frequentes</h1>
          <p>
            Tire suas dúvidas sobre nossos serviços, prazos, pagamentos e muito mais
          </p>
        </div>

        {/* Busca */}
        <div className="faq-search">
          <div className="search-wrapper">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Buscar perguntas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Categorias */}
        <div className="faq-categories">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`category-button ${
                activeCategory === cat.id ? 'active' : ''
              }`}
            >
              {cat.nome}
            </button>
          ))}
        </div>

        {/* Lista de FAQs */}
        <div className="faq-list">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openQuestion === index ? 'open' : ''}`}
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="faq-question"
              >
                <span className="question-text">{faq.pergunta}</span>
                <div className="question-icon">
                  {openQuestion === index ? (
                    <ChevronUp />
                  ) : (
                    <ChevronDown />
                  )}
                </div>
              </button>
              
              <div className={`faq-answer ${openQuestion === index ? 'open' : ''}`}>
                <div className="answer-content">
                  <p>{faq.resposta}</p>
                </div>
              </div>
            </div>
          ))}

          {filteredFaqs.length === 0 && (
            <div className="no-results">
              <p>Nenhuma pergunta encontrada com esses critérios.</p>
            </div>
          )}
        </div>

        {/* Não encontrou resposta */}
        <div className="faq-cta">
          <h2>Não encontrou sua resposta?</h2>
          <p>
            Entre em contato conosco e teremos prazer em esclarecer suas dúvidas!
          </p>
          <div className="cta-buttons">
            <Link
              to="/contato"
              className="cta-button-primary"
            >
              Entrar em Contato
            </Link>
            <Link
              to="/orcamento"
              className="cta-button-secondary"
            >
              Solicitar Orçamento
            </Link>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="faq-additional-info">
          <div className="info-card">
            <div className="info-icon">💬</div>
            <h3>WhatsApp</h3>
            <p>Resposta rápida via chat</p>
          </div>
          <div className="info-card">
            <div className="info-icon">📧</div>
            <h3>E-mail</h3>
            <p>Envie suas dúvidas detalhadas</p>
          </div>
          <div className="info-card">
            <div className="info-icon">🤖</div>
            <h3>Chatbot</h3>
            <p>Assistente virtual 24/7</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

