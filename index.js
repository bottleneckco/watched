/* eslint-disable import/first */

import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';

dotenv.config();

import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

ReactDOM.render(
  (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('app'),
);
