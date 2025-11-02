import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Edit, 
  Trash2, 
  LogOut, 
  Eye, 
  Search,
  Smartphone,
  Grid,
  List as ListIcon,
  X,
  DollarSign,
  Mail,
  Calendar,
  User,
  Phone,
  FileText,
  Palette,
  RefreshCw,
  Save
} from 'lucide-react';
import { logout, getCurrentUser } from '../../utils/auth';
import { portfolioProjects } from '../../data/portfolioData';
import PhoneMockup from '../../components/PhoneMockup';
import { aplicarCores } from '../../utils/colorUtils';
import { toast } from '../../utils/toast';
import '../../style/Admin.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projetos'); // 'projetos', 'orcamentos', 'mensagens', 'personalizacao'
  const [projects, setProjects] = useState([]);
  const [orcamentos, setOrcamentos] = useState([]);
  const [mensagens, setMensagens] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  // Estados para personalização de cores
  const [cores, setCores] = useState({
    primary: '#2563eb',
    accent: '#06b6d4',
    gradientStart: '#2563eb',
    gradientEnd: '#06b6d4',
    // Cores de tema
    bodyBackground: '#f5f7fa',
    bodyText: '#1f2937',
    navbarBackground: '#ffffff',
    navbarText: '#475569',
    cardBackground: '#ffffff',
    cardText: '#1e293b'
  });

  useEffect(() => {
    // Carregar projetos do localStorage ou usar os padrão
    const savedProjects = localStorage.getItem('admin_projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      // Inicializar com projetos padrão
      setProjects(portfolioProjects);
      localStorage.setItem('admin_projects', JSON.stringify(portfolioProjects));
    }
    
    // Carregar orçamentos
    const savedOrcamentos = localStorage.getItem('orcamentos');
    if (savedOrcamentos) {
      setOrcamentos(JSON.parse(savedOrcamentos).sort((a, b) => b.id - a.id));
    }
    
    // Carregar mensagens de contato
    const savedMensagens = localStorage.getItem('mensagens_contato');
    if (savedMensagens) {
      setMensagens(JSON.parse(savedMensagens).sort((a, b) => b.id - a.id));
    }

    // Carregar cores personalizadas
    const savedCores = localStorage.getItem('site_cores');
    if (savedCores) {
      const coresSalvas = JSON.parse(savedCores);
      setCores(coresSalvas);
      aplicarCores(coresSalvas);
    }
  }, []);

  // Função para salvar cores
  const salvarCores = () => {
    try {
      localStorage.setItem('site_cores', JSON.stringify(cores));
      aplicarCores(cores);
      toast.success('Cores salvas com sucesso! As mudanças já estão visíveis no site.');
    } catch (error) {
      console.error('Erro ao salvar cores:', error);
      toast.error('Erro ao salvar cores. Tente novamente.');
    }
  };

  // Função para resetar cores
  const resetarCores = () => {
    const coresPadrao = {
      primary: '#2563eb',
      accent: '#06b6d4',
      gradientStart: '#2563eb',
      gradientEnd: '#06b6d4',
      bodyBackground: '#f5f7fa',
      bodyText: '#1f2937',
      navbarBackground: '#ffffff',
      navbarText: '#475569',
      cardBackground: '#ffffff',
      cardText: '#1e293b'
    };
    try {
      setCores(coresPadrao);
      localStorage.removeItem('site_cores');
      aplicarCores(coresPadrao);
      toast.success('Cores resetadas para os valores padrão!');
    } catch (error) {
      console.error('Erro ao resetar cores:', error);
      toast.error('Erro ao resetar cores. Tente novamente.');
    }
  };

  // Atualizar cores em tempo real
  const handleCorChange = (tipo, valor) => {
    const novasCores = { ...cores, [tipo]: valor };
    setCores(novasCores);
    aplicarCores(novasCores);
  };

  // Função para atualizar listas quando houver mudanças
  const refreshData = () => {
    const savedOrcamentos = localStorage.getItem('orcamentos');
    if (savedOrcamentos) {
      setOrcamentos(JSON.parse(savedOrcamentos).sort((a, b) => b.id - a.id));
    }
    
    const savedMensagens = localStorage.getItem('mensagens_contato');
    if (savedMensagens) {
      setMensagens(JSON.parse(savedMensagens).sort((a, b) => b.id - a.id));
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleDelete = (id) => {
    const updatedProjects = projects.filter(p => p.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem('admin_projects', JSON.stringify(updatedProjects));
    setDeleteConfirm(null);
  };

  const handleEdit = (project) => {
    navigate(`/admin/projects/${project.id}/edit`);
  };

  const handleAdd = () => {
    navigate('/admin/projects/new');
  };

  const filteredProjects = projects.filter(project =>
    project.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.categoriaLabel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOrcamentos = orcamentos.filter(orcamento =>
    orcamento.nomeCompleto?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    orcamento.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    orcamento.profissao?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMensagens = mensagens.filter(mensagem =>
    mensagem.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mensagem.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mensagem.assunto?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (tipo, id, novoStatus) => {
    if (tipo === 'orcamento') {
      const updated = orcamentos.map(item => 
        item.id === id ? { ...item, status: novoStatus } : item
      );
      setOrcamentos(updated);
      localStorage.setItem('orcamentos', JSON.stringify(updated));
    } else if (tipo === 'contato') {
      const updated = mensagens.map(item => 
        item.id === id ? { ...item, status: novoStatus } : item
      );
      setMensagens(updated);
      localStorage.setItem('mensagens_contato', JSON.stringify(updated));
    }
  };

  const handleDeleteItem = (tipo, id) => {
    if (tipo === 'orcamento') {
      const updated = orcamentos.filter(item => item.id !== id);
      setOrcamentos(updated);
      localStorage.setItem('orcamentos', JSON.stringify(updated));
    } else if (tipo === 'contato') {
      const updated = mensagens.filter(item => item.id !== id);
      setMensagens(updated);
      localStorage.setItem('mensagens_contato', JSON.stringify(updated));
    }
    setSelectedItem(null);
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-header-left">
            <Smartphone className="admin-header-icon" />
            <div>
              <h1 className="admin-header-title">Painel Administrativo</h1>
              <p className="admin-header-subtitle">
                Bem-vindo, {getCurrentUser()}!
              </p>
            </div>
          </div>
          
          <div className="admin-header-actions">
            {activeTab === 'projetos' && (
              <button
                onClick={handleAdd}
                className="admin-btn admin-btn-primary"
              >
                <Plus className="w-5 h-5" />
                Novo Projeto
              </button>
            )}
            <button
              onClick={handleLogout}
              className="admin-btn admin-btn-secondary"
            >
              <LogOut className="w-5 h-5" />
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="admin-tabs">
        <button
          onClick={() => { setActiveTab('projetos'); setSearchTerm(''); }}
          className={`admin-tab ${activeTab === 'projetos' ? 'active' : ''}`}
        >
          <Smartphone className="w-5 h-5" />
          <span>Projetos ({projects.length})</span>
        </button>
        <button
          onClick={() => { setActiveTab('orcamentos'); setSearchTerm(''); refreshData(); }}
          className={`admin-tab ${activeTab === 'orcamentos' ? 'active' : ''}`}
        >
          <DollarSign className="w-5 h-5" />
          <span>Orçamentos ({orcamentos.length})</span>
          {orcamentos.filter(o => o.status === 'pendente').length > 0 && (
            <span className="admin-badge">{orcamentos.filter(o => o.status === 'pendente').length}</span>
          )}
        </button>
        <button
          onClick={() => { setActiveTab('mensagens'); setSearchTerm(''); refreshData(); }}
          className={`admin-tab ${activeTab === 'mensagens' ? 'active' : ''}`}
        >
          <Mail className="w-5 h-5" />
          <span>Mensagens ({mensagens.length})</span>
          {mensagens.filter(m => m.status === 'pendente').length > 0 && (
            <span className="admin-badge">{mensagens.filter(m => m.status === 'pendente').length}</span>
          )}
        </button>
        <button
          onClick={() => { setActiveTab('personalizacao'); setSearchTerm(''); }}
          className={`admin-tab ${activeTab === 'personalizacao' ? 'active' : ''}`}
        >
          <Palette className="w-5 h-5" />
          <span>Personalização</span>
        </button>
      </div>

      {/* Main Content */}
      <main className="admin-main">
        {/* Toolbar */}
        <div className="admin-toolbar">
          <div className="admin-search">
            <Search className="admin-search-icon" />
            <input
              type="text"
              placeholder={
                activeTab === 'projetos' ? 'Buscar projetos...' :
                activeTab === 'orcamentos' ? 'Buscar orçamentos...' :
                'Buscar mensagens...'
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="admin-search-clear"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {activeTab === 'projetos' && (
            <div className="admin-view-controls">
              <button
                onClick={() => setViewMode('grid')}
                className={`admin-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`admin-view-btn ${viewMode === 'list' ? 'active' : ''}`}
              >
                <ListIcon className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Conteúdo por Tab */}
        {activeTab === 'projetos' && (
          <>
            {/* Projects Grid/List */}
            <div className={`admin-projects-container admin-projects-${viewMode}`}>
              {filteredProjects.length === 0 ? (
                <div className="admin-empty-state">
                  <Smartphone className="admin-empty-icon" />
                  <h3>Nenhum projeto encontrado</h3>
                  <p>
                    {searchTerm 
                      ? 'Tente buscar com outros termos' 
                      : 'Comece adicionando seu primeiro projeto'}
                  </p>
                  {!searchTerm && (
                    <button onClick={handleAdd} className="admin-btn admin-btn-primary">
                      <Plus className="w-5 h-5" />
                      Adicionar Projeto
                    </button>
                  )}
                </div>
              ) : (
                filteredProjects.map((project) => (
                  <div key={project.id} className="admin-project-card">
                    {/* Preview do Mockup */}
                    <div className="admin-project-preview">
                      <PhoneMockup
                        siteUrl={project.siteUrl}
                        screenshot={project.screenshot}
                        title={project.titulo}
                        showControls={false}
                      />
                    </div>

                    {/* Info do Projeto */}
                    <div className="admin-project-info">
                      <div className="admin-project-header">
                        <div>
                          <span className="admin-project-category">{project.categoriaLabel}</span>
                          <h3 className="admin-project-title">{project.titulo}</h3>
                        </div>
                        <span className="admin-project-badge">{project.plano}</span>
                      </div>

                      <p className="admin-project-description">{project.descricao}</p>

                      <div className="admin-project-stats">
                        <span className="admin-project-stat">
                          <Eye className="w-4 h-4" />
                          {project.funcionalidades.length} funcionalidades
                        </span>
                        {project.tecnologias && (
                          <span className="admin-project-stat">
                            {project.tecnologias.length} tecnologias
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="admin-project-actions">
                        <button
                          onClick={() => handleEdit(project)}
                          className="admin-action-btn admin-action-edit"
                        >
                          <Edit className="w-4 h-4" />
                          Editar
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ tipo: 'projeto', id: project.id })}
                          className="admin-action-btn admin-action-delete"
                        >
                          <Trash2 className="w-4 h-4" />
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Stats */}
            <div className="admin-stats">
              <div className="admin-stat-card">
                <h3 className="admin-stat-value">{projects.length}</h3>
                <p className="admin-stat-label">Total de Projetos</p>
              </div>
              <div className="admin-stat-card">
                <h3 className="admin-stat-value">
                  {projects.filter(p => p.siteUrl).length}
                </h3>
                <p className="admin-stat-label">Sites ao Vivo</p>
              </div>
              <div className="admin-stat-card">
                <h3 className="admin-stat-value">
                  {new Set(projects.map(p => p.categoria)).size}
                </h3>
                <p className="admin-stat-label">Categorias</p>
              </div>
            </div>
          </>
        )}

        {activeTab === 'orcamentos' && (
          <div className="admin-messages-container">
            {filteredOrcamentos.length === 0 ? (
              <div className="admin-empty-state">
                <DollarSign className="admin-empty-icon" />
                <h3>Nenhum orçamento encontrado</h3>
                <p>
                  {searchTerm 
                    ? 'Tente buscar com outros termos' 
                    : 'Ainda não há orçamentos recebidos'}
                </p>
              </div>
            ) : (
              filteredOrcamentos.map((orcamento) => (
                <div key={orcamento.id} className="admin-message-card">
                  <div className="admin-message-header">
                    <div className="admin-message-info">
                      <div className="admin-message-title-row">
                        <User className="w-5 h-5" />
                        <h3>{orcamento.nomeCompleto}</h3>
                        <span className={`admin-status-badge ${orcamento.status}`}>
                          {orcamento.status === 'pendente' ? 'Pendente' : 
                           orcamento.status === 'visualizado' ? 'Visualizado' : 
                           'Respondido'}
                        </span>
                      </div>
                      <div className="admin-message-meta">
                        <Mail className="w-4 h-4" />
                        <span>{orcamento.email}</span>
                        <Phone className="w-4 h-4" />
                        <span>{orcamento.telefone}</span>
                        <Calendar className="w-4 h-4" />
                        <span>{orcamento.dataFormatada}</span>
                      </div>
                    </div>
                    <div className="admin-message-actions">
                      <button
                        onClick={() => setSelectedItem({ tipo: 'orcamento', data: orcamento })}
                        className="admin-action-btn admin-action-view"
                      >
                        <Eye className="w-4 h-4" />
                        Ver Detalhes
                      </button>
                      <select
                        value={orcamento.status}
                        onChange={(e) => handleStatusChange('orcamento', orcamento.id, e.target.value)}
                        className="admin-status-select"
                      >
                        <option value="pendente">Pendente</option>
                        <option value="visualizado">Visualizado</option>
                        <option value="respondido">Respondido</option>
                      </select>
                      <button
                        onClick={() => setDeleteConfirm({ tipo: 'orcamento', id: orcamento.id })}
                        className="admin-action-btn admin-action-delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="admin-message-preview">
                    <p><strong>Profissão:</strong> {orcamento.profissao}</p>
                    <p><strong>Tipo de Site:</strong> {orcamento.tipoSite?.join(', ') || 'Não informado'}</p>
                    <p><strong>Orçamento:</strong> {orcamento.orcamentoDisponivel || 'Não informado'}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'mensagens' && (
          <div className="admin-messages-container">
            {filteredMensagens.length === 0 ? (
              <div className="admin-empty-state">
                <Mail className="admin-empty-icon" />
                <h3>Nenhuma mensagem encontrada</h3>
                <p>
                  {searchTerm 
                    ? 'Tente buscar com outros termos' 
                    : 'Ainda não há mensagens recebidas'}
                </p>
              </div>
            ) : (
              filteredMensagens.map((mensagem) => (
                <div key={mensagem.id} className="admin-message-card">
                  <div className="admin-message-header">
                    <div className="admin-message-info">
                      <div className="admin-message-title-row">
                        <User className="w-5 h-5" />
                        <h3>{mensagem.nome}</h3>
                        <span className={`admin-status-badge ${mensagem.status}`}>
                          {mensagem.status === 'pendente' ? 'Pendente' : 
                           mensagem.status === 'visualizado' ? 'Visualizado' : 
                           'Respondido'}
                        </span>
                      </div>
                      <div className="admin-message-meta">
                        <Mail className="w-4 h-4" />
                        <span>{mensagem.email}</span>
                        <Phone className="w-4 h-4" />
                        <span>{mensagem.telefone}</span>
                        <Calendar className="w-4 h-4" />
                        <span>{mensagem.dataFormatada}</span>
                      </div>
                      <div className="admin-message-subject">
                        <FileText className="w-4 h-4" />
                        <strong>Assunto:</strong> {mensagem.assunto}
                      </div>
                    </div>
                    <div className="admin-message-actions">
                      <button
                        onClick={() => setSelectedItem({ tipo: 'contato', data: mensagem })}
                        className="admin-action-btn admin-action-view"
                      >
                        <Eye className="w-4 h-4" />
                        Ver Detalhes
                      </button>
                      <select
                        value={mensagem.status}
                        onChange={(e) => handleStatusChange('contato', mensagem.id, e.target.value)}
                        className="admin-status-select"
                      >
                        <option value="pendente">Pendente</option>
                        <option value="visualizado">Visualizado</option>
                        <option value="respondido">Respondido</option>
                      </select>
                      <button
                        onClick={() => setDeleteConfirm({ tipo: 'contato', id: mensagem.id })}
                        className="admin-action-btn admin-action-delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="admin-message-preview">
                    <p>{mensagem.mensagem}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'personalizacao' && (
          <div className="admin-personalizacao">
            <div className="admin-personalizacao-header">
              <h2 className="admin-personalizacao-title">
                <Palette className="w-6 h-6" />
                Personalização de Cores
              </h2>
              <p className="admin-personalizacao-subtitle">
                Personalize as cores principais do seu site. As mudanças são aplicadas em tempo real.
              </p>
            </div>

            <div className="admin-color-settings">
              {/* Cor Primária */}
              <div className="admin-color-group">
                <div className="admin-color-header">
                  <label className="admin-color-label">
                    Cor Primária
                    <span className="admin-color-hint">Usada em botões, links e destaques</span>
                  </label>
                  <div className="admin-color-preview" style={{ background: cores.primary }}></div>
                </div>
                <div className="admin-color-controls">
                  <input
                    type="color"
                    value={cores.primary}
                    onChange={(e) => handleCorChange('primary', e.target.value)}
                    className="admin-color-input"
                  />
                  <input
                    type="text"
                    value={cores.primary}
                    onChange={(e) => handleCorChange('primary', e.target.value)}
                    className="admin-color-text"
                    placeholder="#2563eb"
                  />
                </div>
              </div>

              {/* Cor Accent */}
              <div className="admin-color-group">
                <div className="admin-color-header">
                  <label className="admin-color-label">
                    Cor Accent
                    <span className="admin-color-hint">Usada em elementos secundários e gradientes</span>
                  </label>
                  <div className="admin-color-preview" style={{ background: cores.accent }}></div>
                </div>
                <div className="admin-color-controls">
                  <input
                    type="color"
                    value={cores.accent}
                    onChange={(e) => handleCorChange('accent', e.target.value)}
                    className="admin-color-input"
                  />
                  <input
                    type="text"
                    value={cores.accent}
                    onChange={(e) => handleCorChange('accent', e.target.value)}
                    className="admin-color-text"
                    placeholder="#06b6d4"
                  />
                </div>
              </div>

              {/* Gradiente Início */}
              <div className="admin-color-group">
                <div className="admin-color-header">
                  <label className="admin-color-label">
                    Gradiente - Cor Inicial
                    <span className="admin-color-hint">Primeira cor do gradiente usado em títulos</span>
                  </label>
                  <div className="admin-color-preview" style={{ background: cores.gradientStart }}></div>
                </div>
                <div className="admin-color-controls">
                  <input
                    type="color"
                    value={cores.gradientStart}
                    onChange={(e) => handleCorChange('gradientStart', e.target.value)}
                    className="admin-color-input"
                  />
                  <input
                    type="text"
                    value={cores.gradientStart}
                    onChange={(e) => handleCorChange('gradientStart', e.target.value)}
                    className="admin-color-text"
                    placeholder="#2563eb"
                  />
                </div>
              </div>

              {/* Gradiente Fim */}
              <div className="admin-color-group">
                <div className="admin-color-header">
                  <label className="admin-color-label">
                    Gradiente - Cor Final
                    <span className="admin-color-hint">Segunda cor do gradiente usado em títulos</span>
                  </label>
                  <div className="admin-color-preview" style={{ background: cores.gradientEnd }}></div>
                </div>
                <div className="admin-color-controls">
                  <input
                    type="color"
                    value={cores.gradientEnd}
                    onChange={(e) => handleCorChange('gradientEnd', e.target.value)}
                    className="admin-color-input"
                  />
                  <input
                    type="text"
                    value={cores.gradientEnd}
                    onChange={(e) => handleCorChange('gradientEnd', e.target.value)}
                    className="admin-color-text"
                    placeholder="#06b6d4"
                  />
                </div>
              </div>

              {/* Separador - Cores de Tema */}
              <div style={{ 
                margin: '3rem 0 2rem', 
                padding: '2rem 0', 
                borderTop: '2px solid #e2e8f0',
                borderBottom: '2px solid #e2e8f0'
              }}>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 700, 
                  color: '#1e293b',
                  marginBottom: '1rem'
                }}>
                  Cores de Tema (Fundo, Menu e Textos)
                </h3>
                <p style={{ 
                  color: '#64748b', 
                  marginBottom: '2rem',
                  fontSize: '0.95rem'
                }}>
                  Personalize as cores de fundo do site, menu e textos para criar um tema escuro ou claro
                </p>
              </div>

              {/* Cor de Fundo do Body */}
              <div className="admin-color-group">
                <div className="admin-color-header">
                  <label className="admin-color-label">
                    Fundo do Site (Body)
                    <span className="admin-color-hint">Cor de fundo principal de todas as páginas</span>
                  </label>
                  <div className="admin-color-preview" style={{ background: cores.bodyBackground || '#f5f7fa' }}></div>
                </div>
                <div className="admin-color-controls">
                  <input
                    type="color"
                    value={cores.bodyBackground || '#f5f7fa'}
                    onChange={(e) => handleCorChange('bodyBackground', e.target.value)}
                    className="admin-color-input"
                  />
                  <input
                    type="text"
                    value={cores.bodyBackground || '#f5f7fa'}
                    onChange={(e) => handleCorChange('bodyBackground', e.target.value)}
                    className="admin-color-text"
                    placeholder="#000000"
                  />
                </div>
              </div>

              {/* Cor do Texto do Body */}
              <div className="admin-color-group">
                <div className="admin-color-header">
                  <label className="admin-color-label">
                    Cor do Texto Principal
                    <span className="admin-color-hint">Cor dos textos no corpo das páginas</span>
                  </label>
                  <div className="admin-color-preview" style={{ background: cores.bodyText || '#1f2937' }}></div>
                </div>
                <div className="admin-color-controls">
                  <input
                    type="color"
                    value={cores.bodyText || '#1f2937'}
                    onChange={(e) => handleCorChange('bodyText', e.target.value)}
                    className="admin-color-input"
                  />
                  <input
                    type="text"
                    value={cores.bodyText || '#1f2937'}
                    onChange={(e) => handleCorChange('bodyText', e.target.value)}
                    className="admin-color-text"
                    placeholder="#f5f5f5"
                  />
                </div>
              </div>

              {/* Cor de Fundo do Menu */}
              <div className="admin-color-group">
                <div className="admin-color-header">
                  <label className="admin-color-label">
                    Fundo do Menu (Navbar)
                    <span className="admin-color-hint">Cor de fundo da barra de navegação</span>
                  </label>
                  <div className="admin-color-preview" style={{ background: cores.navbarBackground || '#ffffff' }}></div>
                </div>
                <div className="admin-color-controls">
                  <input
                    type="color"
                    value={cores.navbarBackground || '#ffffff'}
                    onChange={(e) => handleCorChange('navbarBackground', e.target.value)}
                    className="admin-color-input"
                  />
                  <input
                    type="text"
                    value={cores.navbarBackground || '#ffffff'}
                    onChange={(e) => handleCorChange('navbarBackground', e.target.value)}
                    className="admin-color-text"
                    placeholder="#000000"
                  />
                </div>
              </div>

              {/* Cor do Texto do Menu */}
              <div className="admin-color-group">
                <div className="admin-color-header">
                  <label className="admin-color-label">
                    Cor do Texto do Menu
                    <span className="admin-color-hint">Cor dos links e textos no menu</span>
                  </label>
                  <div className="admin-color-preview" style={{ background: cores.navbarText || '#475569' }}></div>
                </div>
                <div className="admin-color-controls">
                  <input
                    type="color"
                    value={cores.navbarText || '#475569'}
                    onChange={(e) => handleCorChange('navbarText', e.target.value)}
                    className="admin-color-input"
                  />
                  <input
                    type="text"
                    value={cores.navbarText || '#475569'}
                    onChange={(e) => handleCorChange('navbarText', e.target.value)}
                    className="admin-color-text"
                    placeholder="#f5f5f5"
                  />
                </div>
              </div>

              {/* Cor de Fundo dos Cards */}
              <div className="admin-color-group">
                <div className="admin-color-header">
                  <label className="admin-color-label">
                    Fundo dos Cards
                    <span className="admin-color-hint">Cor de fundo dos cards e seções</span>
                  </label>
                  <div className="admin-color-preview" style={{ background: cores.cardBackground || '#ffffff' }}></div>
                </div>
                <div className="admin-color-controls">
                  <input
                    type="color"
                    value={cores.cardBackground || '#ffffff'}
                    onChange={(e) => handleCorChange('cardBackground', e.target.value)}
                    className="admin-color-input"
                  />
                  <input
                    type="text"
                    value={cores.cardBackground || '#ffffff'}
                    onChange={(e) => handleCorChange('cardBackground', e.target.value)}
                    className="admin-color-text"
                    placeholder="#1e1e1e"
                  />
                </div>
              </div>

              {/* Cor do Texto dos Cards */}
              <div className="admin-color-group">
                <div className="admin-color-header">
                  <label className="admin-color-label">
                    Cor do Texto dos Cards
                    <span className="admin-color-hint">Cor dos textos dentro dos cards</span>
                  </label>
                  <div className="admin-color-preview" style={{ background: cores.cardText || '#1e293b' }}></div>
                </div>
                <div className="admin-color-controls">
                  <input
                    type="color"
                    value={cores.cardText || '#1e293b'}
                    onChange={(e) => handleCorChange('cardText', e.target.value)}
                    className="admin-color-input"
                  />
                  <input
                    type="text"
                    value={cores.cardText || '#1e293b'}
                    onChange={(e) => handleCorChange('cardText', e.target.value)}
                    className="admin-color-text"
                    placeholder="#f5f5f5"
                  />
                </div>
              </div>

              {/* Preview do Tema */}
              <div className="admin-gradient-preview" style={{ marginTop: '2rem' }}>
                <h3 className="admin-gradient-title">Preview do Tema</h3>
                <div 
                  style={{ 
                    background: cores.bodyBackground || '#f5f7fa',
                    color: cores.bodyText || '#1f2937',
                    padding: '2rem',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0',
                    marginBottom: '1rem'
                  }}
                >
                  <p style={{ margin: 0, fontWeight: 600 }}>Texto do Body</p>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', opacity: 0.8 }}>
                    Este é um exemplo de texto no corpo da página
                  </p>
                </div>
                <div 
                  style={{ 
                    background: cores.navbarBackground || '#ffffff',
                    color: cores.navbarText || '#475569',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0',
                    marginBottom: '1rem'
                  }}
                >
                  <p style={{ margin: 0, fontWeight: 600 }}>Menu (Navbar)</p>
                </div>
                <div 
                  style={{ 
                    background: cores.cardBackground || '#ffffff',
                    color: cores.cardText || '#1e293b',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0'
                  }}
                >
                  <p style={{ margin: 0, fontWeight: 600 }}>Card</p>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', opacity: 0.8 }}>
                    Exemplo de conteúdo dentro de um card
                  </p>
                </div>
              </div>

              {/* Preview do Gradiente */}
              <div className="admin-gradient-preview">
                <h3 className="admin-gradient-title">Preview do Gradiente</h3>
                <div 
                  className="admin-gradient-example"
                  style={{ 
                    background: `linear-gradient(135deg, ${cores.gradientStart} 0%, ${cores.gradientEnd} 100%)` 
                  }}
                >
                  <span className="admin-gradient-text">Texto com Gradiente</span>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="admin-color-actions">
                <button
                  onClick={salvarCores}
                  className="admin-btn admin-btn-primary"
                >
                  <Save className="w-5 h-5" />
                  Salvar Cores
                </button>
                <button
                  onClick={resetarCores}
                  className="admin-btn admin-btn-secondary"
                >
                  <RefreshCw className="w-5 h-5" />
                  Resetar para Padrão
                </button>
              </div>

              {/* Informações */}
              <div className="admin-color-info">
                <h4>Como funciona:</h4>
                <ul>
                  <li>As cores são aplicadas em tempo real conforme você altera</li>
                  <li>Clique em "Salvar Cores" para persistir as mudanças</li>
                  <li>As cores são aplicadas em todas as páginas do site</li>
                  <li>Você pode resetar para as cores padrão a qualquer momento</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="admin-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="admin-modal-title">Confirmar Exclusão</h3>
            <p className="admin-modal-text">
              {deleteConfirm.tipo === 'projeto' 
                ? 'Tem certeza que deseja excluir este projeto? Esta ação não pode ser desfeita.'
                : deleteConfirm.tipo === 'orcamento'
                ? 'Tem certeza que deseja excluir este orçamento? Esta ação não pode ser desfeita.'
                : 'Tem certeza que deseja excluir esta mensagem? Esta ação não pode ser desfeita.'}
            </p>
            <div className="admin-modal-actions">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="admin-btn admin-btn-secondary"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (deleteConfirm.tipo === 'projeto') {
                    handleDelete(deleteConfirm.id);
                  } else {
                    handleDeleteItem(deleteConfirm.tipo, deleteConfirm.id);
                  }
                }}
                className="admin-btn admin-btn-danger"
              >
                <Trash2 className="w-5 h-5" />
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedItem && (
        <div className="admin-modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="admin-modal admin-modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {selectedItem.tipo === 'orcamento' ? 'Detalhes do Orçamento' : 'Detalhes da Mensagem'}
              </h3>
              <button
                onClick={() => setSelectedItem(null)}
                className="admin-modal-close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="admin-modal-content">
              {selectedItem.tipo === 'orcamento' ? (
                <div className="admin-detail-content">
                  <div className="admin-detail-section">
                    <h4>Informações de Contato</h4>
                    <p><strong>Nome:</strong> {selectedItem.data.nomeCompleto}</p>
                    <p><strong>E-mail:</strong> {selectedItem.data.email}</p>
                    <p><strong>Telefone:</strong> {selectedItem.data.telefone}</p>
                    <p><strong>Endereço:</strong> {selectedItem.data.endereco || 'Não informado'}</p>
                    <p><strong>Data:</strong> {selectedItem.data.dataFormatada}</p>
                  </div>
                  <div className="admin-detail-section">
                    <h4>Sobre o Negócio</h4>
                    <p><strong>Profissão:</strong> {selectedItem.data.profissao}</p>
                    <p><strong>Público-alvo:</strong> {selectedItem.data.publicoAlvo || 'Não informado'}</p>
                  </div>
                  <div className="admin-detail-section">
                    <h4>Requisitos do Site</h4>
                    <p><strong>Tipo de Site:</strong> {selectedItem.data.tipoSite?.join(', ') || 'Não informado'}</p>
                    <p><strong>Páginas Necessárias:</strong> {selectedItem.data.paginasNecessarias?.join(', ') || 'Não informado'}</p>
                    <p><strong>Integrações:</strong> {selectedItem.data.integracoes?.join(', ') || 'Nenhuma'}</p>
                  </div>
                  <div className="admin-detail-section">
                    <h4>Prazo e Investimento</h4>
                    <p><strong>Prazo Desejado:</strong> {selectedItem.data.prazoDesejado || 'Não informado'}</p>
                    <p><strong>Orçamento Disponível:</strong> {selectedItem.data.orcamentoDisponivel || 'Não informado'}</p>
                  </div>
                  {selectedItem.data.exemplosUrls && (
                    <div className="admin-detail-section">
                      <h4>Exemplos de Sites</h4>
                      <p>{selectedItem.data.exemplosUrls}</p>
                    </div>
                  )}
                  {selectedItem.data.observacoes && (
                    <div className="admin-detail-section">
                      <h4>Observações</h4>
                      <p>{selectedItem.data.observacoes}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="admin-detail-content">
                  <div className="admin-detail-section">
                    <h4>Informações de Contato</h4>
                    <p><strong>Nome:</strong> {selectedItem.data.nome}</p>
                    <p><strong>E-mail:</strong> {selectedItem.data.email}</p>
                    <p><strong>Telefone:</strong> {selectedItem.data.telefone}</p>
                    <p><strong>Data:</strong> {selectedItem.data.dataFormatada}</p>
                  </div>
                  <div className="admin-detail-section">
                    <h4>Assunto</h4>
                    <p>{selectedItem.data.assunto}</p>
                  </div>
                  <div className="admin-detail-section">
                    <h4>Mensagem</h4>
                    <p>{selectedItem.data.mensagem}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="admin-modal-actions">
              <button
                onClick={() => setSelectedItem(null)}
                className="admin-btn admin-btn-primary"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

