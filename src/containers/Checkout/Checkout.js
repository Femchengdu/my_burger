//......
import React, {Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import {Route} from 'react-router-dom';

import ContactData from './ContactData/ContactData';

class Checkout extends Component {
	state = {
		ingredients: {},
		totalPrice: 0
	}

	componentDidMount () {
		const urlQuery = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price = 0;
		for (let ingredient of urlQuery.entries()) {
			if (ingredient[0] === 'price') {
				price = +ingredient[1];
			} else {
				ingredients[ingredient[0]] = +ingredient[1];
			}
	
		}
		this.setState({ingredients: ingredients, totalPrice: price});
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
				
				<Route 
					path={this.props.match.path + '/contact-data'} 
					render={ (props) => (
						<ContactData 
							ingredients={this.state.ingredients} 
							price={this.state.totalPrice}
							{...props}/>
					)} 
				/>
			</div>
		);
	}
}

export default Checkout;
