import { combineReducers } from "redux";
import vehicleInfo from "./vehicleInfo";
import engineDetails from "./engineDetails";
import appDetails from "./appDetails";
import climate from "./climate";
import settings from "./settings";


export default combineReducers({
    vehicleInfo: vehicleInfo,
    engineDetails: engineDetails,
    appDetails: appDetails,
    climate: climate,
    settings: settings
})