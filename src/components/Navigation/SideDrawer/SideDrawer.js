import React from 'react';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux2/Aux2';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css'

const sideDrawer = (props) => {

    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.closed}/>
            <div className={[classes.SideDrawer, props.show ? classes.Open : classes.Close].join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;
