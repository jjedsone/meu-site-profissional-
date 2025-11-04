# ⚡ Resumo Rápido - Configurar Firebase

## 🎯 Objetivo
Resolver o erro: **"Firebase: Error (auth/api-key-not-valid)"**

## 📋 Passos Rápidos

### 1️⃣ Obter Credenciais do Firebase (2 minutos)

1. Acesse: **https://console.firebase.google.com/project/meu-site-profissional-e0daf/settings/general**
2. Role até **"Your apps"**
3. Se não houver app web, clique em **"Add app"** > **`</>`** (Web)
4. Copie as credenciais que aparecerem

### 2️⃣ Criar Arquivo .env (1 minuto)

**Opção A - PowerShell:**
```powershell
cd C:\Users\jjeds\AppData\Local\Temp\trabalho-main\trabalho-main
New-Item -Path ".env" -ItemType File
notepad .env
```

**Opção B - Manual:**
1. Abra o Bloco de Notas
2. Salve como: `.env` (com ponto no início)
3. Salve na pasta `trabalho-main`

### 3️⃣ Colar Credenciais

Cole no arquivo `.env`:
```env
REACT_APP_FIREBASE_API_KEY=COLE_A_API_KEY_AQUI
REACT_APP_FIREBASE_AUTH_DOMAIN=meu-site-profissional-e0daf.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=meu-site-profissional-e0daf
REACT_APP_FIREBASE_STORAGE_BUCKET=meu-site-profissional-e0daf.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=COLE_O_SENDER_ID_AQUI
REACT_APP_FIREBASE_APP_ID=COLE_O_APP_ID_AQUI
```

**Substitua:**
- `COLE_A_API_KEY_AQUI` → pela `apiKey` do Firebase
- `COLE_O_SENDER_ID_AQUI` → pelo `messagingSenderId` do Firebase
- `COLE_O_APP_ID_AQUI` → pelo `appId` do Firebase

### 4️⃣ Reiniciar Servidor

1. Pare o servidor (Ctrl + C)
2. Inicie: `npm start`
3. ✅ Erro resolvido!

## 🔗 Links Úteis

- **Firebase Console:** https://console.firebase.google.com/project/meu-site-profissional-e0daf
- **Configurações do Projeto:** https://console.firebase.google.com/project/meu-site-profissional-e0daf/settings/general

## 📚 Guias Detalhados

- `GUIA_VISUAL_CREDENCIAIS_FIREBASE.md` - Guia completo com screenshots
- `COMO_CRIAR_ARQUIVO_ENV.md` - Como criar o arquivo .env
- `COMO_OBTER_CREDENCIAIS_FIREBASE.md` - Instruções detalhadas

## ✅ Checklist

- [ ] Acessei o Firebase Console
- [ ] Encontrei ou criei o app web
- [ ] Copiei as credenciais
- [ ] Criei o arquivo `.env`
- [ ] Colei as credenciais no `.env`
- [ ] Substituí os valores pelos reais
- [ ] Reiniciei o servidor
- [ ] Erro desapareceu!

---

**💡 Dica:** Se tiver dúvidas em algum passo, veja os guias detalhados acima!

