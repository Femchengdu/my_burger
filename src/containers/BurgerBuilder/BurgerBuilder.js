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
		if (this.props.reducer_authentication_status) {
			this.setState({purchasing: true});
		} else {
			this.props.reducer_set_redirect_path('/checkout');
			this.props.history.push('/authentication');
		}
		
	}

	stopPurchase = () => {
		this.setState({purchasing: false});
	}

	continuePurchase = () => {
		this.props.reducer_purchase_reset();
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
						is_user_authenticated={this.props.reducer_authentication_status}
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
		reducer_error: state.burger_builder_in_combined_reducer.error,
		reducer_authentication_status: state.authentication_in_combined_reducer.token !== null
	}
}

const map_dispatch_action_to_props = dispatch => {
	return {
		reducer_add_ingredient: (name_from_props) => dispatch(burger_builder_actions.add_ingredient_creator(name_from_props)),
		reducer_remove_ingredient: (name_from_props) => dispatch(burger_builder_actions.remove_ingredient_creator(name_from_props)),
		reducer_init_ingerdients: () => dispatch(burger_builder_actions.ingredients_initialization_fetch_creator()),
		reducer_purchase_reset: () => dispatch(burger_builder_actions.purchase_reset_creator()),
		reducer_set_redirect_path: (redirect_path) => dispatch(burger_builder_actions.set_authentication_redirect_path_creator(redirect_path))
	}
}
export default connect(map_reducer_state_to_props, map_dispatch_action_to_props)(globalErrors(BurgerBuilder, axios));
