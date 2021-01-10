import React from 'react'
import {Box, Typography, LinearProgress, withStyles} from "@material-ui/core";

const DataBox = ({title, value, units, min, max, limit}) => {
    const normalise = value => (value - min) * 100 / (max - min);

    const BorderLinearProgress = withStyles((theme) => ({
        root: {
            height: 10,
            borderRadius: 5,
            marginLeft: '10%',
            marginRight: '10%'
        },
        colorPrimary: {
            backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 300 : 700],
        },
        colorSecondary: {
            color: '#FFFFFF'
        },
        bar: {
            borderRadius: 5,
            backgroundColor: value < limit ? '#1a90ff' : '#FF0000',
            color: 'FF0000'
        },
    }))(LinearProgress);

    return (
        <div>
            <Typography variant="h3" component="h3" gutterBottom align={'center'}>
                {title}
            </Typography>
            <Box display={'flex'} flexDirection={'row'} alignContent={'center'} justifyContent={'center'}>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    <Typography variant="h1" component="h1" gutterBottom align={'center'}>
                        {value}
                    </Typography>
                </Box>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    <Typography variant="subtitle1" component="p" gutterBottom align={'center'}>
                        {units}
                    </Typography>
                </Box>

            </Box>
            <BorderLinearProgress variant="determinate" value={normalise(value)} />

        </div>
    )
}

export default DataBox;