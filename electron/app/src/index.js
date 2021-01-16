import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'typeface-roboto'
import { Provider } from 'react-redux'
import store from "./store";
import socketMiddleware from "./middleware/socketMiddleware";
import { composeWithDevTools } from 'electron-redux-devtools';

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);

