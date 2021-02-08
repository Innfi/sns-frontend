import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/reducks'
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

/*
TODO
--------------------------------------------------------------------------------
sign up: ensure account is created with valid email
- otherwise receive error from server
sign in: ensure sign in with valid email and password
session: 
- ensure the user session persists within reasonable amount of time 
- can access public/private page after signed in
- cannot access private page after sign out
timeline:
- 

DONE
--------------------------------------------------------------------------------
*/



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
     <BrowserRouter>
      <App />
     </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  //<AppTest />,
  document.getElementById('root')
);
