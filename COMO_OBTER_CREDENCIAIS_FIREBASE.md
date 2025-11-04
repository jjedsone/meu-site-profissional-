# 🔑 Como Obter as Credenciais do Firebase

## Passo a Passo para Obter a API Key e Outras Credenciais

### 1. Acesse o Firebase Console
- Acesse: https://console.firebase.google.com/
- Selecione o projeto: `meu-site-profissional-e0daf`

### 2. Obter as Credenciais
1. Clique no ícone de **engrenagem** ⚙️ ao lado de "Project Overview"
2. Selecione **"Project settings"**
3. Role até a seção **"Your apps"**
4. Se não houver um app web, clique em **"Add app"** > **"Web"** (ícone `</>`) 
5. Registre um nome para o app (ex: "meu-site-profissional")
6. Copie as credenciais que aparecerão

### 3. Credenciais que você precisa:

Você verá algo assim:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "meu-site-profissional-e0daf.firebaseapp.com",
  projectId: "meu-site-profissional-e0daf",
  storageBucket: "meu-site-profissional-e0daf.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789"
};
```

### 4. Criar arquivo .env

Na raiz do projeto (`trabalho-main`), crie um arquivo chamado `.env` com:

```env
REACT_APP_FIREBASE_API_KEY=sua_api_key_aqui
REACT_APP_FIREBASE_AUTH_DOMAIN=meu-site-profissional-e0daf.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=meu-site-profissional-e0daf
REACT_APP_FIREBASE_STORAGE_BUCKET=meu-site-profissional-e0daf.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id_aqui
REACT_APP_FIREBASE_APP_ID=seu_app_id_aqui
```

**⚠️ IMPORTANTE:** Substitua `sua_api_key_aqui` e os outros valores pelas credenciais reais do Firebase Console.

### 5. Reiniciar o servidor

Após criar o arquivo `.env`, você precisa:
1. Parar o servidor (Ctrl+C)
2. Reiniciar: `npm start`

### Exemplo de arquivo .env completo:

```env
REACT_APP_FIREBASE_API_KEY=AIzaSyD1234567890abcdefghijklmnopqrstuvwxyz
REACT_APP_FIREBASE_AUTH_DOMAIN=meu-site-profissional-e0daf.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=meu-site-profissional-e0daf
REACT_APP_FIREBASE_STORAGE_BUCKET=meu-site-profissional-e0daf.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
REACT_APP_FIREBASE_APP_ID=1:123456789012:web:abcdef123456789
```

### 6. Verificar se funcionou

Após configurar, teste fazendo login no admin. O erro não deve mais aparecer.

---

**💡 Dica:** O arquivo `.env` está no `.gitignore`, então suas credenciais não serão commitadas no Git (segurança).

