import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from "react-redux";
import checkPage from "../../utils";

function VehicleInfo() {

    const pageTitle = 'vehicleInfo'

    useEffect(() => {
        checkPage(pageTitle)
        // if(pageTitle !== )
    }, [])

        return (
            <div>
                Vehicle Info
            </div>
        );
}

export default VehicleInfo;