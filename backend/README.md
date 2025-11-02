# 🚀 Backend API - WebPro Sites

Backend completo para gerenciar orçamentos, mensagens, projetos e configurações do site WebPro Sites.

## 📋 **Funcionalidades**

- ✅ API REST completa
- ✅ Autenticação JWT para admin
- ✅ CRUD de Orçamentos
- ✅ CRUD de Mensagens de Contato
- ✅ CRUD de Projetos do Portfólio
- ✅ CRUD de Depoimentos
- ✅ Gerenciamento de Configurações (cores)
- ✅ Validação de dados
- ✅ Segurança (Helmet, CORS)
- ✅ Armazenamento em arquivos JSON (fácil migrar para MongoDB/PostgreSQL)

## 🛠️ **Tecnologias**

- **Node.js** + **Express**
- **JWT** para autenticação
- **bcryptjs** para hash de senhas
- **express-validator** para validação
- **Helmet** para segurança
- **CORS** para permitir acesso do frontend

## 📦 **Instalação**

```bash
# Entrar na pasta do backend
cd backend

# Instalar dependências
npm install

# Copiar arquivo de exemplo de variáveis de ambiente
cp .env.example .env

# Editar .env com suas configurações
```

## ⚙️ **Configuração**

Edite o arquivo `.env`:

```env
PORT=5000
JWT_SECRET=sua_chave_secreta_aqui
ADMIN_USERNAME=admin
ADMIN_PASSWORD=sua_senha_segura
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

**⚠️ IMPORTANTE:** 
- Altere `JWT_SECRET` para uma chave segura (use: `openssl rand -base64 32`)
- Altere `ADMIN_PASSWORD` para uma senha forte!

## 🚀 **Executar**

```bash
# Modo desenvolvimento (com hot reload)
npm run dev

# Modo produção
npm start
```

O servidor estará rodando em: `http://localhost:5000`

## 📡 **Endpoints da API**

### **Autenticação**
- `POST /api/auth/login` - Login do admin
- `POST /api/auth/verify` - Verificar token
- `POST /api/auth/logout` - Logout

### **Orçamentos**
- `GET /api/orcamentos` - Listar orçamentos (admin)
- `GET /api/orcamentos/:id` - Obter orçamento (admin)
- `POST /api/orcamentos` - Criar orçamento (público)
- `PATCH /api/orcamentos/:id` - Atualizar status (admin)
- `DELETE /api/orcamentos/:id` - Deletar orçamento (admin)

### **Mensagens**
- `GET /api/mensagens` - Listar mensagens (admin)
- `GET /api/mensagens/:id` - Obter mensagem (admin)
- `POST /api/mensagens` - Criar mensagem (público)
- `PATCH /api/mensagens/:id` - Atualizar status (admin)
- `DELETE /api/mensagens/:id` - Deletar mensagem (admin)

### **Projetos**
- `GET /api/projetos` - Listar projetos (público)
- `GET /api/projetos/:id` - Obter projeto (público)
- `POST /api/projetos` - Criar projeto (admin)
- `PUT /api/projetos/:id` - Atualizar projeto (admin)
- `PATCH /api/projetos/:id` - Atualizar parcial (admin)
- `DELETE /api/projetos/:id` - Deletar projeto (admin)

### **Depoimentos**
- `GET /api/depoimentos` - Listar depoimentos (público)
- `GET /api/depoimentos/:id` - Obter depoimento (público)
- `POST /api/depoimentos` - Criar depoimento (admin)
- `PUT /api/depoimentos/:id` - Atualizar depoimento (admin)
- `DELETE /api/depoimentos/:id` - Deletar depoimento (admin)

### **Configurações**
- `GET /api/config/cores` - Obter cores (público)
- `PUT /api/config/cores` - Atualizar cores (admin)

## 🔐 **Autenticação**

### **Login**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Resposta:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
```

### **Usar Token**
Adicione no header de todas as requisições que precisam de autenticação:
```
Authorization: Bearer seu_token_aqui
```

## 📊 **Estrutura de Dados**

Os dados são armazenados em arquivos JSON na pasta `backend/data/`:
- `orcamentos.json` - Orçamentos solicitados
- `mensagens.json` - Mensagens de contato
- `projetos.json` - Projetos do portfólio
- `depoimentos.json` - Depoimentos de clientes
- `config.json` - Configurações do site

**⚠️ Em produção, migre para MongoDB, PostgreSQL, etc.**

## 🔄 **Migração do Frontend**

Para usar o backend no frontend:

1. Instale axios no frontend:
```bash
npm install axios
```

2. Crie um arquivo `src/services/api.js`:
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Adicionar token nas requisições
api.interceptors.request.use(config => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

3. Substitua chamadas de `localStorage` por chamadas à API.

## 🚀 **Deploy**

### **Opção 1: Heroku**
```bash
heroku create webpro-backend
git push heroku main
```

### **Opção 2: Railway**
1. Conecte seu repositório
2. Configure variáveis de ambiente
3. Deploy automático!

### **Opção 3: VPS (Ubuntu)**
```bash
# Instalar PM2
npm install -g pm2

# Iniciar servidor
pm2 start server.js --name webpro-backend

# Salvar configuração
pm2 save
```

## 📝 **Próximos Passos**

1. Migrar armazenamento para MongoDB/PostgreSQL
2. Implementar rate limiting
3. Adicionar logs estruturados
4. Implementar testes automatizados
5. Adicionar documentação Swagger

## 🐛 **Troubleshooting**

**Erro: "Token inválido"**
- Verifique se o token está sendo enviado no header
- Verifique se o JWT_SECRET está configurado corretamente

**Erro: "CORS"**
- Verifique se CORS_ORIGIN está configurado corretamente
- Verifique se o frontend está na URL permitida

**Dados não persistem**
- Verifique se a pasta `backend/data/` existe
- Verifique permissões de escrita na pasta

---

**Desenvolvido com ❤️ para WebPro Sites**

