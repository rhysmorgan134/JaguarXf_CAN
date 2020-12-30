import React from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

const Temperature = ({value}) =>{

    return (
        <div style={{justifyContent: 'center', alignContent:'center'}}>
            <Button size={'large'}  fullWidth={true}><KeyboardArrowUpIcon style={{color: 'red'}}/></Button>
            <Typography align={'center'} variant="h1" component="h2" gutterBottom>{value}°C</Typography>
            <Button size={'large'} fullWidth={true}><KeyboardArrowDownIcon style={{color: 'blue'}} /></Button>
        </div>

    )

}

export default Temperature;