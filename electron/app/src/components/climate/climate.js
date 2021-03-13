import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector} from "react-redux";
import Paper from '@material-ui/core/Paper';
import { sendAction} from "../../actions";
import Grid from '@material-ui/core/Grid';
import Temperature from "./Temperature";
import CarOverview from "./CarOverview";
import checkPage from "../../utils";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function Climate() {
    const pageTitle = 'climate'
    const details = useSelector(state => state.climate);
    const driversTemp = details.driverTempText;
    const passengerTemp = details.passTempText;
    const defrost = details.defrost;
    const rearHeater = details.rearHeater;
    const interiorTemp = details.interiorTemp;
    const auto = details.auto;
    const frontHeater = details.frontHeater;
    const recirc = details.recirc;

    const dispatch = useDispatch()

    const classes = useStyles();

    useEffect(() => {
        checkPage(pageTitle)

        // if(pageTitle !== )

    }, [])

    const action = (actionDetails) => {
        dispatch(sendAction(actionDetails))
    }



    return (
        <div className={classes.root}>
            <Grid container justify={'flex-start'} alignItems={'center'} spacing={3} direction={'row'} height={300} >
                <Grid item xs={4}>
                    <Temperature value={driversTemp} action={action} className={classes.paper} name={'driver'} />
                </Grid>
                <Grid item xs={4}>
                    <CarOverview
                        action={action}
                        rearHeater={rearHeater}
                        frontHeat={frontHeater}
                        auto={auto}
                        defrost={defrost}
                        interiorTemp={interiorTemp}
                        recirc={recirc}
                        />
                </Grid>
                <Grid item xs={4} >
                    <Temperature value={passengerTemp} className={classes.paper} action={action} name={'pass'}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default Climate;