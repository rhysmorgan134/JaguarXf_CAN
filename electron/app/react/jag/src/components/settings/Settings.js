import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from "react-redux";
import {Switch, FormGroup, FormControlLabel, Box} from '@material-ui/core';
import checkPage from "../../utils";
import {sendMsAction} from "../../actions";

function Settings() {

    const pageTitle = 'settings'
    const details = useSelector(state => state.settings.bools);
    const dispatch = useDispatch()

    useEffect(() => {
        checkPage(pageTitle)
        // if(pageTitle !== )
    }, [])

    const handleChange = (event) => {
        console.log("toggle change", {id: 680, type: event.target.name, value: event.target.checked})
        dispatch(sendMsAction({bus:'ms', id: 680, type: event.target.name, value: event.target.checked}));
    };

    const renderSwitch = (item) => {
        return(
            <FormControlLabel style={{maxHeight: '350px'}}
                control={
                    <Switch
                        checked={details[item[0]]}
                        onChange={handleChange}
                        name={item[0]}
                        color="primary"
                    />
                }
                label={item[0].replaceAll("_", " ")}
            />
        )
    }

    return (
        // <Box> maxHeight={350} overflow={'scroll'}
        <Box>
            <FormGroup column>
                {details ? Object.entries(details).map(item => renderSwitch(item)) : <div>Loading</div>}
            </FormGroup>
        </Box>

    );
}

export default Settings;