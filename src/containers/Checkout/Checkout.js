//......
import React, {Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
	state = {
		ingredients: {}
	}

	componentDidMount () {
		const urlQuery = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		for (let ingredient of urlQuery.entries()) {
			ingredients[ingredient[0]] = +ingredient[1];
		}
		this.setState({ingredients: ingredients});
		//console.log('componentDidMount:', this.state.ingredients);
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
