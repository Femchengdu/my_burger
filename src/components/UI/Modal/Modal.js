import React from 'react';

import classes from './Modal.css';

const modal = (props) => (
	<div className={classes.Modal}>
		{props.children}
	</div>
);


export default modal;

// Functional component receive props and return JSX
