import React from 'react'
import {Box, Typography, LinearProgress, withStyles} from "@material-ui/core";

const DataBoxSingleLine = ({data}) => {

    return (
        <div>
            {data ?
                <div>
                    <Typography variant="subtitle1" component="h4" gutterBottom align={'center'}>
                        {data.pre}
                    </Typography>
                    <Box display={'flex'} flexDirection={'row'} alignContent={'center'} justifyContent={'center'}>
                        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                            <Typography variant="subtitle2" component="p" gutterBottom align={'center'}>
                                {data.val}
                            </Typography>
                        </Box>
                        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                            <Typography variant="subtitle2" component="p" gutterBottom align={'center'}>
                                {data.suf}
                            </Typography>
                        </Box>

                    </Box>
                </div>
                : <div>
                    loading
                </div>

            }

        </div>
    )
}

export default DataBoxSingleLine;