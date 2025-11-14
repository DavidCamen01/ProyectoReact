import React from 'react';
import ReactDOM from 'react-dom/client';
import IndexApp from './Indexapp';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <IndexApp />
  </React.StrictMode>
);