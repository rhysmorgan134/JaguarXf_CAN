import { combineReducers } from "redux";
import vehicleInfo from "./vehicleInfo";
import engineDetails from "./engineDetails";
import appDetails from "./appDetails";


export default combineReducers({
    vehicleInfo: vehicleInfo,
    engineDetails: engineDetails,
    appDetails: appDetails
})