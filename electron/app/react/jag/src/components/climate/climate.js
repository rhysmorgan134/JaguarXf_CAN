import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Temperature from "./Temperature";
import CarOverview from "./CarOverview";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function Climate() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container justify={'center'} alignItems={'center'} spacing={3} direction={'row'}>
                <Grid item xs={4}>
                    <Temperature value={19.5} className={classes.paper} />
                </Grid>
                <Grid item xs={4}>
                    <CarOverview />
                </Grid>
                <Grid item xs={4} >
                    <Temperature value={21.5} className={classes.paper} />
                </Grid>
            </Grid>
        </div>
    );
}

export default Climate;