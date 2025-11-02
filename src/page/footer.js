import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Code } from 'lucide-react';
import '../style/footer.css';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Coluna 1 - Sobre */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Code className="w-6 h-6 text-blue-400" />
              <h3 className="text-white font-bold text-lg">WebPro Sites</h3>
            </div>
            <p className="text-sm text-gray-400">
              Criamos sites profissionais para fisioterapeutas e eletricistas. 
              Planos claros, agendamento integrado e suporte que funciona.
            </p>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div>
            <h4 className="text-white font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/planos" className="hover:text-blue-400 transition-colors">
                  Planos e Preços
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-blue-400 transition-colors">
                  Portfólio
                </Link>
              </li>
              <li>
                <Link to="/como-funciona" className="hover:text-blue-400 transition-colors">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-blue-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Serviços */}
          <div>
            <h4 className="text-white font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/planos" className="hover:text-blue-400 transition-colors">
                  Sites para Fisioterapeutas
                </a>
              </li>
              <li>
                <a href="/planos" className="hover:text-blue-400 transition-colors">
                  Sites para Eletricistas
                </a>
              </li>
              <li>
                <a href="/planos" className="hover:text-blue-400 transition-colors">
                  Sistema de Agendamento
                </a>
              </li>
              <li>
                <a href="/planos" className="hover:text-blue-400 transition-colors">
                  Manutenção de Sites
                </a>
              </li>
              <li>
                <a href="/orcamento" className="hover:text-blue-400 transition-colors">
                  Solicitar Orçamento
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 4 - Contato */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 text-blue-400 flex-shrink-0" />
                <a href="mailto:contato@webprosites.com" className="hover:text-blue-400 transition-colors">
                  contato@webprosites.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 text-blue-400 flex-shrink-0" />
                <a href="tel:+5511999999999" className="hover:text-blue-400 transition-colors">
                  (11) 99999-9999
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 text-blue-400 flex-shrink-0" />
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2025 WebPro Sites. Todos os direitos reservados.
            </div>
            <div className="flex gap-6 text-gray-400">
              <Link to="/termos" className="hover:text-blue-400 transition-colors">
                Termos de Uso
              </Link>
              <span className="text-gray-600">|</span>
              <Link to="/privacidade" className="hover:text-blue-400 transition-colors">
                Política de Privacidade
              </Link>
              <span className="text-gray-600">|</span>
              <Link to="/contato" className="hover:text-blue-400 transition-colors">
                Contato
              </Link>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mt-4 text-center">
          <span className="text-xs text-gray-500">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Todos os sistemas operacionais
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
