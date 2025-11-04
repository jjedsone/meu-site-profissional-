# 📧 Configuração de Notificação por Email

## Como configurar as notificações de tentativa de login

Quando alguém tentar acessar o admin, você receberá um email em **jjedsone@gmail.com**.

### Opção 1: Usando EmailJS (Recomendado)

1. **Criar conta no EmailJS:**
   - Acesse: https://www.emailjs.com/
   - Crie uma conta gratuita (até 200 emails/mês)

2. **Configurar serviço de email:**
   - Vá em "Email Services"
   - Adicione um serviço (Gmail, Outlook, etc.)
   - Siga as instruções para conectar sua conta

3. **Criar template de email:**
   - Vá em "Email Templates"
   - Clique em "Create New Template"
   - Use este template:
   ```
   Assunto: Tentativa de Acesso ao Admin - {{subject}}
   
   Mensagem:
   Uma tentativa de acesso ao painel administrativo foi detectada:
   
   Email: {{from_email}}
   IP: {{ip}}
   User Agent: {{user_agent}}
   Data/Hora: {{timestamp}}
   
   Acesse o painel para verificar esta tentativa.
   ```

4. **Obter credenciais:**
   - Vá em "Account" > "General"
   - Copie: Public Key, Service ID, Template ID

5. **Configurar no projeto:**
   - Crie um arquivo `.env` na raiz do projeto:
   ```env
   REACT_APP_EMAILJS_SERVICE_ID=seu_service_id
   REACT_APP_EMAILJS_TEMPLATE_ID=seu_template_id
   REACT_APP_EMAILJS_PUBLIC_KEY=sua_public_key
   ```

### Opção 2: Usando Webhook (Formspree)

1. **Criar conta no Formspree:**
   - Acesse: https://formspree.io/
   - Crie uma conta gratuita

2. **Criar formulário:**
   - Crie um novo formulário
   - Configure o email de destino: jjedsone@gmail.com
   - Copie o endpoint do formulário

3. **Configurar no projeto:**
   - Adicione no arquivo `.env`:
   ```env
   REACT_APP_WEBHOOK_URL=https://formspree.io/f/seu_form_id
   ```

### Opção 3: Usando Firebase Functions (Avançado)

Se você preferir usar Firebase Functions para enviar emails:

1. Instale Firebase CLI: `npm install -g firebase-tools`
2. Crie uma função no Firebase que envia emails
3. Configure o endpoint no código

## Teste

Após configurar, qualquer tentativa de login no admin enviará um email para **jjedsone@gmail.com** com:
- Email usado na tentativa
- IP do usuário
- User Agent (navegador)
- Data e hora

## Link Secreto para Admin

Um pequeno ponto discreto aparece no canto inferior direito do site. Clique nele para acessar o admin sem que ninguém desconfie.

