import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector} from "react-redux";
import checkPage from "../../utils";
import CarplayWindow from "./carplayWindow";

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

function Climate(props) {
    const pageTitle = 'carplay'

    const dispatch = useDispatch()

    const classes = useStyles();

    useEffect(() => {
        checkPage(pageTitle)

        // if(pageTitle !== )

    }, [])

    return (
        <div className={classes.root}>
            <CarplayWindow style={{height: '100%', flexGrow: 1}} history={props.history}/>
        </div>
    );
}

export default Climate;