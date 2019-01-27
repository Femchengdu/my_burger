//...
import * as action_types from './action_types';

import axios from 'axios';

import * as web_auth_keys from '../../api_config';

const auth_api_token = web_auth_keys.firebase_api_key.api_key;

const authentication_start_creator = () => {
	return {
		type: action_types.authentication_start
	}
}

const authentication_success_creator = (authentication_token) => {
	return {
		type: action_types.authentication_success,
		token: authentication_token
	}
}

const authentication_failiure_creator = (error_response) => {
	return {
		type: action_types.authentication_failure,
		error: error_response
	}
}

export const async_authentication_request_creator = (email, password) => {
	return dispatch => {
		dispatch(authentication_start_creator());
		const signup_data = {
			email: email,
			password: password,
			returnSecureToken: true
		}
		axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + auth_api_token, signup_data)
			.then(response => {
				console.log(response);
				dispatch(authentication_success_creator(response.data));
			})
			.catch(error => {
				console.log(error);
				dispatch(authentication_failiure_creator(error));
			});
	}
} 
