import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers'
import reduxThunk from 'redux-thunk'
import socketMiddleware from "./middleware/socketMiddleware";

const middleWare = [reduxThunk, socketMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middleWare)))

export default store;