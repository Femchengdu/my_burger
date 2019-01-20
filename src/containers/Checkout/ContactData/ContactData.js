//.................
import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.css';

import axios from '../../../axios_orders';

import Spinner from '../../../components/UI/Spinner/Spinner';

import Input from '../../../components/UI/Input/Input';

import {connect} from 'react-redux';

import globalErrors from '../../../hoc/globalErrors/globalErrors';

import * as contact_data_order_actions from '../../../reducer_store/actions/index';

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
				valid: false,
				touched: false
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
				valid: false,
				touched: false
			},
			zip: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zip Code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 6
				},
				valid: false,
				touched: false
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
				valid: false,
				touched: false
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
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'fastest', displayValue: 'Fast'},
						{value: 'normal', displayValue: 'Normal'}
					]
				},
				value: 'fastest',
				validation: {
					required: false
				},
				valid: true
			}
		},
		isFormValid: false
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
			ingredients: this.props.reducer_ingredients,
			price: this.props.reducer_total_price.toFixed(2),
			orderDetails: formData
		}

		this.props.reducer_start_order(order);
	}

	validationCheck(value, rules) {
		let isValid = true;
		if (rules.required) {
			isValid = value.trim() !== '' && isValid
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid
		}
		
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
		updateOrderElement.touched = true;
		updateOrder[inptuId] = updateOrderElement;
		let isFormValid = true;
		for (let inptuId in updateOrder) {
			isFormValid = updateOrder[inptuId].valid && isFormValid;
		}
		this.setState({orderForm: updateOrder, isFormValid: isFormValid}); 
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
						value={element.config.value}
						invalid={!element.config.valid}
						shouldValidate={element.config.validation.required}
						touched={element.config.touched} 
						changed={(event) => this.changedInput(event, element.id)}/>
				))}
		
				<Button type='Success' disabled={!this.state.isFormValid}>ORDER</Button>
			</form>
		);

		if (this.props.reducer_order_loading_status) {
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

const map_redux_state_to_props = state =>  {
	return {
		reducer_ingredients: state.burger_builder_in_combined_reducer.ingredients,
		reducer_total_price: state.burger_builder_in_combined_reducer.totalPrice,
		reducer_order_loading_status: state.order_in_combined_reducer.loading
	}
}

const map_dispatch_action_to_props = dispatch => {
	return {
		reducer_start_order: (order_data) => dispatch(contact_data_order_actions.burger_purchase_creator(order_data))
	}
}

export default connect(map_redux_state_to_props, map_dispatch_action_to_props)(globalErrors(ContacData, axios));
