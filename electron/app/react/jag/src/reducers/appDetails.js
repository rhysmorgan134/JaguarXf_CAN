import {SOCKET_CONNECTED} from "../actions/types";

export default (state={}, action) => {
    switch(action.type) {
        case SOCKET_CONNECTED:
            return {...state, connected: action.payload}
        default:
            return state
    }
}