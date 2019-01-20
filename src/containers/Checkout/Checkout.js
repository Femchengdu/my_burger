//.......
import React, {Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import {Route, Redirect} from 'react-router-dom';

import ContactData from './ContactData/ContactData';

import {connect} from 'react-redux';


class Checkout extends Component {


	checkoutContinue = () => {
		this.props.history.replace('checkout/contact-data');
	}

	checkoutCancel = () => {
		this.props.history.goBack();
	}
	
	render () {
		let summary_or_redirect = <Redirect to='/' />;
		if (this.props.reducer_ingredients) {
			const redirect_after_purchase = this.props.reducer_purchsed_status ? <Redirect to='/' /> : null;
			summary_or_redirect = (
				<div>
					{redirect_after_purchase}
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
		return summary_or_redirect
	}
}

const map_redux_state_to_props = state =>  {
	return {
		reducer_ingredients: state.burger_builder_in_combined_reducer.ingredients,
		reducer_purchsed_status: state.order_in_combined_reducer.purchased
	}
}


export default connect(map_redux_state_to_props)(Checkout);
