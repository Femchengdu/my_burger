//.
import React, {Component} from 'react';

import {connect} from 'react-redux';

import Order from '../../components/Order/Order';

import axios from '../../axios_orders';

import globalErrors from '../../hoc/globalErrors/globalErrors';

import * as order_fetching_actions from '../../reducer_store/actions/index';

import Spinner from '../../components/UI/Spinner/Spinner';

class PrevOrders extends Component {


	componentDidMount () {
		this.props.reducer_fetch_orders(this.props.reducer_authentication_token);
	}

	render () {
		let orders_jsx = <Spinner />;
		if (!this.props.reducer_orders_loading) {
			orders_jsx = this.props.reducer_orders.map(order => (
				<Order key={order.id} 
					ingredients={order.ingredients}
					price={order.price}/>
			))
		}
		return (
			<div>
				{orders_jsx}
			</div>
		);
	}
}

const map_reducer_state_to_props = state => {
	return {
		reducer_orders: state.order_in_combined_reducer.orders,
		reducer_orders_loading: state.order_in_combined_reducer.loading,
		reducer_authentication_token: state.authentication_in_combined_reducer.token
	}
}

const map_dispatch_action_to_props = dispatch => {
	return {
		reducer_fetch_orders: (auth_token) => dispatch(order_fetching_actions.fetch_orders_creator(auth_token))
	}
}

export default connect(map_reducer_state_to_props, map_dispatch_action_to_props)(globalErrors(PrevOrders, axios));
