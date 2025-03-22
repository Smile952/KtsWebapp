import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/bootstrap.min.css';
import './css/index.css';
import { AutorizationPage } from './js/pages/AutorizationPage';
import { DevTypesPage } from './js/pages/DevTypesPage';
import { RequestPage } from './js/pages/RequestPage';
import { RegistrationPage } from './js/pages/RegistrationPage'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AutorizationPage />
  </React.StrictMode>
);