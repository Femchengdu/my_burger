//...
import React, {Component} from 'react';

import Aux from '../../hoc/Aux';

import Burger from '../../components/Burger/Burger';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal';

import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios_orders';

import Spinner from '../../components/UI/Spinner/Spinner';

import globalErrors from '../../hoc/globalErrors/globalErrors';

import {connect} from 'react-redux';

import * as actionTypes from '../../reducer_store/actions';

// Global constants in all caps.
const INGREDIENT_PRICE = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};


class BurgerBuilder extends Component {
	// Alternative state method
	// constructor(props) {
	// 	super(props);
	// 	this.state = {...}
	// }

	state = {
		totalPrice: 2,
		purchaseable: false,
		purchasing: false,
		loading: false,
		error: false
	}

	// Fetch the data from firebase
	componentDidMount () {
		// axios.get('https://react-burger-project-01.firebaseio.com/ingredients.json')
		// 	.then(response => {
		// 		this.setState({ingredients: response.data});
		// 	})
		// 	.catch(error => {
		// 		this.setState({error: true});
		// 	});
	}

	isPurchaseable (ingredients) {
		const ingredSum = Object.keys(ingredients)
			.map(ingreKey => {
				return ingredients[ingreKey];
			}).reduce((initialVal, nextVal) => {
				return initialVal + nextVal;
			}, 0);
		this.setState({purchaseable: ingredSum > 0});
	}

	addIngredient = (type) => {
		const oldCount = this.state.ingredients[type];
		const updateCount = oldCount + 1;
		const updateIngredients = {
			...this.state.ingredients
		};
		// Here the ingredients have been updated
		updateIngredients[type] = updateCount;
		const addPrice = INGREDIENT_PRICE[type];
		const oldTotal = this.state.totalPrice;
		const newTotal = oldTotal + addPrice;
		this.setState({
			totalPrice: newTotal,
			ingredients: updateIngredients
		});
		this.isPurchaseable(updateIngredients);
	}

	removeIngredient = (type) => {
		const oldCount = this.state.ingredients[type];
		if (this.state.ingredients[type] <= 0) {
			return;
		}
		const updateCount = oldCount - 1;
		const updateIngredients = {
			...this.state.ingredients
		};
		// Here the ingredients have been updated
		updateIngredients[type] = updateCount;
		const subPrice = INGREDIENT_PRICE[type];
		const oldTotal = this.state.totalPrice;
		const newTotal = oldTotal - subPrice;
		this.setState({
			totalPrice: newTotal,
			ingredients: updateIngredients
		});
		this.isPurchaseable(updateIngredients);
	}

	purchaseBurger = () => {
		this.setState({purchasing: true});
	}

	stopPurchase = () => {
		this.setState({purchasing: false});
	}

	continuePurchase = () => {
		const queryParams = [];
		for (let key in this.state.ingredients) {
			queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.state.ingredients[key]))
		}
		queryParams.push('price=' + this.state.totalPrice);
		const queryString = queryParams.join('&');
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		});
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
		let burgerAndBuilder = this.state.error ? <p> Sorry there is a network problem!</p> : <Spinner />;
		// Once the data has been received, the spinner is swapped
		if (this.props.reducer_ingredients) {
			burgerAndBuilder = (
				<Aux>
					<Burger ingredients={this.props.reducer_ingredients} />
					<BuildControls 
						ingredientAdded={this.props.reducer_add_ingredient} 
						ingredientRemoved={this.props.reducer_remove_ingredient} 
						disabled={disabledButtonObject}
						purchaseable={!this.state.purchaseable}
						purchase={this.purchaseBurger}
						price={this.state.totalPrice} />
				</Aux>
			);

			// Set the order summary once the ingredients have been received from the server
			orderSummary = <OrderSummary 
						price={this.state.totalPrice}
						ingredients={this.props.reducer_ingredients} 
						cancel={this.stopPurchase}
						continue={this.continuePurchase} />;
		}

		// Set the order summary if ingredients have been received and order is being sent to the server
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}
				
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
		reducer_ingredients: state.ingredients
	}
}

const map_dispatch_action_to_props = dispatch => {
	return {
		reducer_add_ingredient: (name_from_props) => dispatch({type: actionTypes.ADD, ingredient_name: name_from_props}),
		reducer_remove_ingredient: (name_from_props) => dispatch({type: actionTypes.REMOVE, ingredient_name: name_from_props})
	}
}
export default connect(map_reducer_state_to_props, map_dispatch_action_to_props)(globalErrors(BurgerBuilder, axios));
