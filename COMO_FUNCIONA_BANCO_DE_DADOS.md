# 📊 Como Funciona o Sistema de Dados

## 🎯 **Resumo**

Atualmente, o projeto **NÃO usa um banco de dados tradicional**. Em vez disso, utiliza o **localStorage do navegador** para armazenar dados localmente no computador do usuário.

---

## 💾 **Sistema Atual: LocalStorage**

### **O que é LocalStorage?**
- É uma API do navegador que permite armazenar dados no computador do usuário
- Os dados persistem mesmo após fechar o navegador
- **Limitação**: ~5-10MB de espaço por domínio
- Os dados ficam **apenas no navegador** do usuário (não são compartilhados)

---

## 📦 **Estrutura dos Dados Armazenados**

### **1. Projetos do Portfólio**
**Chave:** `admin_projects`
**Local:** `src/pages/admin/Dashboard.js`
**Estrutura:**
```javascript
[
  {
    id: 1,
    titulo: "Dr. Silva - Clínica Odontológica",
    categoria: "saude",
    categoriaLabel: "Saúde",
    descricao: "Site completo...",
    funcionalidades: ["Agendamento online", ...],
    plano: "Profissional",
    siteUrl: "https://...",
    screenshot: "https://...",
    cores: { primaria: "#4299e1", secundaria: "#2c5282" },
    tecnologias: ["React", "Tailwind CSS"],
    dataCriacao: "2024-01-15"
  },
  // ... mais projetos
]
```

**Como funciona:**
- Dados padrão em: `src/data/portfolioData.js`
- Admin pode adicionar/editar/deletar projetos pelo painel
- Alterações são salvas no `localStorage`

---

### **2. Orçamentos Solicitados**
**Chave:** `orcamentos`
**Local:** `src/page/Orcamento.js` (salva) | `src/pages/admin/Dashboard.js` (visualiza)

**Estrutura:**
```javascript
[
  {
    id: 1734567890123, // timestamp
    tipo: "orcamento",
    data: "2024-01-15T10:30:00.000Z",
    dataFormatada: "15/01/2024 10:30:00",
    status: "pendente", // "pendente" | "visualizado" | "respondido"
    nomeCompleto: "João Silva",
    email: "joao@email.com",
    telefone: "(11) 99999-9999",
    profissao: "Dentista",
    // ... outros campos do formulário
  }
]
```

**Como funciona:**
- Quando cliente preenche formulário de orçamento → salva no `localStorage`
- Admin vê na aba "Orçamentos" do dashboard
- Admin pode mudar status, visualizar detalhes ou deletar

---

### **3. Mensagens de Contato**
**Chave:** `mensagens_contato`
**Local:** `src/page/Contato.js` (salva) | `src/pages/admin/Dashboard.js` (visualiza)

**Estrutura:**
```javascript
[
  {
    id: 1734567890123,
    tipo: "contato",
    data: "2024-01-15T10:30:00.000Z",
    dataFormatada: "15/01/2024 10:30:00",
    status: "pendente",
    nome: "Maria Santos",
    email: "maria@email.com",
    telefone: "(11) 88888-8888",
    assunto: "Dúvida sobre planos",
    mensagem: "Gostaria de saber mais..."
  }
]
```

**Como funciona:**
- Quando cliente envia mensagem pelo formulário de contato → salva no `localStorage`
- Admin vê na aba "Mensagens" do dashboard
- Admin pode mudar status, visualizar ou deletar

---

### **4. Cores Personalizadas do Site**
**Chave:** `site_cores`
**Local:** `src/pages/admin/Dashboard.js` (edita) | `src/App.js` (carrega)

**Estrutura:**
```javascript
{
  primary: "#2563eb",
  accent: "#06b6d4",
  gradientStart: "#2563eb",
  gradientEnd: "#06b6d4",
  bodyBackground: "#f5f7fa",
  bodyText: "#1f2937",
  navbarBackground: "#ffffff",
  navbarText: "#475569",
  cardBackground: "#ffffff",
  cardText: "#1e293b"
}
```

**Como funciona:**
- Admin pode personalizar cores no painel → salva no `localStorage`
- Quando site carrega, aplica as cores salvas automaticamente
- Se não houver cores salvas, usa valores padrão

---

### **5. Depoimentos de Clientes**
**Chave:** `depoimentos`
**Local:** `src/data/depoimentosData.js` (padrão) | Pode ser gerenciado pelo admin

**Estrutura:**
```javascript
[
  {
    id: 1,
    nome: "Dr. Carlos Silva",
    profissao: "Dentista",
    texto: "O site superou todas as minhas expectativas!...",
    avaliacao: 5, // 1-5 estrelas
    data: "2024-01-15",
    categoria: "saude"
  }
]
```

**Como funciona:**
- Dados padrão em: `src/data/depoimentosData.js`
- Exibidos na seção de depoimentos na Home
- **Futuro:** Pode ser gerenciado pelo admin também

---

### **6. Autenticação do Admin**
**Chave:** `admin_token` | `current_user`
**Local:** `src/utils/auth.js`

**Estrutura:**
```javascript
// Token de autenticação
admin_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

// Usuário atual
current_user: {
  username: "admin",
  // ... outros dados
}
```

**Como funciona:**
- Quando admin faz login → salva token e dados do usuário
- Em cada requisição admin, verifica se token existe
- Se não houver token válido → redireciona para login

---

## 🔧 **Utilitários de Armazenamento**

### **Hook `useLocalStorage`**
**Arquivo:** `src/utils/useLocalStorage.js`

**Como usar:**
```javascript
import { useLocalStorage } from '../utils/useLocalStorage';

const [dados, setDados] = useLocalStorage('minha_chave', valorPadrao);

// Usar dados
console.log(dados);

// Atualizar dados
setDados(novoValor);
```

**Vantagens:**
- Tratamento de erros automático
- Proteção contra quota excedida
- API similar ao `useState` do React

---

## ⚠️ **Limitações do LocalStorage**

### **Problemas:**
1. ❌ **Dados ficam apenas no navegador do usuário**
   - Se limpar cache → perde tudo
   - Se trocar de navegador → perde tudo
   - Não sincroniza entre dispositivos

2. ❌ **Limite de espaço (~5-10MB)**
   - Pode estourar com muitos dados

3. ❌ **Não é seguro para dados sensíveis**
   - Qualquer código JavaScript pode acessar
   - Não recomendado para senhas, tokens, etc.

4. ❌ **Não funciona em múltiplos usuários**
   - Cada navegador tem seus próprios dados
   - Admin não vê orçamentos de outros computadores

---

## 🚀 **Migração para Banco de Dados Real**

### **Opção 1: Firebase (Recomendado)**
**Por quê:**
- Fácil de integrar
- Gratuito para projetos pequenos
- Já mencionado no README
- Suporte para autenticação, storage e banco

**Como implementar:**
```javascript
// Instalar Firebase
npm install firebase

// Configurar Firestore
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // ... suas credenciais
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Salvar orçamento
import { collection, addDoc } from 'firebase/firestore';
await addDoc(collection(db, 'orcamentos'), novoOrcamento);

// Ler orçamentos
import { collection, getDocs } from 'firebase/firestore';
const snapshot = await getDocs(collection(db, 'orcamentos'));
```

---

### **Opção 2: Supabase**
**Por quê:**
- Open source
- PostgreSQL (banco SQL real)
- API REST automática
- Gratuito até 500MB

---

### **Opção 3: Backend Próprio (Node.js + MongoDB/PostgreSQL)**
**Por quê:**
- Controle total
- Melhor para aplicações grandes
- Mais complexo de implementar

---

## 📊 **Comparação: LocalStorage vs Banco Real**

| Característica | LocalStorage | Banco de Dados Real |
|---|---|---|
| **Persistência** | Apenas no navegador | Servidor (permanente) |
| **Compartilhamento** | Não | Sim (todos veem) |
| **Backup** | Não | Sim (automático) |
| **Escalabilidade** | Limitada (~5-10MB) | Ilimitada |
| **Segurança** | Baixa | Alta |
| **Complexidade** | Simples | Mais complexo |
| **Custo** | Gratuito | Variável |
| **Offline** | Funciona | Requer internet |

---

## 🎯 **Recomendações**

### **Para Projeto Pequeno (Atual):**
✅ **LocalStorage está OK** para:
- Dados temporários
- Preferências do usuário
- Testes e protótipos

### **Para Projeto em Produção:**
❌ **Precisa de banco real** para:
- Orçamentos (não pode perder!)
- Mensagens de contato
- Dados do admin (precisam ser compartilhados)
- Autenticação segura

---

## 📝 **Próximos Passos Sugeridos**

1. **Curto Prazo:**
   - Implementar backup manual dos dados do localStorage
   - Adicionar exportação de dados (JSON)

2. **Médio Prazo:**
   - Integrar Firebase Firestore
   - Migrar orçamentos e mensagens para Firebase
   - Manter localStorage apenas para preferências

3. **Longo Prazo:**
   - Backend completo com API REST
   - Sistema de autenticação robusto
   - Dashboard admin com dados em tempo real

---

## 🔍 **Como Ver os Dados Armazenados**

### **No Navegador (Chrome/Edge):**
1. Abra o DevTools (F12)
2. Vá na aba **Application** (ou Aplicativo)
3. No menu lateral, clique em **Local Storage**
4. Selecione seu domínio
5. Veja todas as chaves e valores armazenados

### **Via Código:**
```javascript
// Ver todos os dados
console.log(localStorage);

// Ver dados específicos
console.log(localStorage.getItem('orcamentos'));
console.log(localStorage.getItem('site_cores'));

// Limpar tudo (cuidado!)
localStorage.clear();

// Remover item específico
localStorage.removeItem('orcamentos');
```

---

## ✅ **Resumo Final**

**Atualmente:**
- ✅ Usa `localStorage` para armazenar dados localmente
- ✅ Funciona bem para testes e desenvolvimento
- ✅ Cada navegador tem seus próprios dados
- ⚠️ Não é adequado para produção com múltiplos usuários

**Futuro:**
- 🚀 Migrar para Firebase ou backend próprio
- 🚀 Dados centralizados no servidor
- 🚀 Backup automático e segurança adequada

---

**Dúvidas?** Verifique o código em:
- `src/utils/useLocalStorage.js` - Hook para gerenciar localStorage
- `src/page/Orcamento.js` - Como salva orçamentos
- `src/pages/admin/Dashboard.js` - Como carrega e exibe dados

