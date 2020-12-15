import React from 'react';
import ReactDOM from 'react-dom';
//import { Provider } from 'react-redux';
//import { store } from './redux/reducks'
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import SignUp from './App';

/**
    <Provider store={store} >
    </Provider>
 */

ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
      <SignUp />
     </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
