import React from 'react';

import classes from './Button.css';


const button = (props) => {
	//console.log(props);
	return (
		<button 
			onClick={props.clicked} 
			className={[classes.Button, classes[props.type]].join(' ')}
			disabled={props.disabled} >
			{props.children}
		</button>
	);
}
	

export default button;