//.
import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.css';

import axios from '../../../axios_orders';

import Spinner from '../../../components/UI/Spinner/Spinner';

import Input from '../../../components/UI/Input/Input';

class ContacData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		},
		loading: false
	}

	// This syntax enables use with events
	orderMethod = (event) => {
		event.preventDefault();
		this.setState({loading: true});
		console.log(typeof this.props.price);
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price.toFixed(2),
			customer: {
				name: 'Fan Miao',
				address: {
					street: '123 Fan Yang Lu',
					zip: '555555',
					country: 'China'
				},
				email: 'inbox@yahoo.com'
			},
			deliveryMethod: 'fast'
		}

		axios.post('/orders.json', order)
			.then(response => {
				this.setState({loading: false});
				this.props.history.push('/');
			})
			.catch(error => {
				this.setState({loading: false});
			});
	}

	render () {
		let form = (
			<form>
				<Input inputtype='input' type='text' name='name' placeholder='Your Name' />
				<Input inputtype='input' type='email' name='emai' placeholder='Your Email' />
				<Input inputtype='input' type='text' name='street' placeholder='Your Address' />
				<Input inputtype='input' type='text' name='postal' placeholder='Postal Code' />
				<Button type='Success' clicked={this.orderMethod}>ORDER</Button>
			</form>
		);

		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4> Enter your data here</h4>
				{form}
			</div>
		);
	}
}

export default ContacData;
