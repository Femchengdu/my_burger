import * as action_types from '../actions/action_types';

const initialState = {
	ingredients: null,
	totalPrice: 2,
	error: false
}

// Global constants in all caps.
const INGREDIENT_PRICE = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case action_types.add:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredient_name]: state.ingredients[action.ingredient_name] + 1
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredient_name]
			}
		case action_types.remove:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredient_name]: state.ingredients[action.ingredient_name] - 1
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredient_name]
			}
		case action_types.set_ingredients:
			return {
				...state,
				ingredients: action.ingredients,
				error: false
			}
		case action_types.set_ingeredients_fetch_error:
			return {
				...state,
				error: true
			}		
		default:
			return state;
	}
}

export default reducer;