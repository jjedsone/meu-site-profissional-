// ===== PORTFOLIO DATA =====
// Estrutura de dados para facilitar a inserção de novos projetos
// Como admin, basta adicionar novos objetos ao array 'portfolioProjects'

export const portfolioProjects = [
  {
    id: 1,
    titulo: 'Dr. Silva - Clínica Odontológica',
    categoria: 'saude',
    categoriaLabel: 'Saúde',
    descricao: 'Site completo com agendamento online, galeria de tratamentos e área do paciente.',
    funcionalidades: [
      'Agendamento online',
      'Galeria de tratamentos',
      'Blog de saúde bucal',
      'Área do paciente'
    ],
    plano: 'Profissional',
    siteUrl: 'https://exemplo-dentista.com',
    screenshot: 'https://via.placeholder.com/390x844/4299e1/ffffff?text=Dr+Silva+Odonto',
    // Para usar iframe do próprio site, use: siteUrl
    // Para usar screenshot, use: screenshot
    cores: {
      primaria: '#4299e1',
      secundaria: '#2c5282'
    },
    tecnologias: ['React', 'Tailwind CSS', 'Node.js'],
    dataCriacao: '2024-01-15'
  },
  {
    id: 2,
    titulo: 'Advocacia & Associados',
    categoria: 'juridico',
    categoriaLabel: 'Jurídico',
    descricao: 'Site institucional com portfólio de casos e formulário de consulta.',
    funcionalidades: [
      'Portfólio de casos',
      'Formulário de consulta',
      'WhatsApp integrado',
      'Galeria de resultados'
    ],
    plano: 'Básico',
    siteUrl: 'https://exemplo-advocacia.com',
    screenshot: 'https://via.placeholder.com/390x844/f59e0b/ffffff?text=Advocacia+Associados',
    cores: {
      primaria: '#f59e0b',
      secundaria: '#d97706'
    },
    tecnologias: ['React', 'Tailwind CSS'],
    dataCriacao: '2024-02-10'
  },
  {
    id: 3,
    titulo: 'Consultoria Empresarial Pro',
    categoria: 'consultoria',
    categoriaLabel: 'Consultoria',
    descricao: 'Plataforma completa com múltiplos serviços, área do cliente e relatórios.',
    funcionalidades: [
      'Múltiplos serviços',
      'Área do cliente',
      'Relatórios mensais',
      'Sistema de avaliação'
    ],
    plano: 'Premium',
    siteUrl: 'https://exemplo-consultoria.com',
    screenshot: 'https://via.placeholder.com/390x844/10b981/ffffff?text=Consultoria+Pro',
    cores: {
      primaria: '#10b981',
      secundaria: '#059669'
    },
    tecnologias: ['React', 'Node.js', 'MongoDB'],
    dataCriacao: '2024-03-05'
  },
  {
    id: 4,
    titulo: 'Contabilidade Digital',
    categoria: 'contabilidade',
    categoriaLabel: 'Contabilidade',
    descricao: 'Site profissional para escritório de contabilidade com área do cliente.',
    funcionalidades: [
      'Catálogo de serviços',
      'Área do cliente',
      'Certificados',
      'Formulário de contato'
    ],
    plano: 'Intermediário',
    siteUrl: 'https://exemplo-contabilidade.com',
    screenshot: 'https://via.placeholder.com/390x844/6366f1/ffffff?text=Contabilidade+Digital',
    cores: {
      primaria: '#6366f1',
      secundaria: '#4f46e5'
    },
    tecnologias: ['React', 'Tailwind CSS'],
    dataCriacao: '2024-03-20'
  },
  {
    id: 5,
    titulo: 'Psicologia & Bem-Estar',
    categoria: 'saude',
    categoriaLabel: 'Saúde',
    descricao: 'Site elegante para psicóloga com agendamento e blog especializado.',
    funcionalidades: [
      'Página institucional',
      'Agendamento online',
      'Blog especializado',
      'Depoimentos'
    ],
    plano: 'Básico',
    siteUrl: 'https://exemplo-psicologia.com',
    screenshot: 'https://via.placeholder.com/390x844/ec4899/ffffff?text=Psicologia+BemEstar',
    cores: {
      primaria: '#ec4899',
      secundaria: '#db2777'
    },
    tecnologias: ['React', 'Tailwind CSS'],
    dataCriacao: '2024-04-12'
  },
  {
    id: 6,
    titulo: 'Academia FitLife',
    categoria: 'fitness',
    categoriaLabel: 'Fitness',
    descricao: 'Plataforma completa com sistema de agendamento e área do aluno.',
    funcionalidades: [
      'Agendamento de aulas',
      'Área do aluno',
      'Lembretes automáticos',
      'Histórico de treinos'
    ],
    plano: 'Premium',
    siteUrl: 'https://exemplo-academia.com',
    screenshot: 'https://via.placeholder.com/390x844/8b5cf6/ffffff?text=Academia+FitLife',
    cores: {
      primaria: '#8b5cf6',
      secundaria: '#7c3aed'
    },
    tecnologias: ['React', 'Node.js', 'PostgreSQL'],
    dataCriacao: '2024-05-01'
  }
];

// Função helper para adicionar novo projeto (para uso futuro como admin)
export const addPortfolioProject = (newProject) => {
  const projectWithId = {
    ...newProject,
    id: portfolioProjects.length + 1,
    dataCriacao: new Date().toISOString().split('T')[0]
  };
  portfolioProjects.push(projectWithId);
  return projectWithId;
};

// Função para obter projetos (do localStorage ou padrão)
export const getPortfolioProjects = () => {
  if (typeof window !== 'undefined') {
    const savedProjects = localStorage.getItem('admin_projects');
    if (savedProjects) {
      return JSON.parse(savedProjects);
    }
  }
  return portfolioProjects;
};

// Função para filtrar projetos por categoria
export const getProjectsByCategory = (categoria) => {
  const projects = getPortfolioProjects();
  if (categoria === 'todos') return projects;
  return projects.filter(p => p.categoria === categoria);
};

// Função para buscar projeto por ID
export const getProjectById = (id) => {
  return portfolioProjects.find(p => p.id === id);
};
