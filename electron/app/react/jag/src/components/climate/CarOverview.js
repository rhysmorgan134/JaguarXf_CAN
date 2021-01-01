import React from 'react';
import car from '../../images/car.png'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {SvgIcon, Typography} from "@material-ui/core";
import {ReactComponent as Rear} from '../../images/SVG/rearWindow.svg'
import {ReactComponent as Front} from '../../images/SVG/frontDefrost.svg'
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Button from "@material-ui/core/Button";



const useStyles = makeStyles((theme) => ({
    image: {
        backgroundColor: 'transparent',
        border: 'none',
        boxShadow: 'none',
        objectFit: 'cover',
        maxHeight: 230,
        maxWidth: '100%'
    },
    imageContainer: {
        height: 230
    },
    largeIcon: {
        fontSize: 100
    }
}));

function CarOverview () {
    const classes = useStyles();
    return (
        <Grid container justify={'center'} alignItems={'center'} spacing={3} direction={'row'}>
            <Grid item xs={6}>
                <Button size={'large'}  fullWidth={true}>
                    <SvgIcon style={{color:'red'}} fontSize={'large'}>
                        <Front/>
                    </SvgIcon>
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button size={'large'}  fullWidth={true}>
                    <SvgIcon style={{color:'red'}} fontSize={'large'} viewBox={'0 0 24 24'}>
                        <Front/>
                    </SvgIcon>
                </Button>
            </Grid>
            <Grid  item xs={16} className={classes.imageContainer}>
                <Card className={classes.image}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            image={car}
                        />
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Button size={'large'}  fullWidth={true}>
                    <SvgIcon style={{color:'red'}} fontSize={'large'} viewBox={'0 0 24 24'}>
                        <Rear/>
                    </SvgIcon>
                </Button>
            </Grid>
            <Grid item xs={10}>
                <Typography align={'center'} variant="caption" component="p" gutterBottom>Interior Temp<br />18°C</Typography>
            </Grid>
        </Grid>
    )
}

export default CarOverview;