import React from 'react';

import classes from './NavItems.css';

import NavItem from './NavItem/NavItem';

const navItems = (props) => (
	<ul className={classes.NavItems}>
		<NavItem link="/">Burger Builder </NavItem>
		{props.is_user_authenticated
			? <NavItem link="/prev-orders">Previous Orders</NavItem>
			: null
		}
		{props.is_user_authenticated 
			?  <NavItem link="/logout">Log Out</NavItem>
			: <NavItem link="/authentication">Sign In</NavItem>
		}
	</ul>
);

export default navItems;