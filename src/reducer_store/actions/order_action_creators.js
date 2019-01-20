import * as action_types from './action_types';
import axios from '../../axios_orders';

// Do I need to export the synchronous parts?
const successful_burger_purchase_creator = (order_id, order_data) => {
	return {
		type: action_types.successful_burger_purchase,
		order_id: order_id,
		order_data: order_data
	}
}

// Do I need to export the synchronous parts?
const failed_burger_purchase_creator = (error) => {
	return {
		type: action_types.failed_burger_purchase,
		error: error
	}
}

const start_burger_purchase_creator = () => {
	return {
		type: action_types.start_burger_purchase
	}
}

export const burger_purchase_creator = (order_data) => {
	return dispatch => {
		dispatch(start_burger_purchase_creator());
		axios.post('/orders.json', order_data)
			.then(response => {
				console.log(response.data);
				dispatch(successful_burger_purchase_creator(response.data.name, order_data));
			})
			.catch(error => {
				dispatch(failed_burger_purchase_creator(error));
			});
	}
}

export const purchase_reset_creator = () => {
	return {
		type: action_types.purchase_reset
	}
}