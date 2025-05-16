import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import App from './App.jsx';         // Página principal (por exemplo, Login)
import Cadastro from './cadastro.jsx'; // Página de cadastro
import Forgot from './forgot.jsx';   // Página de recuperação de senha

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/forgot" element={<Forgot />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
