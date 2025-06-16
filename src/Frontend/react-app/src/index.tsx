import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/bootstrap.min.css';
import './css/index.css';
import { BrowserRouter } from 'react-router-dom';
import { App } from './ts/App';
import { store, persistor } from 'store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
