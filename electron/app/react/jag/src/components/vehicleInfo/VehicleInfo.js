import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from "react-redux";
import {Grid, Box} from "@material-ui/core";
import checkPage from "../../utils";
import DataBox from "../common/DataBox";
import DataBoxSingleLine from "../common/DataBoxSingleLine";

function VehicleInfo() {

    const pageTitle = 'vehicleInfo';
    const details = useSelector(state => state.engineDetails.trip);


    useEffect(() => {
        checkPage(pageTitle)
        // if(pageTitle !== )
    }, [])

        return (
            <Box display={'flex'} size={100} justifyContent={'space-between'} flexDirection={'column'} flexGrow={1}>
                <Grid container justify={'center'} alignItems={'center'} alignContent={'center'} spacing={3} >
                    <Grid item xs={6}>
                        <DataBox value={details.speed } title={'Speed'} units={'MPH'} min={0} max={140} limit={80}/>
                    </Grid>
                    <Grid item xs={6}>
                        <DataBox value={details.revs} title={'Engine Speed'} units={'RPM'} min={0} max={5000} limit={800}/>
                    </Grid>
                    <Grid item xs={6}>
                        <DataBox value={details.coolant} title={'Coolant Temp'} units={'°C'} min={0} max={120} limit={100}/>
                    </Grid>
                    <Grid item xs={6}>
                        <DataBox value={details.oil} title={'Oil Temp'} units={'°C'} min={'0'} max={120} limit={100}/>
                    </Grid>
                </Grid>
                <Grid container justify={'space-between'}>
                    <DataBoxSingleLine data={details.tripMpg} />
                    <DataBoxSingleLine data={details.tripAvg} />
                    <DataBoxSingleLine data={details.tripDistance}/>
                    <DataBoxSingleLine data={details.tripRange}/>
                </Grid>
            </Box>

        );
}

export default VehicleInfo;