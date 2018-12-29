//......
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
				value: ''
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: ''
			},
			zip: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zip Code'
				},
				value: ''
			},
			country:{
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Country'
				},
				value: ''
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email'
				},
				value: ''
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
		console.log(typeof this.props.price);
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price.toFixed(2),
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
		const formElements = [];
		for (let element in this.state.orderForm) {
			//console.log(element);
			formElements.push({
				id: element,
				config: this.state.orderForm[element]
			});
		}

		let form = (
			<form>
				{formElements.map(element => (
					<Input 
						key={element.id}
						elementType={element.config.elementType}
						elementConfig={element.config.elementConfig}
						value={element.config.value}/>
				))}
		
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
