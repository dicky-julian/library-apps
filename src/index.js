import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './Pages/App';
import Router from './Routes';

import './Assets/scss/main.scss';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Router />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);