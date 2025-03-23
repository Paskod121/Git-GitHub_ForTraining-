import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Assurez-vous que ce fichier existe également
import './global.css'; // Importez vos styles globaux

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);