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
		ingredients: null,
		totalPrice: 2,
		purchaseable: false,
		purchasing: false,
		loading: false,
		error: false
	}

	// Fetch the data from firebase
	componentDidMount () {
		//console.log(this.props);
		axios.get('https://react-burger-project-01.firebaseio.com/ingredients.json')
			.then(response => {
				this.setState({ingredients: response.data});
			})
			.catch(error => {
				this.setState({error: true});
			});
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
			...this.state.ingredients
		};

		for (let key in disabledButtonObject) {
			disabledButtonObject[key] = disabledButtonObject[key] <= 0
		};

		// Initialize the order summary to null
		let orderSummary = null;
		
		// Placeholder while data is fetched from the server
		let burgerAndBuilder = this.state.error ? <p> Sorry there is a network problem!</p> : <Spinner />;
		// Once the data has been received, the spinner is swapped
		if (this.state.ingredients) {
			burgerAndBuilder = (
				<Aux>
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

			// Set the order summary once the ingredients have been received from the server
			orderSummary = <OrderSummary 
						price={this.state.totalPrice}
						ingredients={this.state.ingredients} 
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

export default globalErrors(BurgerBuilder, axios);
