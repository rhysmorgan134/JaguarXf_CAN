import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import {BottomNavigation, BottomNavigationAction} from "@material-ui/core";
import NavButton from '../common/NavButton'

const styles = () => ({
    root: {
        width: '100%',
        // position: 'fixed',
        // bottom: 0,
    }
})


class Nav extends Component {
    state = {
        currentNav: 'climate'
    };

    navChange = (event, value) => {
        // this.props.history.push('/' + value)
    };

    render() {
        const { classes } = this.props;
        return (
            <BottomNavigation value={this.state.currentNav} onChange={this.navChange} className={classes.root}>
                <NavButton name={'carplay'}/>
                <NavButton name={'climate'}/>
                <NavButton name={'vehicle'}/>
                <NavButton name={'settings'}/>
            </BottomNavigation>
        );
    }
}

export default withStyles(styles, {})(Nav);