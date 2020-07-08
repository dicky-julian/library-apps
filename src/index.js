import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import storage from './Redux/store';

import App from './Pages/App';
import Router from './Routes';

import './Assets/scss/main.scss';
import './Assets/scss/responsive.scss';

const { store, persiststore } = storage;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persiststore}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
          <Router />
        </BrowserRouter>
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);