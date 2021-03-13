import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from "react-redux";
import {Switch, FormGroup, FormControlLabel, Box, Container, Divider} from '@material-ui/core';
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
        dispatch(sendMsAction({bus:'ms', id: 680, type: event.target.name, value: event.target.checked}));
    };

    const renderSwitch = (item) => {
        return(
            <React.Fragment>
                <FormControlLabel
                      display={'flex'}
                      key={item[0]}
                        style={{justifyContent: 'space-between'}}
                      labelPlacement={'start'}
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
                <Divider />
            </React.Fragment>

        )
    }

    return (
        // <Box> maxHeight={350} overflow={'scroll'}
        <Container>
            <FormGroup column>
                {details ? Object.entries(details).map(item => renderSwitch(item)) : <div>Loading</div>}
            </FormGroup>
        </Container>

    );
}

export default Settings;