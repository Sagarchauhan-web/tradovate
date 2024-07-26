import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Toaster } from '@/components/ui/toaster';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>,
);

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  hydrateRoot(<App />, rootElement);
} else {
  createRoot(<App />, rootElement);
}
