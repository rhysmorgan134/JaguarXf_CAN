import {SOCKET_ENGINE, SOCKET_TRIP} from "../actions/types";

export default (state={}, action) => {
    switch(action.type) {
        case SOCKET_ENGINE:
            return {...state, engine: action.payload};
        case SOCKET_TRIP:
            return {...state, trip: action.payload};
        default:
            return state
    }
}