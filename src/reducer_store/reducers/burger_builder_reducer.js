import * as action_types from '../actions/action_types';

const initialState = {
	ingredients: {
		salad: 0,
		bacon: 0,
		cheese: 0,
		meat: 0
	},
	totalPrice: 2
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
		default:
			return state;
	}
}

export default reducer;