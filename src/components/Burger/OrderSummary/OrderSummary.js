import React, {Component} from 'react';

// Wrapping element not needed so use Auxilliary
import Aux from '../../../hoc/Aux';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
	// This should be a functional component
	// It was changed to enable debugging
	
	// componentWillUpdate () {
	// 	console.log('[OrderSummary] WillUpdate');
	// }

	render () {
		const ingredientSummary = Object.keys(this.props.ingredients).map(
			ingKey => {
				// Wrap the return over multiple lines hence the ()
				return (
					<li key={ingKey}>
						<span style={{textTransform: 'capitalize'}}>
							{ingKey}
						</span>: {this.props.ingredients[ingKey]}
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
				<p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
				<p>Continue Checkout?</p>
				<Button type='Danger' clicked={this.props.cancel} >CANCEL</Button>
				<Button type='Success' clicked={this.props.continue} >CONTINUE</Button>
			</Aux>
		);
	}
}

export default OrderSummary;





// Function that recieves some props but has an normal function body because some code will be executed hence the
// Curly braces {}

