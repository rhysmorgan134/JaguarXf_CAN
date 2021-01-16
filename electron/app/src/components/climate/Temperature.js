import React from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import {IconButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    largeIcon1: {
        '& svg': {
            fontSize: 100
        }
    }
}))

const Temperature = ({value, action, name}) =>{

    const classes = useStyles()


    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent:'center', alignItems: 'center', verticalAlign: 'middle'}}>
            <IconButton className={classes.largeIcon1}><KeyboardArrowUpIcon fontSize={'large'} onTouchStart={() => action({actionName: name + 'Up', actionFunction: 'pressed'})} onTouchEnd={() => action({actionName: name + 'Up', actionFunction: 'rel'})} style={{color: 'red'}}/></IconButton>
            <Typography align={'center'} variant="h1" component="h2" gutterBottom>{value}°C</Typography>
            <IconButton className={classes.largeIcon1}><KeyboardArrowDownIcon  onTouchStart={() => action({actionName: name + 'Down', actionFunction: 'pressed'})} onTouchEnd={() => action({actionName: name + 'Down', actionFunction: 'rel'})} style={{color: 'blue'}} /></IconButton>
        </div>

    )

}

export default Temperature;