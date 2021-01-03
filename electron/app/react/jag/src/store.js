import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers'
import reduxThunk from 'redux-thunk'
import socketMiddleware from "./middleware/socketMiddleware";

const middleWare = [reduxThunk, socketMiddleware]

const store = createStore(
    reducers,
    applyMiddleware(...middleWare))

export default store;