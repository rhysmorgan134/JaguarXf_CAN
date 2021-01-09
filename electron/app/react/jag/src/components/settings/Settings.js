import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from "react-redux";
import checkPage from "../../utils";

function Settings() {

    const pageTitle = 'settings'

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

export default Settings;