//.....
import * as action_types from './action_types';

import axios from 'axios';

import * as web_auth_keys from '../../api_config';

const auth_api_token = web_auth_keys.firebase_api_key.api_key;

const authentication_start_creator = () => {
	return {
		type: action_types.authentication_start
	}
}

const authentication_success_creator = (response) => {
	return {
		type: action_types.authentication_success,
		token: response.data.idToken,
		user_id: response.data.localId
	}
}

const authentication_failiure_creator = (error_response) => {
	return {
		type: action_types.authentication_failure,
		error: error_response.response.data.error
	}
}

export const logout_creator = () => {
	return {
		type: action_types.authentication_logout
	}
}

const authentication_timeout_creator = (timeout) => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout_creator());
		}, timeout * 1000);
	}
}

export const set_authentication_redirect_path_creator = (redirect_path) => {
	return {
		type: action_types.authentication_redirect_path,
		path: redirect_path
	}
}

export const async_authentication_request_creator = (email, password, signed_up_status) => {
	return dispatch => {
		dispatch(authentication_start_creator());
		const signup_data = {
			email: email,
			password: password,
			returnSecureToken: true
		}

		let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=';
		if (!signed_up_status) {
			url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=';
		}
		axios.post( url + auth_api_token, signup_data)
			.then(response => {
				dispatch(authentication_success_creator(response));
				dispatch(authentication_timeout_creator(response.data.expiresIn));
			})
			.catch(error => {
				dispatch(authentication_failiure_creator(error));
			});
	}
} 
