import * as action_types from './action_types';


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