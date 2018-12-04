import React from 'react';

// Wrapping element not needed so use Auxilliary
import Aux from '../../../hoc/Aux';

import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
	// Add logic before the return satement
	const ingredientSummary = Object.keys(props.ingredients).map(
		ingKey => {
			// Wrap the return over multiple lines hence the ()
			return (
				<li key={ingKey}>
					<span style={{textTransform: 'capitalize'}}>
						{ingKey}
					</span>: {props.ingredients[ingKey]}
				</li>
			);
		}
	);

	return (
		<Aux>
			<h3>Your Order</h3>
			<p>Your Burger includes the following ingredients:</p>
			<ul>
				{ingredientSummary}
			</ul>
			<p>Continue Checkout?</p>
			<Button type='Danger' clicked={props.cancel} >CANCEL</Button>
			<Button type='Success' clicked={props.continue} >CONTINUE</Button>
		</Aux>
	);
};


export default orderSummary;





// Function that recieves some props but has an normal function body because some code will be executed hence the
// Curly braces {}

