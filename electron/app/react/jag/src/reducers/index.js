import { combineReducers } from "redux";
import vehicleInfo from "./vehicleInfo";
import engineDetails from "./engineDetails";
import appDetails from "./appDetails";
import climate from "./climate";


export default combineReducers({
    vehicleInfo: vehicleInfo,
    engineDetails: engineDetails,
    appDetails: appDetails,
    climate: climate
})