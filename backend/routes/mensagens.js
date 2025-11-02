const express = require('express');
const Storage = require('../models/Storage');
const { validateMensagem } = require('../middleware/validation');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();
const storage = new Storage('mensagens');

// GET /api/mensagens - Listar todas as mensagens (admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { status, search } = req.query;
    let mensagens = await storage.findAll();

    // Filtrar por status
    if (status) {
      mensagens = mensagens.filter(m => m.status === status);
    }

    // Buscar por texto (nome, email, assunto)
    if (search) {
      const searchLower = search.toLowerCase();
      mensagens = mensagens.filter(m => 
        m.nome?.toLowerCase().includes(searchLower) ||
        m.email?.toLowerCase().includes(searchLower) ||
        m.assunto?.toLowerCase().includes(searchLower) ||
        m.mensagem?.toLowerCase().includes(searchLower)
      );
    }

    // Ordenar por data (mais recente primeiro)
    mensagens.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      count: mensagens.length,
      data: mensagens
    });
  } catch (error) {
    console.error('Erro ao listar mensagens:', error);
    res.status(500).json({ error: 'Erro ao listar mensagens' });
  }
});

// GET /api/mensagens/:id - Obter mensagem específica (admin only)
router.get('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const mensagem = await storage.findById(parseInt(req.params.id));
    
    if (!mensagem) {
      return res.status(404).json({ error: 'Mensagem não encontrada' });
    }

    res.json({
      success: true,
      data: mensagem
    });
  } catch (error) {
    console.error('Erro ao obter mensagem:', error);
    res.status(500).json({ error: 'Erro ao obter mensagem' });
  }
});

// POST /api/mensagens - Criar nova mensagem (público)
router.post('/', validateMensagem, async (req, res) => {
  try {
    const novaMensagem = {
      ...req.body,
      status: 'pendente',
      dataFormatada: new Date().toLocaleString('pt-BR')
    };

    const mensagem = await storage.create(novaMensagem);

    res.status(201).json({
      success: true,
      message: 'Mensagem enviada com sucesso! Responderemos em breve.',
      data: mensagem
    });
  } catch (error) {
    console.error('Erro ao criar mensagem:', error);
    res.status(500).json({ error: 'Erro ao criar mensagem' });
  }
});

// PATCH /api/mensagens/:id - Atualizar status (admin only)
router.patch('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pendente', 'visualizado', 'respondido'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }

    const mensagem = await storage.update(parseInt(req.params.id), { status });

    if (!mensagem) {
      return res.status(404).json({ error: 'Mensagem não encontrada' });
    }

    res.json({
      success: true,
      message: 'Status atualizado com sucesso',
      data: mensagem
    });
  } catch (error) {
    console.error('Erro ao atualizar mensagem:', error);
    res.status(500).json({ error: 'Erro ao atualizar mensagem' });
  }
});

// DELETE /api/mensagens/:id - Deletar mensagem (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const deleted = await storage.delete(parseInt(req.params.id));

    if (!deleted) {
      return res.status(404).json({ error: 'Mensagem não encontrada' });
    }

    res.json({
      success: true,
      message: 'Mensagem deletada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar mensagem:', error);
    res.status(500).json({ error: 'Erro ao deletar mensagem' });
  }
});

module.exports = router;

