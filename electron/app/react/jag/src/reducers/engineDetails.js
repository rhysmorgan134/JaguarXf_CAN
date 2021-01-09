import {SOCKET_ENGINE, SOCKET_TRIP} from "../actions/types";

export default (state={trip: {coolant: 0, speed:0, revs: 0, oil: 0}}, action) => {
    switch(action.type) {
        case SOCKET_ENGINE:
            return {...state, engine: action.payload};
        case SOCKET_TRIP:
            return {...state, trip: action.payload};
        default:
            return state
    }
}