import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import'./css/reset.css';
import'./css/style.css';
import'./css/comp-menu.css';
import'./css/comp-calc.css';
import'./css/comp-bim.css';
import'./css/comp-dday.css';
import './css/coatchmark.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);

