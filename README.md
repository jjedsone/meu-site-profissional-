# WebPro Sites - Plataforma de Criação de Sites Profissionais

Um site moderno e profissional para venda de serviços de criação de sites para profissionais de todas as áreas.

## 🚀 Características

- **Design Moderno e Responsivo**: Interface elegante que funciona perfeitamente em todos os dispositivos
- **Formulário Inteligente**: Sistema de orçamento com múltiplas etapas e validação
- **Chatbot Integrado**: Assistente virtual para atendimento ao cliente
- **Sistema de Navegação Completo**: Páginas de Planos, Portfólio, Como Funciona, FAQ e mais
- **Otimizado para Conversão**: Design focado em transformar visitantes em clientes

## 📋 Estrutura do Site

### Páginas Principais

1. **Home** (`/`)
   - Apresentação dos serviços
   - Visão geral dos planos
   - Processo de trabalho
   - Call-to-actions estratégicos

2. **Planos** (`/planos`)
   - Tabela comparativa detalhada
   - Três planos: Básico (R$ 2.000), Profissional (R$ 5.000) e Premium (R$ 9.000)
   - Serviços adicionais
   - Formas de pagamento

3. **Portfólio** (`/portfolio`)
   - Exemplos de projetos por área profissional
   - Filtro por categoria (Saúde, Jurídico, Consultoria, etc.)
   - Demonstração de funcionalidades

4. **Como Funciona** (`/como-funciona`)
   - Processo passo a passo (7 etapas)
   - Prazos de entrega
   - Diferenciais do serviço
   - FAQ resumido

5. **Solicitar Orçamento** (`/orcamento`)
   - Formulário inteligente com 4 etapas
   - Validação em tempo real
   - Barra de progresso
   - Resumo do pedido

6. **FAQ** (`/faq`)
   - Perguntas frequentes organizadas por categoria
   - Sistema de busca
   - Filtros por categoria

7. **Contato** (`/contato`)
   - Formulário de contato
   - Informações de contato

## 🛠️ Tecnologias Utilizadas

- **React** 19.1.0
- **React Router DOM** 7.6.3
- **Tailwind CSS** 4.1.11
- **Lucide React** (ícones)
- **React Icons**

## 📦 Instalação e Execução

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Passos

1. Clone o repositório:
```bash
cd meu-curriculo-main
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm start
```

4. Acesse no navegador:
```
http://localhost:3000
```

## 🏗️ Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `build/`.

## 📱 Componentes Principais

### Navbar
- Navegação responsiva com menu mobile
- Links para todas as páginas principais
- Botão CTA destacado

### Chatbot
- Assistente virtual flutuante
- Respostas automáticas baseadas em palavras-chave
- Integração com o formulário de orçamento
- Botões de resposta rápida

### Footer
- Links organizados por categoria
- Informações de contato
- Links para redes sociais
- Status do sistema

## 🎨 Planos Oferecidos

### Plano Básico - R$ 2.000
- Até 4 páginas
- Formulário de agendamento simples
- Design responsivo
- Firebase Hosting
- 1 mês de suporte

### Plano Profissional - R$ 5.000
- Até 8 páginas + galeria
- Sistema de agendamento com calendário
- Lembretes por e-mail/WhatsApp
- Área de login
- 3 meses de suporte

### Plano Premium - R$ 9.000
- Funcionalidades do Profissional
- Painel administrativo completo
- Integração com pagamentos
- Automação de lembretes
- Relatórios mensais
- Treinamento + 6 meses de suporte

## 💰 Serviços Adicionais

- Domínio .com.br: R$ 50/ano
- SEO Inicial: R$ 300
- Criação de Conteúdo: R$ 200-600/página
- Manutenção Mensal: R$ 200/mês

## 🚀 Funcionalidades Futuras

- [ ] Integração real com Firebase
- [ ] Sistema de pagamento online
- [ ] Área do cliente (painel)
- [ ] Blog com CMS
- [ ] Depoimentos de clientes
- [ ] Galeria de projetos real
- [ ] Sistema de tickets de suporte
- [ ] Integração com WhatsApp Business API
- [ ] Analytics e relatórios

## 📝 Personalizações

### Cores Principais
- Azul primário: `#2563eb`
- Azul escuro: `#1e40af`
- Verde sucesso: `#10b981`
- Cinza: `#6b7280`

### Fontes
- Sistema padrão: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto`

## 🔧 Configuração

### Variáveis de Ambiente (futuro)
Crie um arquivo `.env` na raiz do projeto:

```env
REACT_APP_FIREBASE_API_KEY=sua_chave_aqui
REACT_APP_FIREBASE_AUTH_DOMAIN=seu_dominio_aqui
REACT_APP_FIREBASE_PROJECT_ID=seu_projeto_aqui
REACT_APP_EMAIL_SERVICE=seu_servico_email
```

## 📄 Licença

Este projeto é privado e proprietário. Todos os direitos reservados.

## 👨‍💻 Desenvolvimento

Para contribuir ou fazer melhorias:

1. Crie uma branch para sua feature
2. Faça commit das mudanças
3. Push para a branch
4. Abra um Pull Request

## 📞 Contato

- **E-mail**: contato@webprosites.com
- **Telefone**: (11) 99999-9999
- **Localização**: São Paulo, SP

## 🎯 Próximos Passos

1. **Backend**:
   - Implementar Firebase Functions
   - Configurar Firestore para armazenar orçamentos
   - Implementar autenticação de usuários

2. **Integrações**:
   - WhatsApp Business API
   - SendGrid ou Mailgun para e-mails
   - Stripe/PagSeguro para pagamentos

3. **SEO**:
   - Configurar meta tags dinâmicas
   - Implementar sitemap.xml
   - Google Analytics
   - Google Search Console

4. **Performance**:
   - Lazy loading de imagens
   - Code splitting
   - Cache otimizado
   - CDN para assets

---

Desenvolvido com ❤️ para profissionais que querem crescer online
