//...
import React, {Component} from 'react';

import Aux from '../../hoc/Aux';

import Burger from '../../components/Burger/Burger';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal';

import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import Spinner from '../../components/UI/Spinner/Spinner';

import globalErrors from '../../hoc/globalErrors/globalErrors';

import {connect} from 'react-redux';

import * as burger_builder_actions from '../../reducer_store/actions/index';

import axios from '../../axios_orders';


class BurgerBuilder extends Component {
	// Alternative state method
	// constructor(props) {
	// 	super(props);
	// 	this.state = {...}
	// }

	state = {
		purchasing: false
	}

	// Fetch the data from firebase
	componentDidMount () {
		this.props.reducer_init_ingerdients();
	}

	isPurchaseable (ingredients) {
		const ingredSum = Object.keys(ingredients)
			.map(ingreKey => {
				return ingredients[ingreKey];
			}).reduce((initialVal, nextVal) => {
				return initialVal + nextVal;
			}, 0);
		//this.setState({purchaseable: ingredSum > 0});
		return ingredSum > 0;
	}

	purchaseBurger = () => {
		this.setState({purchasing: true});
	}

	stopPurchase = () => {
		this.setState({purchasing: false});
	}

	continuePurchase = () => {
		// const queryParams = [];
		// for (let key in this.state.ingredients) {
		// 	queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.state.ingredients[key]))
		// }
		// queryParams.push('price=' + this.state.totalPrice);
		// const queryString = queryParams.join('&');
		// this.props.history.push({
		// 	pathname: '/checkout',
		// 	search: '?' + queryString
		// });
		this.props.history.push('/checkout');
	}

	render () {
		const disabledButtonObject = {
			...this.props.reducer_ingredients
		};

		for (let key in disabledButtonObject) {
			disabledButtonObject[key] = disabledButtonObject[key] <= 0
		};

		// Initialize the order summary to null
		let orderSummary = null;
		
		// Placeholder while data is fetched from the server
		let burgerAndBuilder = this.props.reducer_error ? <p> Sorry there is a network problem!</p> : <Spinner />;
		// Once the data has been received, the spinner is swapped
		if (this.props.reducer_ingredients) {
			burgerAndBuilder = (
				<Aux>
					<Burger ingredients={this.props.reducer_ingredients} />
					<BuildControls 
						ingredientAdded={this.props.reducer_add_ingredient} 
						ingredientRemoved={this.props.reducer_remove_ingredient} 
						disabled={disabledButtonObject}
						purchaseable={!this.isPurchaseable(this.props.reducer_ingredients)}
						purchase={this.purchaseBurger}
						price={this.props.reducer_total_price} />
				</Aux>
			);

			// Set the order summary once the ingredients have been received from the server
			orderSummary = <OrderSummary 
						price={this.props.reducer_total_price}
						ingredients={this.props.reducer_ingredients} 
						cancel={this.stopPurchase}
						continue={this.continuePurchase} />;
		}

		// Set the order summary if ingredients have been received and order is being sent to the server		
		return (
			<Aux>
				<Modal show={this.state.purchasing} close={this.stopPurchase} >
					{orderSummary}
				</Modal>
				{burgerAndBuilder}
			</Aux>
		);
	}
}

const map_reducer_state_to_props = state => {
	return {
		reducer_ingredients: state.burger_builder_in_combined_reducer.ingredients,
		reducer_total_price: state.burger_builder_in_combined_reducer.totalPrice,
		reducer_error: state.burger_builder_in_combined_reducer.error
	}
}

const map_dispatch_action_to_props = dispatch => {
	return {
		reducer_add_ingredient: (name_from_props) => dispatch(burger_builder_actions.add_ingredient_creator(name_from_props)),
		reducer_remove_ingredient: (name_from_props) => dispatch(burger_builder_actions.remove_ingredient_creator(name_from_props)),
		reducer_init_ingerdients: () => dispatch(burger_builder_actions.ingredients_initialization_fetch_creator())
	}
}
export default connect(map_reducer_state_to_props, map_dispatch_action_to_props)(globalErrors(BurgerBuilder, axios));
