import React from 'react';

import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl'

const controls = [
	{label: 'Salad', type: 'salad'},
	{label: 'Bacon', type: 'bacon'},
	{label: 'Cheese', type: 'cheese'},
	{label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
	<div className={classes.BuildControls}>
		<p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
		{controls.map(cntrl => (
			<BuildControl 
				key={cntrl.label} 
				label={cntrl.label}
				add={() => props.ingredientAdded(cntrl.type)}
				remove={() => props.ingredientRemoved(cntrl.type)}
				disabled={props.disabled[cntrl.type]} />
		))}
		<button 
		className={classes.OrderButton}
		disabled={props.purchaseable}
		onClick={props.purchase} >{props.is_user_authenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
	</div>
);

export default buildControls;