const express = require('express');
const Storage = require('../models/Storage');
const { validateOrcamento } = require('../middleware/validation');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();
const storage = new Storage('orcamentos');

// GET /api/orcamentos - Listar todos os orçamentos (admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { status, search } = req.query;
    let orcamentos = await storage.findAll();

    // Filtrar por status
    if (status) {
      orcamentos = orcamentos.filter(o => o.status === status);
    }

    // Buscar por texto (nome, email, profissao)
    if (search) {
      const searchLower = search.toLowerCase();
      orcamentos = orcamentos.filter(o => 
        o.nomeCompleto?.toLowerCase().includes(searchLower) ||
        o.email?.toLowerCase().includes(searchLower) ||
        o.profissao?.toLowerCase().includes(searchLower)
      );
    }

    // Ordenar por data (mais recente primeiro)
    orcamentos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      count: orcamentos.length,
      data: orcamentos
    });
  } catch (error) {
    console.error('Erro ao listar orçamentos:', error);
    res.status(500).json({ error: 'Erro ao listar orçamentos' });
  }
});

// GET /api/orcamentos/:id - Obter orçamento específico (admin only)
router.get('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const orcamento = await storage.findById(parseInt(req.params.id));
    
    if (!orcamento) {
      return res.status(404).json({ error: 'Orçamento não encontrado' });
    }

    res.json({
      success: true,
      data: orcamento
    });
  } catch (error) {
    console.error('Erro ao obter orçamento:', error);
    res.status(500).json({ error: 'Erro ao obter orçamento' });
  }
});

// POST /api/orcamentos - Criar novo orçamento (público)
router.post('/', validateOrcamento, async (req, res) => {
  try {
    const novoOrcamento = {
      ...req.body,
      status: 'pendente',
      dataFormatada: new Date().toLocaleString('pt-BR')
    };

    const orcamento = await storage.create(novoOrcamento);

    res.status(201).json({
      success: true,
      message: 'Orçamento enviado com sucesso! Entraremos em contato em até 48 horas.',
      data: orcamento
    });
  } catch (error) {
    console.error('Erro ao criar orçamento:', error);
    res.status(500).json({ error: 'Erro ao criar orçamento' });
  }
});

// PATCH /api/orcamentos/:id - Atualizar status (admin only)
router.patch('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pendente', 'visualizado', 'respondido'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }

    const orcamento = await storage.update(parseInt(req.params.id), { status });

    if (!orcamento) {
      return res.status(404).json({ error: 'Orçamento não encontrado' });
    }

    res.json({
      success: true,
      message: 'Status atualizado com sucesso',
      data: orcamento
    });
  } catch (error) {
    console.error('Erro ao atualizar orçamento:', error);
    res.status(500).json({ error: 'Erro ao atualizar orçamento' });
  }
});

// DELETE /api/orcamentos/:id - Deletar orçamento (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const deleted = await storage.delete(parseInt(req.params.id));

    if (!deleted) {
      return res.status(404).json({ error: 'Orçamento não encontrado' });
    }

    res.json({
      success: true,
      message: 'Orçamento deletado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar orçamento:', error);
    res.status(500).json({ error: 'Erro ao deletar orçamento' });
  }
});

module.exports = router;

