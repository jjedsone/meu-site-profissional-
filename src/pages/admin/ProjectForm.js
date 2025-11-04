import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Save, 
  X, 
  Plus, 
  Trash2, 
  ArrowLeft,
  Globe,
  Image as ImageIcon,
  Palette
} from 'lucide-react';
import { portfolioProjects, categoriasDisponiveis } from '../../data/portfolioData';
import '../../style/Admin.css';

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    titulo: '',
    categoria: 'saude',
    categoriaLabel: 'Saúde',
    descricao: '',
    funcionalidades: [''],
    plano: 'Básico',
    siteUrl: '',
    screenshot: '',
    cores: {
      primaria: '#2563eb',
      secundaria: '#1e40af'
    },
    tecnologias: [''],
    dataCriacao: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      const savedProjects = JSON.parse(localStorage.getItem('admin_projects') || JSON.stringify(portfolioProjects));
      const project = savedProjects.find(p => p.id === parseInt(id));
      if (project) {
        setFormData({
          ...project,
          funcionalidades: project.funcionalidades || [''],
          tecnologias: project.tecnologias || ['']
        });
      }
    }
  }, [id, isEdit]);

  const categorias = categoriasDisponiveis;

  const planos = ['Básico', 'Intermediário', 'Profissional', 'Premium'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Atualizar categoriaLabel quando categoria mudar
    if (name === 'categoria') {
      const categoriaObj = categorias.find(c => c.value === value);
      setFormData(prev => ({
        ...prev,
        categoriaLabel: categoriaObj ? categoriaObj.label : prev.categoriaLabel
      }));
    }
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = 'Título é obrigatório';
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória';
    }

    if (formData.funcionalidades.filter(f => f.trim()).length === 0) {
      newErrors.funcionalidades = 'Adicione pelo menos uma funcionalidade';
    }

    if (!formData.siteUrl && !formData.screenshot) {
      newErrors.siteUrl = 'Forneça URL do site ou screenshot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    // Filtrar arrays vazios
    const cleanedData = {
      ...formData,
      funcionalidades: formData.funcionalidades.filter(f => f.trim()),
      tecnologias: formData.tecnologias.filter(t => t.trim())
    };

    const savedProjects = JSON.parse(localStorage.getItem('admin_projects') || JSON.stringify(portfolioProjects));
    
    if (isEdit) {
      // Editar projeto existente
      const updatedProjects = savedProjects.map(p => 
        p.id === parseInt(id) ? { ...cleanedData, id: parseInt(id) } : p
      );
      localStorage.setItem('admin_projects', JSON.stringify(updatedProjects));
    } else {
      // Adicionar novo projeto
      const newId = savedProjects.length > 0 
        ? Math.max(...savedProjects.map(p => p.id)) + 1 
        : 1;
      const newProject = { ...cleanedData, id: newId };
      const updatedProjects = [...savedProjects, newProject];
      localStorage.setItem('admin_projects', JSON.stringify(updatedProjects));
    }

    navigate('/admin/dashboard');
  };

  return (
    <div className="admin-form-page">
      <div className="admin-form-container">
        {/* Header */}
        <div className="admin-form-header">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="admin-back-btn"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>
          <h1 className="admin-form-title">
            {isEdit ? 'Editar Projeto' : 'Novo Projeto'}
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="admin-form">
          {/* Informações Básicas */}
          <section className="admin-form-section">
            <h2 className="admin-section-title">Informações Básicas</h2>
            
            <div className="admin-form-row">
              <div className="admin-form-group admin-form-group-full">
                <label className="admin-form-label">
                  Título do Projeto *
                </label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  className={`admin-form-input ${errors.titulo ? 'error' : ''}`}
                  placeholder="Ex: Dr. Silva - Clínica Odontológica"
                />
                {errors.titulo && <span className="admin-error">{errors.titulo}</span>}
              </div>
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">
                  Categoria *
                </label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  className="admin-form-input"
                >
                  {categorias.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">
                  Plano *
                </label>
                <select
                  name="plano"
                  value={formData.plano}
                  onChange={handleChange}
                  className="admin-form-input"
                >
                  {planos.map(plano => (
                    <option key={plano} value={plano}>{plano}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="admin-form-group admin-form-group-full">
              <label className="admin-form-label">
                Descrição *
              </label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                className={`admin-form-textarea ${errors.descricao ? 'error' : ''}`}
                placeholder="Descreva o projeto..."
                rows={4}
              />
              {errors.descricao && <span className="admin-error">{errors.descricao}</span>}
            </div>
          </section>

          {/* Funcionalidades */}
          <section className="admin-form-section">
            <h2 className="admin-section-title">Funcionalidades</h2>
            {formData.funcionalidades.map((func, index) => (
              <div key={index} className="admin-array-item">
                <input
                  type="text"
                  value={func}
                  onChange={(e) => handleArrayChange('funcionalidades', index, e.target.value)}
                  className="admin-form-input"
                  placeholder="Ex: Agendamento online"
                />
                {formData.funcionalidades.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('funcionalidades', index)}
                    className="admin-remove-btn"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('funcionalidades')}
              className="admin-add-btn"
            >
              <Plus className="w-4 h-4" />
              Adicionar Funcionalidade
            </button>
            {errors.funcionalidades && (
              <span className="admin-error">{errors.funcionalidades}</span>
            )}
          </section>

          {/* Site URL e Screenshot */}
          <section className="admin-form-section">
            <h2 className="admin-section-title">Visualização</h2>
            
            <div className="admin-form-row">
              <div className="admin-form-group admin-form-group-full">
                <label className="admin-form-label">
                  <Globe className="admin-input-icon" />
                  URL do Site
                </label>
                <input
                  type="url"
                  name="siteUrl"
                  value={formData.siteUrl}
                  onChange={handleChange}
                  className={`admin-form-input ${errors.siteUrl ? 'error' : ''}`}
                  placeholder="https://www.exemplo.com.br"
                />
                <small className="admin-form-hint">
                  Deixe vazio se usar apenas screenshot
                </small>
              </div>
            </div>

            <div className="admin-form-group admin-form-group-full">
              <label className="admin-form-label">
                <ImageIcon className="admin-input-icon" />
                URL da Screenshot
              </label>
              <input
                type="url"
                name="screenshot"
                value={formData.screenshot}
                onChange={handleChange}
                className={`admin-form-input ${errors.siteUrl ? 'error' : ''}`}
                placeholder="https://exemplo.com/screenshot.jpg"
              />
              <small className="admin-form-hint">
                Imagem 390x844px recomendada. Deixe vazio se usar apenas URL do site.
              </small>
            </div>
            {errors.siteUrl && (
              <span className="admin-error">{errors.siteUrl}</span>
            )}
          </section>

          {/* Tecnologias */}
          <section className="admin-form-section">
            <h2 className="admin-section-title">Tecnologias</h2>
            {formData.tecnologias.map((tech, index) => (
              <div key={index} className="admin-array-item">
                <input
                  type="text"
                  value={tech}
                  onChange={(e) => handleArrayChange('tecnologias', index, e.target.value)}
                  className="admin-form-input"
                  placeholder="Ex: React"
                />
                {formData.tecnologias.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('tecnologias', index)}
                    className="admin-remove-btn"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('tecnologias')}
              className="admin-add-btn"
            >
              <Plus className="w-4 h-4" />
              Adicionar Tecnologia
            </button>
          </section>

          {/* Cores */}
          <section className="admin-form-section">
            <h2 className="admin-section-title">
              <Palette className="admin-section-icon" />
              Cores do Projeto
            </h2>
            
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">
                  Cor Primária
                </label>
                <div className="admin-color-input">
                  <input
                    type="color"
                    value={formData.cores.primaria}
                    onChange={(e) => handleNestedChange('cores', 'primaria', e.target.value)}
                    className="admin-color-picker"
                  />
                  <input
                    type="text"
                    value={formData.cores.primaria}
                    onChange={(e) => handleNestedChange('cores', 'primaria', e.target.value)}
                    className="admin-form-input admin-color-text"
                    placeholder="#2563eb"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">
                  Cor Secundária
                </label>
                <div className="admin-color-input">
                  <input
                    type="color"
                    value={formData.cores.secundaria}
                    onChange={(e) => handleNestedChange('cores', 'secundaria', e.target.value)}
                    className="admin-color-picker"
                  />
                  <input
                    type="text"
                    value={formData.cores.secundaria}
                    onChange={(e) => handleNestedChange('cores', 'secundaria', e.target.value)}
                    className="admin-form-input admin-color-text"
                    placeholder="#1e40af"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Data */}
          <section className="admin-form-section">
            <div className="admin-form-group">
              <label className="admin-form-label">
                Data de Criação
              </label>
              <input
                type="date"
                name="dataCriacao"
                value={formData.dataCriacao}
                onChange={handleChange}
                className="admin-form-input"
              />
            </div>
          </section>

          {/* Actions */}
          <div className="admin-form-actions">
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="admin-btn admin-btn-secondary"
            >
              <X className="w-5 h-5" />
              Cancelar
            </button>
            <button
              type="submit"
              className="admin-btn admin-btn-primary"
            >
              <Save className="w-5 h-5" />
              {isEdit ? 'Salvar Alterações' : 'Criar Projeto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;

