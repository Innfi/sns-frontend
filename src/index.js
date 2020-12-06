import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/reducks'
import './index.css';
import SignUp from './App';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <SignUp />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
