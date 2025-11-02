# 📱 Como Adicionar Novos Projetos ao Portfólio

Este documento explica como você, como administrador, pode adicionar novos sites ao portfólio.

## 📍 Localização

Os projetos do portfólio estão localizados em:
```
src/data/portfolioData.js
```

## 🚀 Como Adicionar um Novo Projeto

### 1. Abra o arquivo `portfolioData.js`

### 2. Adicione um novo objeto ao array `portfolioProjects`

Siga este modelo:

```javascript
{
  id: 7, // Incremente o número
  titulo: 'Nome do Cliente - Tipo de Negócio',
  categoria: 'saude', // Opções: 'saude', 'juridico', 'consultoria', 'contabilidade', 'fitness'
  categoriaLabel: 'Saúde', // Nome da categoria que aparecerá na tela
  descricao: 'Descrição breve do site e seus objetivos.',
  funcionalidades: [
    'Funcionalidade 1',
    'Funcionalidade 2',
    'Funcionalidade 3'
  ],
  plano: 'Básico', // Opções: 'Básico', 'Intermediário', 'Profissional', 'Premium'
  siteUrl: 'https://www.seu-site.com.br', // URL do site (para iframe) OU null
  screenshot: 'https://url-da-imagem.com/screenshot.jpg', // URL da imagem (390x844px recomendado) OU null
  cores: {
    primaria: '#4299e1', // Cor principal do site
    secundaria: '#2c5282' // Cor secundária do site
  },
  tecnologias: ['React', 'Tailwind CSS', 'Node.js'], // Array com tecnologias usadas
  dataCriacao: '2024-06-15' // Data de criação no formato YYYY-MM-DD
}
```

### 3. Opções de Exibição

Você pode escolher como exibir o site no mockup de celular:

**Opção A: Iframe (Site ao Vivo)**
- Use `siteUrl` com a URL completa do site
- Deixe `screenshot` como `null`
- O site será exibido em um iframe dentro do mockup

**Opção B: Screenshot (Imagem)**
- Use `screenshot` com a URL da imagem
- Deixe `siteUrl` como `null` ou remova
- A imagem será exibida dentro do mockup

**Opção C: Ambos**
- Você pode ter ambos, mas o `screenshot` terá prioridade se ambos estiverem presentes

### 4. Categorias Disponíveis

- `'saude'` → 'Saúde'
- `'juridico'` → 'Jurídico'
- `'consultoria'` → 'Consultoria'
- `'contabilidade'` → 'Contabilidade'
- `'fitness'` → 'Fitness'

### 5. Planos Disponíveis

- `'Básico'`
- `'Intermediário'`
- `'Profissional'`
- `'Premium'`

## 📸 Dicas para Screenshots

1. **Dimensões Recomendadas**: 390x844 pixels (proporção de um celular)
2. **Formato**: PNG ou JPG
3. **Qualidade**: Use imagens de alta qualidade
4. **Conteúdo**: Capture a parte superior do site (home/hero)

## ✅ Exemplo Completo

```javascript
{
  id: 7,
  titulo: 'Restaurante Sabor & Arte',
  categoria: 'restaurante',
  categoriaLabel: 'Restaurante',
  descricao: 'Site completo com cardápio digital, reservas online e delivery integrado.',
  funcionalidades: [
    'Cardápio digital interativo',
    'Sistema de reservas',
    'Integração com iFood',
    'Galeria de pratos',
    'Avaliações de clientes'
  ],
  plano: 'Profissional',
  siteUrl: 'https://www.restaurante-saborarte.com.br',
  screenshot: null,
  cores: {
    primaria: '#ff6b6b',
    secundaria: '#ee5a6f'
  },
  tecnologias: ['React', 'Next.js', 'Stripe API'],
  dataCriacao: '2024-06-15'
}
```

## 🔄 Após Adicionar

1. Salve o arquivo
2. O projeto será automaticamente exibido no portfólio
3. O projeto aparecerá no filtro da categoria escolhida
4. Um mockup de celular será criado automaticamente exibindo o site

## 🎨 Funcionalidades Automáticas

- ✨ Mockup de celular gerado automaticamente
- 🔍 Filtro por categoria funcionando automaticamente
- 📱 Design responsivo
- 🎯 Modal de detalhes com preview maior
- 🔗 Link para visitar o site completo

## 💡 Dicas

- Mantenha os IDs sequenciais
- Use descrições claras e objetivas
- Liste apenas funcionalidades realmente implementadas
- Atualize a data de criação corretamente
- Use cores que representam a identidade visual do site

---

**Pronto!** Agora você pode adicionar quantos projetos quiser facilmente! 🚀
