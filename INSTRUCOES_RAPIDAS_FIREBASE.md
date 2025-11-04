# ⚡ Instruções Rápidas - Configurar Firebase

## ✅ Arquivo .env Criado!

O arquivo `.env` foi criado na pasta `trabalho-main`. Agora você precisa preenchê-lo com as credenciais reais do Firebase.

## 🎯 Passos Rápidos (2 minutos)

### 1️⃣ Acessar Firebase Console

**Link Direto:**
https://console.firebase.google.com/project/meu-site-profissional-e0daf/settings/general

Ou:
1. Acesse: https://console.firebase.google.com/
2. Selecione: `meu-site-profissional-e0daf`
3. Clique em ⚙️ (engrenagem) > **"Project settings"**

### 2️⃣ Obter Credenciais

1. Role até a seção **"Your apps"**
2. **Se você já tem um app web:**
   - Clique no app web (ícone `</>`)
   - Você verá as credenciais

3. **Se você NÃO tem um app web:**
   - Clique em **"Add app"**
   - Selecione **Web** (`</>`)
   - Digite um nome (ex: "meu-site-profissional")
   - **NÃO** marque "Also set up Firebase Hosting"
   - Clique em **"Register app"**
   - As credenciais aparecerão automaticamente

### 3️⃣ Copiar Credenciais

Você verá algo assim:

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

### 4️⃣ Editar Arquivo .env

1. Abra o arquivo `.env` na pasta `trabalho-main`
2. Você verá:

```env
REACT_APP_FIREBASE_API_KEY=COLE_A_API_KEY_AQUI
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=COLE_O_SENDER_ID_AQUI
REACT_APP_FIREBASE_APP_ID=COLE_O_APP_ID_AQUI
```

3. **Substitua:**
   - `COLE_A_API_KEY_AQUI` → pela `apiKey` do Firebase (ex: `AIzaSyD1234567890...`)
   - `COLE_O_SENDER_ID_AQUI` → pelo `messagingSenderId` do Firebase (ex: `123456789012`)
   - `COLE_O_APP_ID_AQUI` → pelo `appId` do Firebase (ex: `1:123456789012:web:abcdef...`)

4. **Exemplo final do arquivo .env:**
```env
REACT_APP_FIREBASE_API_KEY=AIzaSyD1234567890abcdefghijklmnopqrstuvwxyz
REACT_APP_FIREBASE_AUTH_DOMAIN=meu-site-profissional-e0daf.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=meu-site-profissional-e0daf
REACT_APP_FIREBASE_STORAGE_BUCKET=meu-site-profissional-e0daf.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
REACT_APP_FIREBASE_APP_ID=1:123456789012:web:abcdef123456789
```

### 5️⃣ Reiniciar o Servidor

1. Pare o servidor (Ctrl + C)
2. Inicie novamente: `npm start`
3. ✅ O erro não deve mais aparecer!

## 🔍 Verificar se Funcionou

Após configurar:
1. Abra o console do navegador (F12)
2. Não deve aparecer mais o erro: `auth/api-key-not-valid`
3. Tente acessar `/admin/setup` ou fazer login
4. Deve funcionar normalmente!

## 📍 Localização do Arquivo .env

```
trabalho-main/
  ├── .env              ← Arquivo está aqui
  ├── package.json
  ├── src/
  └── ...
```

## ⚠️ Importante

- O arquivo `.env` está no `.gitignore` - não será commitado
- Mantenha as credenciais seguras
- Não compartilhe o arquivo `.env`

## 🆘 Ainda com Erro?

Se ainda aparecer erro após configurar:
1. Verifique se não há espaços extras nas credenciais
2. Verifique se copiou todas as credenciais corretamente
3. Certifique-se de que reiniciou o servidor após criar o arquivo
4. Limpe o cache do navegador (Ctrl + Shift + Delete)

---

**💡 Dica:** Se tiver dúvidas, tire um print da tela do Firebase Console com as credenciais e posso ajudar!

