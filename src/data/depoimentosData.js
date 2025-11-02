// ===== DEPOIMENTOS DATA =====
// Estrutura de dados para depoimentos de clientes

export const depoimentosData = [
  {
    id: 1,
    nome: 'Dr. Carlos Silva',
    profissao: 'Dentista',
    texto: 'O site superou todas as minhas expectativas! Agora tenho agendamentos online e minha agenda está sempre organizada. Recomendo a todos os profissionais da área da saúde.',
    avaliacao: 5,
    data: '2024-01-15',
    categoria: 'saude'
  },
  {
    id: 2,
    nome: 'Dra. Ana Paula',
    profissao: 'Psicóloga',
    texto: 'Profissionalismo e atenção aos detalhes. O site ficou exatamente como eu queria, moderno e funcional. Meus pacientes adoram a facilidade de agendamento.',
    avaliacao: 5,
    data: '2024-02-20',
    categoria: 'saude'
  },
  {
    id: 3,
    nome: 'Adv. Roberto Santos',
    profissao: 'Advogado',
    texto: 'Excelente trabalho! O site está profissional e transmite credibilidade. A galeria de casos ficou perfeita e o formulário de contato facilita muito o atendimento.',
    avaliacao: 5,
    data: '2024-03-10',
    categoria: 'juridico'
  },
  {
    id: 4,
    nome: 'Maria Oliveira',
    profissao: 'Contadora',
    texto: 'Site moderno e fácil de usar. Meus clientes conseguem encontrar todas as informações que precisam rapidamente. Ótimo investimento!',
    avaliacao: 5,
    data: '2024-04-05',
    categoria: 'contabilidade'
  },
  {
    id: 5,
    nome: 'João Costa',
    profissao: 'Personal Trainer',
    texto: 'Site incrível! As fotos ficaram lindas e o sistema de agendamento é super prático. Já consegui novos clientes através do site.',
    avaliacao: 5,
    data: '2024-05-12',
    categoria: 'fitness'
  },
  {
    id: 6,
    nome: 'Dra. Fernanda Lima',
    profissao: 'Dermatologista',
    texto: 'Profissionalismo e dedicação. O site ficou exatamente como eu imaginava. O suporte foi excelente durante todo o processo.',
    avaliacao: 5,
    data: '2024-06-18',
    categoria: 'saude'
  }
];

// Função para obter depoimentos
export const getDepoimentos = () => {
  try {
    const saved = localStorage.getItem('depoimentos');
    if (saved) {
      return JSON.parse(saved);
    }
    return depoimentosData;
  } catch (error) {
    console.error('Erro ao carregar depoimentos:', error);
    return depoimentosData;
  }
};

// Função para obter depoimentos por categoria
export const getDepoimentosByCategoria = (categoria) => {
  const depoimentos = getDepoimentos();
  if (categoria === 'todos') return depoimentos;
  return depoimentos.filter(d => d.categoria === categoria);
};

