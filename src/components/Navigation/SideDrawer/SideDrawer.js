import React from 'react';

import Logo from '../../Logo/Logo';

import NavItems from '../NavItems/NavItems';

import classes from './SideDrawer.css';

import Backdrop from '../../UI/Backdrop/Backdrop';

import Aux from '../../../hoc/Aux';

const sideDrawer = (props) => {
	let attachClasses = [classes.SideDrawer, classes.Close];

	if (props.open) {
		attachClasses = [classes.SideDrawer, classes.Open];
	}
	return (
		<Aux>
			<Backdrop 
			show={props.open} 
			close={props.closed}/>
			<div className={attachClasses.join(' ')}>
				<div className={classes.Logo}>
					<Logo />
				</div>

				<nav>
					<NavItems />
				</nav>	
			</div>
		</Aux>
		
	);
};

export default sideDrawer;
