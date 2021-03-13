import {CURRENT_PAGE, GENERAL, LEAVE_PAGE, ROOM_JOINED, SOCKET_CONNECTED} from "../actions/types";

export default (state={currentPage: 'climate', dark: false}, action) => {
    switch(action.type) {
        case SOCKET_CONNECTED:
            return {...state, connected: action.payload}
        case ROOM_JOINED:
            return {...state, currentPage: action.payload}
        case GENERAL:
            return {...state, dark: action.payload.dark}
        default:
            return state
    }
}