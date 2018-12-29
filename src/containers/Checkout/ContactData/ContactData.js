//.........
import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.css';

import axios from '../../../axios_orders';

import Spinner from '../../../components/UI/Spinner/Spinner';

import Input from '../../../components/UI/Input/Input';

class ContacData extends Component {
	state = {
		orderForm: {
			
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
			},
			zip: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zip Code'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
			},
			country:{
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'fastest', displayValue: 'Fast'},
						{value: 'normal', displayValue: 'Normal'}
					]
				},
				value: ''
			}
		},
		loading: false
	}

	// This syntax enables use with events
	orderMethod = (event) => {
		event.preventDefault();
		this.setState({loading: true});
		//console.log(typeof this.props.price);
		const formData = {};
		for (let orderId in this.state.orderForm) {
			formData[orderId] = this.state.orderForm[orderId].value
		}
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price.toFixed(2),
			orderDetails: formData
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

	validationCheck(value, rules) {
		let isValid = false;
		if (rules.required) {
			isValid = value.trim() !== '';
		};
		return isValid;
	}

	changedInput = (event, inptuId) => {
		const updateOrder = {
			...this.state.orderForm
		};
		// To colone deeply for the nested values
		const updateOrderElement = {
			...updateOrder[inptuId]
		};
		updateOrderElement.value = event.target.value;
		updateOrderElement.valid = this.validationCheck(updateOrderElement.value, updateOrderElement.validation);
		updateOrder[inptuId] = updateOrderElement;
		console.log(updateOrderElement.valid);
		this.setState({orderForm: updateOrder}); 
	}

	render () {
		const formElements = [];
		for (let element in this.state.orderForm) {
			//console.log(element);
			formElements.push({
				id: element,
				config: this.state.orderForm[element]
			});
		}

		let form = (
			<form onSubmit={this.orderMethod}>
				{formElements.map(element => (
					<Input 
						key={element.id}
						elementType={element.config.elementType}
						elementConfig={element.config.elementConfig}
						value={element.config.value} changed={(event) => this.changedInput(event, element.id)}/>
				))}
		
				<Button type='Success'>ORDER</Button>
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
