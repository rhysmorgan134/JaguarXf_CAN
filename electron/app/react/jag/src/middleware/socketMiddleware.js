import {socketConnectT} from "../actions";
import {SOCKET_CONNECTED, SOCKET_CONNECT, SOCKET_ACTION, SOCKET_ENGINE, SOCKET_TRIP} from "../actions/types";
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
                socket = io.connect('192.168.0.6:3000');

                socket.on('connect', (data) => {
                    //onOpen(store)
                    console.log("connected!")
                    store.dispatch({type: SOCKET_CONNECTED, payload: true})
                })

                socket.on('disconnected', () => {
                    store.dispatch({type: SOCKET_CONNECTED, payload:false})
                })

                socket.on('engine', (data) => {
                    //console.log('indicators', data)
                    // onMessage(store)
                    store.dispatch({type: SOCKET_ENGINE, payload:data})
                })

                socket.on('trip', (data) => {
                    store.dispatch({type: SOCKET_TRIP, payload:data})
                })

                socket.on('status', (data) => {
                    //console.log('status', data)
                })

                socket.on('info', (data) => {
                    //console.log('info', data)
                })
                break;
            case SOCKET_ACTION:
                console.log("emitting action", action.payload);
                socket.emit("action", {type: action.payload.actionName , func:action.payload.actionFunction});
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