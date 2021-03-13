import React from 'react';
import car from '../../images/car.png'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {SvgIcon, Typography} from "@material-ui/core";
import {ReactComponent as Rear} from '../../images/SVG/rearWindow.svg'
import {ReactComponent as Front} from '../../images/SVG/frontDefrost.svg'
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import {Autorenew, PowerSettingsNew} from "@material-ui/icons";
import Button from "@material-ui/core/Button";



const useStyles = makeStyles((theme) => ({
    image: {
        backgroundColor: 'transparent',
        border: 'none',
        boxShadow: 'none',
        objectFit: 'cover',
        height: '100%',
        maxWidth: '100%'
    },
    imageContainer: {
        height: 100
    },
    largeIcon: {
        fontSize: 100
    },
    noWrap: {
        flexWrap: 'nowrap'
    }
}));

function CarOverview ({rearHeater,frontHeater,auto,defrost,interiorTemp,recirc, action}) {

    const handleClick = (type) => {

    }

    const classes = useStyles();
    return (
        <Grid container justify={'center'} alignItems={'center'} spacing={3} direction={'column'}>

            <Grid item grow={1} xs={12} className={classes.imageContainer} >
                <Grid container justify={'center'} direction={'row'} spacing={1}>
                    <Grid
                        item
                        xs={4}
                        direction={'row'}
                        onTouchStart={() => action({actionName: 'defrost', actionFunction: 'pressed'})}
                        onTouchEnd={() => action({actionName: 'defrost', actionFunction: 'rel'})}
                    >
                        <Button size={'large'}  fullWidth={true}>
                            <SvgIcon fontSize={'large'}>
                                <Front/>
                            </SvgIcon>
                        </Button>
                        <div style={defrost > 0? {height: '5px', backgroundColor: 'orange'} : {}}></div>
                    </Grid>

                    <Grid
                        item
                        xs={4}
                        direction={'row'}
                        onTouchStart={() => action({actionName: 'frontHeater', actionFunction: 'pressed'})}
                        onTouchEnd={() => action({actionName: 'frontHeater', actionFunction: 'rel'})}
                    >
                        <Button size={'large'}  fullWidth={true}>
                            <SvgIcon  fontSize={'large'}>
                                <Front/>
                            </SvgIcon>
                        </Button>
                        <div style={frontHeater > 0? {height: '5px', backgroundColor: 'orange'} : {}}></div>
                    </Grid>
                </Grid>

                <Grid container display={'flex'} direction={'row'} >
                    <Grid item xs={3}>
                        <Box display={'flex'} flexDirection={'column'}>
                            <Box
                                onTouchStart={() => action({actionName: 'auto', actionFunction: 'pressed'})}
                                onTouchEnd={() => action({actionName: 'auto', actionFunction: 'rel'})}
                            >
                                <Button size={'large'}  fullWidth={true}>
                                    AUTO
                                </Button>
                                <div style={auto > 0? {height: '5px', backgroundColor: 'orange'} : {}}></div>
                            </Box>
                            <Box
                                onTouchStart={() => action({actionName: 'rearHeater', actionFunction: 'pressed'})}
                                onTouchEnd={() => action({actionName: 'rearHeater', actionFunction: 'rel'})}
                            >
                                <Button size={'large'}  fullWidth={true}>
                                    <SvgIcon fontSize={'large'}>
                                        <Rear/>
                                    </SvgIcon>
                                </Button>
                                <div style={rearHeater > 0? {height: '5px', backgroundColor: 'orange'} : {}}></div>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
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
                    <Grid item xs={3}>
                        <Box display={'flex'} flexDirection={'column'}>
                            <Box
                                onTouchStart={() => action({actionName: 'recirc', actionFunction: 'pressed'})}
                                onTouchEnd={() => action({actionName: 'recirc', actionFunction: 'rel'})}>
                                <Button size={'large'}  fullWidth={true}>
                                    <Autorenew fontSize={'large'}>
                                        <Rear />
                                    </Autorenew>
                                </Button>
                                <div style={recirc > 0? {height: '5px', backgroundColor: 'orange'} : {}}></div>
                            </Box>
                            <Box
                                onTouchStart={() => action({actionName: 'fanOn', actionFunction: 'pressed'})}
                                onTouchEnd={() => action({actionName: 'fanOn', actionFunction: 'rel'})}
                            >
                                <Button size={'large'}  fullWidth={true}>
                                    <PowerSettingsNew fontSize={'large'}>
                                        <Rear />
                                    </PowerSettingsNew>
                                </Button>
                                <div style={auto > 0? {height: '5px', backgroundColor: 'orange'} : {}}></div>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={10}>
                <Typography align={'center'} variant="caption" component="p" gutterBottom>Interior Temp<br />18°C</Typography>
            </Grid>
        </Grid>
    )
}

export default CarOverview;