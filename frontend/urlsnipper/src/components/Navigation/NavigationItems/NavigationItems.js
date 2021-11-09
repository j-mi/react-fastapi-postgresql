import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => {

    return (
        <Grid container spacing={1} p={2}>
            <Link to='/' style={{ textDecoration: 'none' }}>
            <NavigationItem>snipper</NavigationItem>
            </Link>
            <Link to='/statistics' style={{ textDecoration: 'none' }}>
            <NavigationItem>statistics</NavigationItem>
            </Link>
        </Grid>
    )
};

export default NavigationItems;