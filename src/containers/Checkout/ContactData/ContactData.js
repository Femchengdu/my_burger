import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContacData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		}
	}

	render () {
		return (
			<div className={classes.ContactData}>
				<h4> Enter your data here</h4>
				<form>
					<input className={classes.Input} type='text' name='name' placeholder='Your Name' />
					<input className={classes.Input} type='email' name='emai' placeholder='Your Email' />
					<input className={classes.Input} type='text' name='street' placeholder='Your Address' />
					<input className={classes.Input} type='text' name='postal' placeholder='Postal Code' />
					<Button type='success'>ORDER</Button>
				</form>
			</div>
		);
	}
}

export default ContacData;
