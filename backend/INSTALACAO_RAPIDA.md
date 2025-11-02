# 🚀 Instalação Rápida do Backend

## ⚡ **Instalação em 3 Passos**

### **1. Instalar Dependências**
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
- Gere uma chave segura: `openssl rand -base64 32`
- Altere a senha do admin!

### **3. Executar**
```bash
# Modo desenvolvimento (com hot reload)
npm run dev

# Modo produção
npm start
```

## ✅ **Testar**

Abra no navegador: `http://localhost:5000/api/health`

Você deve ver:
```json
{
  "status": "OK",
  "message": "API WebPro Sites está funcionando!",
  "timestamp": "..."
}
```

## 📦 **Estrutura Criada**

```
backend/
├── server.js              # Servidor principal
├── package.json           # Dependências
├── .env                   # Variáveis de ambiente (CRIAR!)
├── middleware/
│   ├── auth.js           # Autenticação JWT
│   └── validation.js     # Validação de dados
├── models/
│   └── Storage.js        # Armazenamento em JSON
├── routes/
│   ├── auth.js           # Login/Logout
│   ├── orcamentos.js     # Orçamentos
│   ├── mensagens.js      # Mensagens
│   ├── projetos.js       # Projetos
│   ├── depoimentos.js    # Depoimentos
│   └── config.js         # Configurações
└── data/                 # Arquivos JSON (criado automaticamente)
```

## 🎯 **Próximos Passos**

1. ✅ Backend está funcionando
2. 🔄 Integrar com frontend (ver `INTEGRACAO_BACKEND.md`)
3. 🚀 Deploy em produção

---

**Pronto! Backend funcionando! 🎉**

