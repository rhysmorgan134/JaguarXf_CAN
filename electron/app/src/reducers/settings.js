import {SOCKET_SETTINGS} from "../actions/types";


export default (state={}, action) => {
    switch(action.type) {
        case SOCKET_SETTINGS:
            return {...state, bools: action.payload};
        default:
            return state
    }
}