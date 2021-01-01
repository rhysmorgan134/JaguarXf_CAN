import {SOCKET_ACTION, SOCKET_CONNECT} from "./types";

export const socketConnectT = (host) => {
    console.log("dispatching connect")
    return {type: SOCKET_CONNECT, host}
}

export const sendAction =(actionDetails)=> {
    return {type: SOCKET_ACTION, payload: actionDetails}
}