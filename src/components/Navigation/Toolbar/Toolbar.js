import React from 'react';

import classes from './Toolbar.css';

import Logo from '../../Logo/Logo';

import NavItems from '../NavItems/NavItems';

import ToggleSide from '../SideDrawer/ToggleSide/ToggleSide';


const toolbar = (props) => (
	<header className={classes.Toolbar} >
		<ToggleSide clicked={props.toggleClick}/>
		<div className={classes.Logo}>
			<Logo />
		</div>
		<nav className={classes.DesktopOnly} >
			<NavItems is_user_authenticated={props.layout_is_user_authenticated} />
		</nav>
	</header>

);

export default toolbar;