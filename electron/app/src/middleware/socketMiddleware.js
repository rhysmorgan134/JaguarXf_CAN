import {socketConnectT} from "../actions";
import {
    SOCKET_CONNECTED,
    SOCKET_CONNECT,
    SOCKET_ACTION,
    SOCKET_ENGINE,
    SOCKET_TRIP,
    CURRENT_PAGE, LEAVE_PAGE, ROOM_JOINED, SOCKET_CLIMATE, MS_ACTION, SOCKET_SETTINGS, GENERAL
} from "../actions/types";
import io from "socket.io-client";

const socketMiddleware = () => {
    let socket= null;

    // const onOpen = store => (event) => {
    //     console.log("opening socket: ", event.target.url)
    //     store.dispatch(socketConnectT(event.target.url))
    // }

    const onMessage = store => (data) => {
        // const payload = JSON.parse(event.data);
        //console.log('receiving server message', payload);
    }

    return store => next => action => {
        switch (action.type) {
            case SOCKET_CONNECT:
                socket = io({transports: ['websocket'], upgrade: false}).connect('localhost:3000');

                socket.on('connect', (data) => {
                    //onOpen(store)
                    console.log("connected!")
                    store.dispatch({type: SOCKET_CONNECTED, payload: true})
                    socket.emit('join', {room: 'climate'})
                    socket.emit('join', {room: 'general'})
                })

                socket.on('error', (data) => {
                    console.log("socket error", data)
                })

                socket.on('disconnect', (reason) => {
		    console.log("disconnected due to ", reason)
                    store.dispatch({type: SOCKET_CONNECTED, payload:false})
                })

                socket.on('engine', (data) => {
                    // onMessage(store)
                    store.dispatch({type: SOCKET_ENGINE, payload:data})
                })

                socket.on('general', (data) => {
                    store.dispatch({type: GENERAL, payload:data})
                })

                socket.on('trip', (data) => {
                    store.dispatch({type: SOCKET_TRIP, payload:data})
                })

                socket.on('status', (data) => {
                })

                socket.on('settings', (data) => {
                    store.dispatch({type: SOCKET_SETTINGS, payload:data})
                })

                socket.on('joining', (data) => {
                    store.dispatch({type: ROOM_JOINED, payload: data.room})
                })

                socket.on('leaving', (data) => {
                })

                socket.on('climate', (data) => {
                    store.dispatch({type: SOCKET_CLIMATE, payload: data})
                })
                break;
            case CURRENT_PAGE:
                socket.emit('join', {room: action.payload})
                break;
            case LEAVE_PAGE:
                socket.emit('leave', {room: action.payload})
                break;
            case SOCKET_ACTION:
                socket.emit("action", {type: action.payload.actionName , func:action.payload.actionFunction});
                break;
            case MS_ACTION:
                socket.emit('newAction', action.payload);
                break;
            // case SOCKET_ENGINE:
            //     console.log("engine info", action.payload);
            // case SOCKET_TRIP:
            //     console.log("trip info", action.payload);
            default:return next(action)
        }
    }
}

export default socketMiddleware();
