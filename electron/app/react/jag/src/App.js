import React from 'react';
import {HashRouter, Switch, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux'
import Settings from "./components/settings/Settings";
import Climate from "./components/climate/climate";
import VehicleInfo from "./components/vehicleInfo/VehicleInfo";
import './App.css';
import Nav from "./components/nav/Nav";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
const remote = window.require('electron').remote;
;

const {BrowserWindow,dialog,Menu} = remote;

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    },
    nav: {
        marginTop: 'auto'
    }
}));

function App() {
    const classes = useStyles();
    const prefersDarkMode =  useMediaQuery('(prefers-color-scheme: dark)')

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light'
                }
            }),
                [prefersDarkMode]
    )

    return (
        <ThemeProvider theme={theme}>
            <Box className={classes.root}>
                <HashRouter>
                    <div className={`${classes.content}`}>
                        <Switch>
                            <Route exact path="/" component={Climate}/>
                            <Route exact path="/climate" component={Climate}/>
                            <Route exact path="/vehicle" component={VehicleInfo}/>
                            <Route exact path="/settings" component={Settings}/>
                        </Switch>
                    </div>
                    <Nav />
                </HashRouter>
            </Box>
        </ThemeProvider>
    )
}
export default App;
