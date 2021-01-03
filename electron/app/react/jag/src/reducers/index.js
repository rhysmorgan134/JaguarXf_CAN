import { combineReducers } from "redux";
import vehicleInfo from "./vehicleInfo";
import engineDetails from "./engineDetails";


export default combineReducers({
    vehicleInfo: vehicleInfo,
    engineDetails: engineDetails
})