//.
import React, {Component} from 'react';

import Order from '../../components/Order/Order';

import axios from '../../axios_orders';

import globalErrors from '../../hoc/globalErrors/globalErrors';

class PrevOrders extends Component {

	state = {
		orders: [],
		loading: true
	}

	componentDidMount () {
		axios.get('/orders.json')
			.then(result => {
				let ordersArray = [];
				for (let orderId in result.data) {
					ordersArray.push({
						...result.data[orderId],
						id: orderId
					});
				}
				console.log(ordersArray);
				this.setState({loading: false, orders: ordersArray});
			})
			.catch(error => {
				this.setState({loading: false});
			})
	}

	render () {
		return (
			<div>
				{
					this.state.orders.map(order => (
						<Order key={order.id} 
						ingredients={order.ingredients}
						price={order.price}/>
					))
				}
			</div>
		);
	}
}
export default globalErrors(PrevOrders, axios);
