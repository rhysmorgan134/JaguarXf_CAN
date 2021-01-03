import {CURRENT_PAGE, LEAVE_PAGE, ROOM_JOINED, SOCKET_CONNECTED} from "../actions/types";

export default (state={currentPage: 'climate'}, action) => {
    switch(action.type) {
        case SOCKET_CONNECTED:
            return {...state, connected: action.payload}
        case ROOM_JOINED:
            return {...state, currentPage: action.payload}
        default:
            return state
    }
}