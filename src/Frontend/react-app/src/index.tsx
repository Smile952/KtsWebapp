import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/bootstrap.min.css';
import './css/index.css';
import { BrowserRouter } from 'react-router-dom';
import { App } from './ts/App';
import { store } from 'store/store';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
