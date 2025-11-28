import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom' // Importa o BrowserRouter para habilitar roteamento

// Renderiza a aplicação React no elemento root do HTML
// Envolve o App com BrowserRouter para permitir navegação entre páginas
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Envolve o App com BrowserRouter para habilitar o sistema de rotas */}
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)