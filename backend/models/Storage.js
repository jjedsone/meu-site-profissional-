// Sistema de armazenamento simples usando arquivo JSON
// Em produção, substitua por MongoDB, PostgreSQL, etc.

const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const ensureDataDir = async () => {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    // Pasta já existe
  }
};

class Storage {
  constructor(filename) {
    this.filename = path.join(DATA_DIR, `${filename}.json`);
    this.ensureFile();
  }

  async ensureFile() {
    await ensureDataDir();
    try {
      await fs.access(this.filename);
    } catch {
      // Arquivo não existe, criar com array vazio
      await fs.writeFile(this.filename, JSON.stringify([], null, 2));
    }
  }

  async read() {
    try {
      const data = await fs.readFile(this.filename, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Erro ao ler ${this.filename}:`, error);
      return [];
    }
  }

  async write(data) {
    try {
      await fs.writeFile(this.filename, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error(`Erro ao escrever ${this.filename}:`, error);
      throw error;
    }
  }

  async findAll() {
    return await this.read();
  }

  async findById(id) {
    const items = await this.read();
    return items.find(item => item.id === id);
  }

  async create(item) {
    const items = await this.read();
    const newItem = {
      ...item,
      id: item.id || Date.now() + Math.random(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    items.push(newItem);
    await this.write(items);
    return newItem;
  }

  async update(id, updates) {
    const items = await this.read();
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) {
      return null;
    }

    items[index] = {
      ...items[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    await this.write(items);
    return items[index];
  }

  async delete(id) {
    const items = await this.read();
    const filtered = items.filter(item => item.id !== id);
    
    if (filtered.length === items.length) {
      return null; // Item não encontrado
    }

    await this.write(filtered);
    return { id };
  }

  async findBy(query) {
    const items = await this.read();
    return items.filter(item => {
      return Object.keys(query).every(key => item[key] === query[key]);
    });
  }
}

module.exports = Storage;

