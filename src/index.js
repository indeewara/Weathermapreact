import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import View from './View';
import './index.css';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

const view = ReactDOM.createRoot(document.getElementById('view-root'));
view.render(<View />);











