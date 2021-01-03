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
        alignContent: 'center'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function Climate() {
    console.log("re-rendering")
    const [driversTemp, setDriversTemp] = useState(0.0)
    const pageTitle = 'climate'
    const currentPage = ''
    const dispatch = useDispatch()

    const classes = useStyles();

    useEffect(() => {
        const interval = setInterval(() => {
            setDriversTemp(driversTemp => driversTemp + 1)
        }, 100)
        checkPage(pageTitle)
        return () => clearInterval(interval);

        // if(pageTitle !== )

    }, [])

    const action = (actionDetails) => {
        dispatch(sendAction(actionDetails))
        console.log(actionDetails)
    }



    return (
        <div className={classes.root}>
            <Grid container justify={'center'} alignItems={'center'} spacing={3} direction={'row'}>
                <Grid item xs={4}>
                    <Temperature value={driversTemp} action={action} className={classes.paper} name={'driver'} />
                </Grid>
                <Grid item xs={4}>
                    <CarOverview />
                </Grid>
                <Grid item xs={4} >
                    <Temperature value={21.5} className={classes.paper} action={action} name={'pass'}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default Climate;