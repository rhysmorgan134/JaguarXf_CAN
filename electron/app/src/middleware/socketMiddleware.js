import {socketConnectT} from "../actions";
import {
    SOCKET_CONNECTED,
    SOCKET_CONNECT,
    SOCKET_ACTION,
    SOCKET_ENGINE,
    SOCKET_TRIP,
    CURRENT_PAGE, LEAVE_PAGE, ROOM_JOINED, SOCKET_CLIMATE, MS_ACTION, SOCKET_SETTINGS
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
                console.log("connecting in middleware")
                socket = io({transports: ['websocket'], upgrade: false}).connect('localhost:3000');

                socket.on('connect', (data) => {
                    //onOpen(store)
                    console.log("connected!")
                    store.dispatch({type: SOCKET_CONNECTED, payload: true})
                    socket.emit('join', {room: 'climate'})
                })

                socket.on('error', (data) => {
                    console.log("socket error", data)
                })

                socket.on('disconnect', (reason) => {
		    console.log("disconnected due to ", reason)
                    store.dispatch({type: SOCKET_CONNECTED, payload:false})
                })

                socket.on('engine', (data) => {
                    console.log('indicators', data)
                    // onMessage(store)
                    store.dispatch({type: SOCKET_ENGINE, payload:data})
                })

                socket.on('trip', (data) => {
                    console.log('trip', console.log(data))
                    store.dispatch({type: SOCKET_TRIP, payload:data})
                })

                socket.on('status', (data) => {
                    console.log('status', data)
                })

                socket.on('settings', (data) => {
                    store.dispatch({type: SOCKET_SETTINGS, payload:data})
                })

                socket.on('joining', (data) => {
                    console.log("room joined", data.room)
                    store.dispatch({type: ROOM_JOINED, payload: data.room})
                })

                socket.on('leaving', (data) => {
                    console.log("room left", data.room)
                })

                socket.on('climate', (data) => {
                    store.dispatch({type: SOCKET_CLIMATE, payload: data})
                    console.log('climate', data)
                })
                break;
            case CURRENT_PAGE:
                console.log("joining room", action.payload)
                socket.emit('join', {room: action.payload})
                break;
            case LEAVE_PAGE:
                console.log("leaving room", action.payload, socket)
                socket.emit('leave', {room: action.payload})
                break;
            case SOCKET_ACTION:
                console.log("emitting action", action);
                socket.emit("action", {type: action.payload.actionName , func:action.payload.actionFunction});
                break;
            case MS_ACTION:
                console.log("sending new Action", action.payload)
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
