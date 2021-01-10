import {CURRENT_PAGE, LEAVE_PAGE, MS_ACTION, SOCKET_ACTION, SOCKET_CONNECT} from "./types";

export const socketConnectT = (host) => {
    console.log("dispatching connect")
    return {type: SOCKET_CONNECT, host}
}

export const sendAction =(actionDetails)=> {
    return {type: SOCKET_ACTION, payload: actionDetails}
}

export const sendMsAction = (actionDetails) => {
    console.log("sending ms action in action")
    return {type: MS_ACTION, payload: actionDetails}
}

export const leavePage = (page) => {
    return {type: LEAVE_PAGE, payload: page}
}

export const updatePage = (page) => {
    return {type: CURRENT_PAGE, payload: page}
}