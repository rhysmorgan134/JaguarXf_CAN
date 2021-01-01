import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'typeface-roboto'
import { createStore, applyMiddleware, compose} from "redux";
import { Provider } from 'react-redux'
import reducers from './reducers'
import reduxThunk from 'redux-thunk'
import socketMiddleware from "./middleware/socketMiddleware";
import { composeWithDevTools } from 'electron-redux-devtools';



const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const middleWare = [reduxThunk, socketMiddleware]

const store = createStore(
    reducers,
    applyMiddleware(...middleWare))

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);

