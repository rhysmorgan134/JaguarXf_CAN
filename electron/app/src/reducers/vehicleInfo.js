import {VEHICLE_INFO_UPDATE} from "../actions/types";

export default (state={}, action) => {
    switch(action.type) {
        case VEHICLE_INFO_UPDATE:
            console.log("vehicle info")
        default:
            return state
    }
}