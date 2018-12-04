//..
import React, {Component} from 'react';

import Aux from '../../hoc/Aux';

import Burger from '../../components/Burger/Burger';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal';

import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 2,
		purchaseable: false,
		purchasing: false
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
		alert('You have sold!');
	}

	render () {
		const disabledButtonObject = {
			...this.state.ingredients
		};

		for (let key in disabledButtonObject) {
			disabledButtonObject[key] = disabledButtonObject[key] <= 0
		};

		return (
			<Aux>
				<Modal show={this.state.purchasing} close={this.stopPurchase} >
					<OrderSummary 
						ingredients={this.state.ingredients} 
						cancel={this.stopPurchase}
						continue={this.continuePurchase} />
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls 
					ingredientAdded={this.addIngredient} 
					ingredientRemoved={this.removeIngredient} 
					disabled={disabledButtonObject}
					purchaseable={!this.state.purchaseable}
					purchase={this.purchaseBurger}
					price={this.state.totalPrice} />
			</Aux>
		);
	}
}

export default BurgerBuilder;
