# 🔑 Guia Visual - Como Obter Credenciais do Firebase

## 📍 Passo a Passo Detalhado

### 1️⃣ Acessar o Firebase Console

1. Abra seu navegador
2. Acesse: **https://console.firebase.google.com/**
3. Faça login com sua conta Google (se necessário)

### 2️⃣ Selecionar o Projeto

1. Na lista de projetos, encontre e clique em: **`meu-site-profissional-e0daf`**
   - Se não encontrar, verifique se está logado com a conta correta

### 3️⃣ Ir para Configurações do Projeto

1. No canto superior esquerdo, ao lado de "Project Overview"
2. Clique no ícone de **⚙️ engrenagem**
3. Selecione **"Project settings"**

### 4️⃣ Localizar ou Criar App Web

**Se você já tem um app web:**
- Role até a seção **"Your apps"**
- Você verá um app web listado (ícone `</>`)
- Clique nele para ver as credenciais

**Se você NÃO tem um app web:**
1. Na seção **"Your apps"**, clique no botão **"Add app"**
2. Selecione o ícone **`</>`** (Web)
3. Registre um nome para o app (ex: "meu-site-profissional")
4. **NÃO** marque a opção "Also set up Firebase Hosting" (já está configurado)
5. Clique em **"Register app"**
6. As credenciais aparecerão automaticamente

### 5️⃣ Copiar as Credenciais

Você verá um código JavaScript assim:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD1234567890abcdefghijklmnopqrstuvwxyz",
  authDomain: "meu-site-profissional-e0daf.firebaseapp.com",
  projectId: "meu-site-profissional-e0daf",
  storageBucket: "meu-site-profissional-e0daf.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789"
};
```

### 6️⃣ Criar Arquivo .env

1. Na raiz do projeto (`trabalho-main`), crie um arquivo chamado **`.env`**
2. **IMPORTANTE:** O arquivo deve começar com ponto (`.env`) - não `env.txt`
3. Cole o seguinte conteúdo, substituindo pelos valores reais:

```env
REACT_APP_FIREBASE_API_KEY=AIzaSyD1234567890abcdefghijklmnopqrstuvwxyz
REACT_APP_FIREBASE_AUTH_DOMAIN=meu-site-profissional-e0daf.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=meu-site-profissional-e0daf
REACT_APP_FIREBASE_STORAGE_BUCKET=meu-site-profissional-e0daf.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
REACT_APP_FIREBASE_APP_ID=1:123456789012:web:abcdef123456789
```

**⚠️ IMPORTANTE:**
- Substitua `AIzaSyD1234567890...` pela `apiKey` real
- Substitua `123456789012` pelo `messagingSenderId` real
- Substitua `1:123456789012:web:abcdef123456789` pelo `appId` real

### 7️⃣ Reiniciar o Servidor

1. Pare o servidor (pressione `Ctrl + C` no terminal)
2. Inicie novamente: `npm start`
3. O erro não deve mais aparecer!

## ✅ Verificar se Funcionou

Após configurar:
1. Abra o console do navegador (F12)
2. Não deve aparecer mais o erro de API Key
3. Tente fazer login no admin
4. Deve funcionar normalmente!

## 🔒 Segurança

- ✅ O arquivo `.env` está no `.gitignore` - não será commitado no Git
- ✅ As credenciais ficam apenas no seu computador
- ✅ Nunca compartilhe o arquivo `.env`

## 📸 Screenshots de Referência

**Localização das credenciais:**
```
Firebase Console
  └─ meu-site-profissional-e0daf
      └─ ⚙️ Project settings
          └─ Your apps
              └─ Web app (</>)
                  └─ firebaseConfig { ... }
```

## 🆘 Problemas Comuns

### "Não encontro o projeto"
- Verifique se está logado com a conta Google correta
- Verifique se o projeto existe: https://console.firebase.google.com/

### "Não vejo a opção Add app"
- Certifique-se de estar na página "Project settings"
- Role até a seção "Your apps"

### "O arquivo .env não funciona"
- Certifique-se de que o arquivo se chama `.env` (não `.env.txt`)
- Certifique-se de que está na raiz do projeto `trabalho-main`
- Reinicie o servidor após criar o arquivo

### "Ainda aparece erro"
- Verifique se não há espaços extras nas credenciais
- Verifique se copiou todas as credenciais corretamente
- Limpe o cache do navegador (Ctrl + Shift + Delete)

---

**💡 Dica:** Se tiver dúvidas, tire um print da tela do Firebase Console e posso ajudar a identificar as credenciais!

