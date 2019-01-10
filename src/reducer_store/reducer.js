import * as actionTypes from './actions';

const initialState = {
	ingredients: {
		salad: 0,
		bacon: 0,
		cheese: 0,
		meat: 0
	},
	totalPrice: 2
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredient_name]: state.ingredients[action.ingredient_name] + 1
				}
			}
		case actionTypes.REMOVE:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredient_name]: state.ingredients[action.ingredient_name] - 1
				}
			}
		default:
			return state;
	}
}

export default reducer;