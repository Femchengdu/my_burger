import React from 'react';

import classes from './Toolbar.css';

import Logo from '../../Logo/Logo';

import NavItems from '../NavItems/NavItems';

import ToggleSide from '../SideDrawer/ToggleSide/ToggleSide';


const toolbar = (props) => (
	<header className={classes.Toolbar} >
		<ToggleSide clicked={props.toggleClick}/>
		<Logo />
		<nav className={classes.DesktopOnly} >
			<NavItems />
		</nav>
	</header>

);

export default toolbar;