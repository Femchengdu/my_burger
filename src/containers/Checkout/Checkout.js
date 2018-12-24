import React, {Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
	state = {
		ingredients: {
			salad: 1,
			meat: 1,
			cheese: 1,
			bacon: 1
		}
	}

	checkoutContinue = () => {
		this.props.history.replace('checkout/contact-data');
	}

	checkoutCancel = () => {
		this.props.history.goBack();
	}
	/*
		Implement a render method
		then return JSX
	*/

	// Testing the componenet did mount
	// componentDidMount () {
	// 	console.log(this.props);
	// }
	render () {
		return (
			<div>
				<CheckoutSummary 
				ingredients={this.state.ingredients}
				continue={this.checkoutContinue}
				cancel={this.checkoutCancel}/>
			</div>
		);
	}
}

export default Checkout;