import * as action_types from './action_types';
import axios from '../../axios_orders';


export const add_ingredient_creator = (ingredient_name) => {
	return {
		type: action_types.add,
		ingredient_name: ingredient_name
	}
}

export const remove_ingredient_creator = (ingredient_name) => {
	return {
		type: action_types.remove,
		ingredient_name: ingredient_name
	}
}

// I don't need to export this function
const set_ingredients_creator = (ingredients) => {
	return {
		type: action_types.set_ingredients,
		ingredients: ingredients
	}
}

// Do I need to export this method too?
const set_ingredients_fetch_error_creator = () => {
	return {
		type: action_types.set_ingeredients_fetch_error
	}
}

export const ingredients_initialization_fetch = () => {
	return dispatch => {
		axios.get('https://react-burger-project-01.firebaseio.com/ingredients.json')
		.then(response => {
			dispatch(set_ingredients_creator(response.data));
		})
		.catch(error => {
			dispatch(set_ingredients_fetch_error_creator());
		});
	}
}