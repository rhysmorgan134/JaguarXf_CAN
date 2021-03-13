import {SOCKET_CLIMATE} from "../actions/types";

export default (state={}, action) => {
    switch(action.type) {
        case SOCKET_CLIMATE:
            return {...state, ...action.payload};
        default:
            return state
    }
}