import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';


import { Provider } from 'react-redux'
// import reduxStore from './store/store'
import { store } from './newStore/store';

import AuthChecker from './components/AuthChecker'


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthChecker />
    </Provider>
  </React.StrictMode>
);


