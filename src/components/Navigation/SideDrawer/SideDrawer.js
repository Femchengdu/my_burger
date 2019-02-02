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
			<div className={attachClasses.join(' ')} onClick={props.closed}>
				<div className={classes.Logo} >
					<Logo />
				</div>

				<nav>
					<NavItems is_user_authenticated={props.layout_is_user_authenticated}/>
				</nav>	
			</div>
		</Aux>
		
	);
};

export default sideDrawer;
