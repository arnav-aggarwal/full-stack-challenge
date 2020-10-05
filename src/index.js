import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import 'react-toastify/dist/ReactToastify.min.css';
import 'purecss/build/buttons-min.css';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
