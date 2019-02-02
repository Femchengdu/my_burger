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

export const burger_purchase_creator = (order_data, auth_token) => {
	return dispatch => {
		dispatch(start_burger_purchase_creator());
		axios.post('/orders.json?auth=' + auth_token, order_data)
			.then(response => {
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

// Fetching Orders
const order_fetching_success_creator = (orders) => {
	return {
		type: action_types.order_fetching_success,
		received_orders: orders
	}
}

const order_fetching_fail_creator = (error) => {
	return {
		type: action_types.order_fetching_fail,
		order_errors: error
	}
}

const order_fetching_start_creator = () => {
	return {
		type: action_types.order_fetching_start
	}
}

export const fetch_orders_creator = (auth_token, user_id) => {
	return dispatch => {
		dispatch(order_fetching_start_creator());
		const order_query_parameters = '?auth=' + auth_token + '&orderBy="user_id"&equalTo="' + user_id + '"';
		axios.get('/orders.json' + order_query_parameters)
			.then(result => {
				const fetched_orders = [];
				for (let orderId in result.data) {
					fetched_orders.push({
						...result.data[orderId],
						id: orderId
					});
				}
				dispatch(order_fetching_success_creator(fetched_orders));
			})
			.catch(error => {
				dispatch(order_fetching_fail_creator(error));
			})
	}
}