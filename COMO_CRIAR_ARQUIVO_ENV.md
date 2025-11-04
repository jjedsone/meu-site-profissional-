# 📝 Como Criar o Arquivo .env

## Método 1: Criar no Windows (Explorador de Arquivos)

1. Abra o Explorador de Arquivos
2. Navegue até a pasta `trabalho-main`
3. Clique com botão direito > **"Novo"** > **"Documento de Texto"**
4. Renomeie o arquivo para: **`.env`**
   - ⚠️ **IMPORTANTE:** Ao renomear, remova a extensão `.txt`
   - Windows pode avisar, mas aceite
5. Abra o arquivo com o Bloco de Notas
6. Cole o conteúdo (veja abaixo)
7. Salve e feche

## Método 2: Criar no VS Code / Editor

1. Abra a pasta `trabalho-main` no VS Code
2. Clique com botão direito na pasta raiz
3. Selecione **"New File"**
4. Digite: **`.env`** (com o ponto no início)
5. Cole o conteúdo
6. Salve

## Método 3: Criar via Terminal (PowerShell)

```powershell
# Navegue até a pasta
cd trabalho-main

# Crie o arquivo
New-Item -Path ".env" -ItemType File

# Abra para editar (ou edite manualmente)
notepad .env
```

## Conteúdo do Arquivo .env

Copie e cole este conteúdo no arquivo `.env`, substituindo pelas credenciais reais do Firebase:

```env
REACT_APP_FIREBASE_API_KEY=sua_api_key_aqui
REACT_APP_FIREBASE_AUTH_DOMAIN=meu-site-profissional-e0daf.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=meu-site-profissional-e0daf
REACT_APP_FIREBASE_STORAGE_BUCKET=meu-site-profissional-e0daf.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id_aqui
REACT_APP_FIREBASE_APP_ID=seu_app_id_aqui
```

## ⚠️ IMPORTANTE

1. O arquivo deve se chamar exatamente **`.env`** (com ponto no início)
2. Não deve ter extensão (não `.env.txt`)
3. Deve estar na pasta `trabalho-main` (raiz do projeto)
4. Substitua `sua_api_key_aqui` e os outros valores pelas credenciais reais do Firebase

## 🔍 Como Saber se Está Correto

Após criar o arquivo:
1. Pare o servidor (Ctrl + C)
2. Reinicie: `npm start`
3. O erro não deve mais aparecer!

## 📍 Localização Correta

```
trabalho-main/
  ├── .env              ← Arquivo deve estar aqui
  ├── package.json
  ├── src/
  ├── public/
  └── ...
```

## ✅ Verificar se Funcionou

1. Abra o console do navegador (F12)
2. Não deve aparecer mais o erro: "auth/api-key-not-valid"
3. Tente fazer login no admin
4. Deve funcionar!

---

**💡 Dica:** Se o Windows não deixar criar arquivo sem extensão, crie como `.env.txt`, depois renomeie e remova o `.txt` quando Windows pedir confirmação.

