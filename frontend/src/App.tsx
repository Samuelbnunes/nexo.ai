import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Importando Páginas
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AppLayout from './pages/AppLayout/AppLayout';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Landing Page na raiz */}
        <Route path="/" element={<LandingPage />} />

        {/* Rotas de Autenticação */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rota Principal da Aplicação */}
        <Route path="/app" element={<AppLayout />} />

        {/* Rota 404 de Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
