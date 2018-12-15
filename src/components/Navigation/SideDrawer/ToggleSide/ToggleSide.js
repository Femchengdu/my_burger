import React from 'react';

import classes from './ToggleSide.css';


const toggleSide = (props) => (
	<div className={classes.ToggleSide} onClick={props.clicked}>
		<div></div>
		<div></div>
		<div></div>
	</div>
);





export default toggleSide;