import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./styles/globals.css";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";
import SecretAdminLink from "./components/SecretAdminLink";
import Home from "./page/Home";
import Planos from "./page/Planos";
import Portfolio from "./page/Portfolio";
import ComoFunciona from "./page/ComoFunciona";
import Orcamento from "./page/Orcamento";
import FAQ from "./page/FAQ";
import Contato from "./page/Contato";
import Footer from "./page/footer";
import NotFound from "./page/NotFound";
// Admin Routes
import AdminLogin from "./pages/admin/Login";
import ForgotPassword from "./pages/admin/ForgotPassword";
import AdminDashboard from "./pages/admin/Dashboard";
import ProjectForm from "./pages/admin/ProjectForm";
import ProtectedRoute from "./components/admin/ProtectedRoute";
// Utils
import { aplicarCores } from "./utils/colorUtils";
import SEOHead from "./components/SEOHead";
import ToastContainer from "./components/ToastContainer";
import { useToast } from "./hooks/useToast";

function App() {
  const location = useLocation();
  const { toasts, removeToast } = useToast();
  
  // Não mostrar Navbar, Chatbot e Footer nas rotas admin
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Carregar cores personalizadas ao iniciar
  useEffect(() => {
    const savedCores = localStorage.getItem('site_cores');
    if (savedCores) {
      const cores = JSON.parse(savedCores);
      aplicarCores(cores);
      
      // Aplicar cores de tema diretamente no body
      if (cores.bodyBackground) {
        document.body.style.backgroundColor = cores.bodyBackground;
      }
      if (cores.bodyText) {
        document.body.style.color = cores.bodyText;
      }
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-secondary-50">
      {/* SEO Head - Atualiza meta tags dinamicamente */}
      <SEOHead />

      {/* Navbar */}
      {!isAdminRoute && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/como-funciona" element={<ComoFunciona />} />
          <Route path="/orcamento" element={<Orcamento />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contato" element={<Contato />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/projects/new" 
            element={
              <ProtectedRoute>
                <ProjectForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/projects/:id/edit" 
            element={
              <ProtectedRoute>
                <ProjectForm />
              </ProtectedRoute>
            } 
          />
          
          {/* Rota fallback - Página 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Chatbot Flutuante */}
      {!isAdminRoute && <Chatbot />}

      {/* Footer */}
      {!isAdminRoute && <Footer />}

      {/* Link Secreto para Admin */}
      {!isAdminRoute && <SecretAdminLink />}

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default App;
