//......
import React, {Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import {Route} from 'react-router-dom';

import ContactData from './ContactData/ContactData';

import {connect} from 'react-redux';

class Checkout extends Component {

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
				ingredients={this.props.reducer_ingredients}
				continue={this.checkoutContinue}
				cancel={this.checkoutCancel}/>
				
				<Route 
					path={this.props.match.path + '/contact-data'} 
					component={ContactData}
				/>
			</div>
		);
	}
}

const map_redux_state_to_props = state =>  {
	return {
		reducer_ingredients: state.ingredients
	}
}

export default connect(map_redux_state_to_props)(Checkout);
