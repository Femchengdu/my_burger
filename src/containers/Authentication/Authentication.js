//..........................
import React, {Component} from 'react';

import Input from '../../components/UI/Input/Input';

import Button from '../../components/UI/Button/Button';

import classes from './Authentication.css'

import * as authentication_actions from '../../reducer_store/actions/index';

import Spinner from '../../components/UI/Spinner/Spinner';

import {connect} from 'react-redux';

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
		},
		signup_status: true
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
			// eslint-disable-next-line
			const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			isValid = pattern.test(value) && isValid
		}
		
		return isValid;
	}


	on_input_change = (event, element_name) => {
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

	submit_authentication_details = (event) => {
		event.preventDefault();
		this.props.reducer_authentication_request(this.state.form_elements.email.value, this.state.form_elements.password.value, this.state.signup_status);
	}

	toggle_authentication_mode = () => {
		this.setState(prevState => {
			return {signup_status: !prevState.signup_status}
		});
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

		let form_inputs = form_elements.map(element => (
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

		if (this.props.reducer_loading_status) {
			form_inputs = <Spinner />
		}

		let error_element = null;

		if (this.props.reducer_error_status) {
			error_element = (
				<p>{this.props.reducer_error_status.message}</p>
			);
		}

		return (
			<div className={classes.Authentication}>
				{error_element}
				<form onSubmit={this.submit_authentication_details}>
					{form_inputs}
					<Button type='Success'>Sign in</Button>
				</form>
				<Button 
					type='Danger'
					clicked={this.toggle_authentication_mode}>Toggle To {this.state.signup_status ? 'SIGNIN' : 'SIGNUP'}</Button>
			</div>
		);
	} 
}

const map_reducer_state_to_props = state => {
	return {
		reducer_loading_status: state.authentication_in_combined_reducer.loading,
		reducer_error_status: state.authentication_in_combined_reducer.error
	}
}

const map_dispatch_action_to_props = dispatch => {
	return {
		reducer_authentication_request: (email, password, signup_status) => dispatch(authentication_actions.async_authentication_request_creator(email, password, signup_status))
	}
}

export default connect(map_reducer_state_to_props, map_dispatch_action_to_props)(Authentication);
