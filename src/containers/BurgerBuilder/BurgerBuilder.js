//.
import React, {Component} from 'react';

import Aux from '../../hoc/Aux';

import Burger from '../../components/Burger/Burger';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
		totalPrice: 2
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
				<Burger ingredients={this.state.ingredients} />
				<BuildControls 
					ingredientAdded={this.addIngredient} 
					ingredientRemoved={this.removeIngredient} 
					disabled={disabledButtonObject} />
			</Aux>
		);
	}
}

export default BurgerBuilder;
