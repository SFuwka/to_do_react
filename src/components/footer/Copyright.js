import { Typography } from '@material-ui/core';
import React from 'react'
import { NavLink } from 'react-router-dom';
import { linkStyle } from '../commonStyles';

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <NavLink style={linkStyle} color="inherit" to="/">
                AlexReactNodeJs
      </NavLink>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright