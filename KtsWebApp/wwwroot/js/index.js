import React from 'react';
import { createRoot } from 'react-dom/client'; 
import Registration from './components/Registration';

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Registration />
    </React.StrictMode>
);