import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { UserContextProvider } from './store/user-context'

ReactDOM.render(
    <UserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </UserContextProvider>,
    document.getElementById('root')
);

