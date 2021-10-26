import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import { Provider } from 'react-redux'
import reduxStore from './store/store'

import {AuthChecker} from './components/AuthChecker'



ReactDOM.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <AuthChecker />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

