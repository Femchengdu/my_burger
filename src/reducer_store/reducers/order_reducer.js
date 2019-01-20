import * as action_types from '../actions/action_types';


const initialState = {
	orders; [],
	loading: false
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case action_types.successful_burger_purchase:
			const order_details = {
				id: action.order_id,
				...action.order_data
			}
			return {
				...state,
				loading: false,
				orders: state.orders.concat(order_details)
			}
		case action_types.failed_burger_purchase:
			return {
				...state,
				loding: false
			}
		default:
			return state;
	}
}

export default reducer