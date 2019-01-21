import React from 'react';
import classes from './Toolbar.css';
import DrawerToogle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToogle closed={props.drawerToggleClicked}>MENU</DrawerToogle>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>

);

export default toolbar;
