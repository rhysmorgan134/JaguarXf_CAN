import React from 'react';
import { BottomNavigationAction} from "@material-ui/core";
import { Link } from 'react-router-dom';
import AcUnitIcon from '@material-ui/icons/AcUnit'
import DriveEtaIcon from '@material-ui/icons/DriveEta'
import SettingsIcon from '@material-ui/icons/Settings'

function NavButton ({name}) {
    return(

        <BottomNavigationAction
            component={Link}
            to={name}
            icon={name === 'climate' ?
                    <AcUnitIcon /> :
                name === 'vehicle' ?
                    <DriveEtaIcon /> :
                name === 'settings' ?
                    <SettingsIcon /> :
                    <AcUnitIcon />
            }
        />
    )
}

export default NavButton;