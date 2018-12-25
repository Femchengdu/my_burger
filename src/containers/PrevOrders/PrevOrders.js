import React, {Component} from 'react';

import Order from '../../components/Order/Order';

class PrevOrders extends Component {
	render () {
		return (
			<div>
				<Order />
				<Order />
			</div>
		);
	}
}
export default PrevOrders;