import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App.js'
import { history, HistoryRouter } from './router/history.js';
import 'tdesign-react/es/style/index.css'; // 少量公共样式
ReactDOM.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


