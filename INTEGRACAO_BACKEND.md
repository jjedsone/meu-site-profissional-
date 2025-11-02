# 🔌 Como Integrar o Backend com o Frontend

## 📋 **Passos para Integração**

### **1. Instalar Dependências do Backend**

```bash
cd backend
npm install
```

### **2. Configurar Variáveis de Ambiente**

Crie o arquivo `.env` na pasta `backend/`:

```env
PORT=5000
JWT_SECRET=sua_chave_secreta_super_segura_aqui
ADMIN_USERNAME=admin
ADMIN_PASSWORD=sua_senha_segura
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

**⚠️ IMPORTANTE:**
- Gere uma chave segura para `JWT_SECRET`: `openssl rand -base64 32`
- Altere `ADMIN_PASSWORD` para uma senha forte!

### **3. Instalar Axios no Frontend**

```bash
cd ..  # Voltar para raiz do projeto
npm install axios
```

### **4. Criar Serviço de API no Frontend**

Crie o arquivo `src/services/api.js`:

```javascript
import axios from 'axios';

// Criar instância do axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token nas requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido ou expirado
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_username');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### **5. Criar Serviços para Cada Entidade**

#### **Orçamentos (`src/services/orcamentos.js`)**

```javascript
import api from './api';

export const orcamentosService = {
  // Listar todos (admin)
  listar: async (filters = {}) => {
    const { data } = await api.get('/orcamentos', { params: filters });
    return data;
  },

  // Obter por ID (admin)
  obter: async (id) => {
    const { data } = await api.get(`/orcamentos/${id}`);
    return data;
  },

  // Criar novo (público)
  criar: async (orcamento) => {
    const { data } = await api.post('/orcamentos', orcamento);
    return data;
  },

  // Atualizar status (admin)
  atualizarStatus: async (id, status) => {
    const { data } = await api.patch(`/orcamentos/${id}`, { status });
    return data;
  },

  // Deletar (admin)
  deletar: async (id) => {
    const { data } = await api.delete(`/orcamentos/${id}`);
    return data;
  }
};
```

#### **Mensagens (`src/services/mensagens.js`)**

```javascript
import api from './api';

export const mensagensService = {
  listar: async (filters = {}) => {
    const { data } = await api.get('/mensagens', { params: filters });
    return data;
  },

  obter: async (id) => {
    const { data } = await api.get(`/mensagens/${id}`);
    return data;
  },

  criar: async (mensagem) => {
    const { data } = await api.post('/mensagens', mensagem);
    return data;
  },

  atualizarStatus: async (id, status) => {
    const { data } = await api.patch(`/mensagens/${id}`, { status });
    return data;
  },

  deletar: async (id) => {
    const { data } = await api.delete(`/mensagens/${id}`);
    return data;
  }
};
```

#### **Projetos (`src/services/projetos.js`)**

```javascript
import api from './api';

export const projetosService = {
  listar: async (filters = {}) => {
    const { data } = await api.get('/projetos', { params: filters });
    return data;
  },

  obter: async (id) => {
    const { data } = await api.get(`/projetos/${id}`);
    return data;
  },

  criar: async (projeto) => {
    const { data } = await api.post('/projetos', projeto);
    return data;
  },

  atualizar: async (id, projeto) => {
    const { data } = await api.put(`/projetos/${id}`, projeto);
    return data;
  },

  deletar: async (id) => {
    const { data } = await api.delete(`/projetos/${id}`);
    return data;
  }
};
```

#### **Depoimentos (`src/services/depoimentos.js`)**

```javascript
import api from './api';

export const depoimentosService = {
  listar: async (filters = {}) => {
    const { data } = await api.get('/depoimentos', { params: filters });
    return data;
  },

  obter: async (id) => {
    const { data } = await api.get(`/depoimentos/${id}`);
    return data;
  },

  criar: async (depoimento) => {
    const { data } = await api.post('/depoimentos', depoimento);
    return data;
  },

  atualizar: async (id, depoimento) => {
    const { data } = await api.put(`/depoimentos/${id}`, depoimento);
    return data;
  },

  deletar: async (id) => {
    const { data } = await api.delete(`/depoimentos/${id}`);
    return data;
  }
};
```

#### **Auth (`src/services/auth.js`)**

```javascript
import api from './api';

export const authService = {
  login: async (username, password) => {
    const { data } = await api.post('/auth/login', { username, password });
    
    if (data.success) {
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_username', data.user.username);
    }
    
    return data;
  },

  verify: async () => {
    const { data } = await api.post('/auth/verify');
    return data;
  },

  logout: async () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
    await api.post('/auth/logout');
  }
};
```

#### **Config (`src/services/config.js`)**

```javascript
import api from './api';

export const configService = {
  obterCores: async () => {
    const { data } = await api.get('/config/cores');
    return data;
  },

  atualizarCores: async (cores) => {
    const { data } = await api.put('/config/cores', cores);
    return data;
  }
};
```

### **6. Atualizar Login Admin**

Em `src/pages/admin/Login.js`, substitua a lógica de autenticação:

```javascript
import { authService } from '../../services/auth';
import { toast } from '../../utils/toast';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await authService.login(username, password);
    
    if (response.success) {
      toast.success('Login realizado com sucesso!');
      navigate('/admin/dashboard');
    } else {
      toast.error(response.error || 'Credenciais inválidas');
    }
  } catch (error) {
    toast.error('Erro ao fazer login. Tente novamente.');
  }
};
```

### **7. Atualizar Formulário de Orçamento**

Em `src/page/Orcamento.js`, substitua o localStorage por API:

```javascript
import { orcamentosService } from '../services/orcamentos';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validação...
  
  try {
    const response = await orcamentosService.criar(formData);
    
    if (response.success) {
      toast.success(response.message);
      // Reset form...
    }
  } catch (error) {
    toast.error('Erro ao enviar orçamento. Tente novamente.');
  }
};
```

### **8. Atualizar Formulário de Contato**

Em `src/page/Contato.js`:

```javascript
import { mensagensService } from '../services/mensagens';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validação...
  
  try {
    const response = await mensagensService.criar(formData);
    
    if (response.success) {
      toast.success(response.message);
      setEnviado(true);
      // Reset form...
    }
  } catch (error) {
    toast.error('Erro ao enviar mensagem. Tente novamente.');
  }
};
```

### **9. Atualizar Dashboard Admin**

Em `src/pages/admin/Dashboard.js`, substitua localStorage por API:

```javascript
import { orcamentosService } from '../../services/orcamentos';
import { mensagensService } from '../../services/mensagens';
import { projetosService } from '../../services/projetos';
import { configService } from '../../services/config';

// Carregar dados
useEffect(() => {
  const carregarDados = async () => {
    try {
      const [orcamentos, mensagens, projetos, cores] = await Promise.all([
        orcamentosService.listar(),
        mensagensService.listar(),
        projetosService.listar(),
        configService.obterCores()
      ]);
      
      setOrcamentos(orcamentos.data || []);
      setMensagens(mensagens.data || []);
      setProjects(projetos.data || []);
      setCores(cores.data || cores);
    } catch (error) {
      toast.error('Erro ao carregar dados');
    }
  };
  
  carregarDados();
}, []);
```

### **10. Adicionar Variável de Ambiente no Frontend**

Crie `.env` na raiz do projeto React:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🚀 **Executar**

### **Terminal 1 - Backend**
```bash
cd backend
npm run dev
```

### **Terminal 2 - Frontend**
```bash
npm start
```

## ✅ **Testar API**

### **Teste de Health Check**
```bash
curl http://localhost:5000/api/health
```

### **Teste de Login**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### **Teste de Criar Orçamento**
```bash
curl -X POST http://localhost:5000/api/orcamentos \
  -H "Content-Type: application/json" \
  -d '{
    "nomeCompleto": "João Silva",
    "email": "joao@email.com",
    "telefone": "(11) 99999-9999",
    "profissao": "Dentista"
  }'
```

## 🐛 **Problemas Comuns**

**Erro: "Network Error"**
- Verifique se o backend está rodando
- Verifique se a porta está correta (5000)
- Verifique CORS_ORIGIN no .env

**Erro: "401 Unauthorized"**
- Verifique se o token está sendo enviado
- Verifique se o token não expirou (24h)

**Erro: "CORS"**
- Verifique se CORS_ORIGIN no backend está correto
- Verifique se o frontend está na URL permitida

---

**Pronto! Backend integrado! 🎉**

