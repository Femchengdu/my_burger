//.....................
import React, {Component} from 'react';

import Input from '../../components/UI/Input/Input';

import Button from '../../components/UI/Button/Button';

import classes from './Authentication.css'

class Authentication extends Component {
	state = {
		form_elements: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email Address'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false
			}
		}
	}

	validation_checker = (value, rules) => {
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

		if (rules.isEmail) {
			const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			isValid = pattern.test(value) && isValid
		}
		
		return isValid;
	}


	on_input_change = (event, element_name) => {
		console.log({...this.state.form_elements[element_name]}, event.target.value);
		const updated_form_elements = {
			...this.state.form_elements,
			[element_name]: {
				...this.state.form_elements[element_name],
				value: event.target.value,
				valid: this.validation_checker(event.target.value, this.state.form_elements[element_name].validation),
				touched: true
			}
		}
		this.setState({form_elements: updated_form_elements});
	}

	render () {
		const form_elements = [];
		for (let element in this.state.form_elements) {
			//console.log(element);
			form_elements.push({
				id: element,
				config: this.state.form_elements[element]
			});
		}

		const form_inputs = form_elements.map(element => (
			<Input 
				key={element.id}
				elementType={element.config.elementType}
				elementConfig={element.config.elementConfig}
				value={element.config.value}
				invalid={!element.config.valid}
				shouldValidate={element.config.validation.required}
				touched={element.config.touched} 
				changed={(event) => this.on_input_change(event, element.id)}
			/>
		));


		return (
			<div className={classes.Authentication}>
				<form>
					{form_inputs}
					<Button type='Success'>Sign in</Button>
				</form>
			</div>
		);
	} 
}

export default Authentication;
