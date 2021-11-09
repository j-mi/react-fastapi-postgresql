import React from 'react';
import './NavigationItem.css';
import Button from '@material-ui/core/Button';

const NavigationItem = ( props ) => {
    
    return (
    <div className={"NavigationItem"}>
        <Button variant="contained" color="primary">
        {props.children}
      </Button>    
    </div>
    )
};

export default NavigationItem;