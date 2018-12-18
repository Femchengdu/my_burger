//..
import React, {Component} from 'react';

import Aux from '../../hoc/Aux';

import Burger from '../../components/Burger/Burger';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal';

import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios_orders';

import Spinner from '../../components/UI/Spinner/Spinner';

import globalErrors from '../../hoc/globalErrors/globalErrors';

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
		purchasing: false,
		loading: false
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
		//alert('You have sold!');
		this.setState({loading: true});
		const order = {
			ingredients: this.state.ingredients,
			//Calculate the total price on the server to ensure that the 
			// user is not manipulating the price from the browser.
			price: this.state.totalPrice.toFixed(2),
			customer: {
				name: 'Fan Miao',
				address: {
					street: '123 Fan Yang Lu',
					zip: '555555',
					country: 'China'
				},
				email: 'inbox@yahoo.com'
			},
			deliveryMethod: 'fast'
		}

		axios.post('/orders.json', order)
			.then(response => {
				this.setState({loading: false, purchasing: false});
			})
			.catch(error => {
				this.setState({loading: false, purchasing: false});
			});
	}

	render () {
		const disabledButtonObject = {
			...this.state.ingredients
		};

		for (let key in disabledButtonObject) {
			disabledButtonObject[key] = disabledButtonObject[key] <= 0
		};

		let orderSummary = <OrderSummary 
						price={this.state.totalPrice}
						ingredients={this.state.ingredients} 
						cancel={this.stopPurchase}
						continue={this.continuePurchase} />;

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}				
		return (
			<Aux>
				<Modal show={this.state.purchasing} close={this.stopPurchase} >
					{orderSummary}
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

export default globalErrors(BurgerBuilder, axios);
