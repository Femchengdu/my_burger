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

const authentication_success_creator = (token, id) => {
	return {
		type: action_types.authentication_success,
		token: token,
		user_id: id
	}
}

const authentication_failiure_creator = (error_response) => {
	return {
		type: action_types.authentication_failure,
		error: error_response.response.data.error
	}
}

export const logout_creator = () => {
	localStorage.removeItem('id_token');
	localStorage.removeItem('token_expiration_date');
	localStorage.removeItem('user_id');
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

export const authentication_stored_state_check_creator = () => {
	return dispatch => {
		const stored_token = localStorage.getItem('id_token');
		if (!stored_token) {
			dispatch(logout_creator());
		} else {
			const stored_expiration_time = new Date(localStorage.getItem('token_expiration_date'));
			if (stored_expiration_time > new Date()) {
				const stored_user_id = localStorage.getItem('user_id');
				dispatch(authentication_success_creator(stored_token, stored_user_id));
				const remaining_time = stored_expiration_time.getTime() - new Date().getTime();
				const remaining_time_in_seconds = remaining_time/1000;
				dispatch(authentication_timeout_creator(remaining_time_in_seconds));
			} else {
				dispatch(logout_creator());
			}		
		}
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
				localStorage.setItem('id_token', response.data.idToken);
				const token_expiration_date = new Date(new Date().getTime() + response.data.expiresIn * 1000);
				localStorage.setItem('token_expiration_date', token_expiration_date);
				localStorage.setItem('user_id', response.data.localId);
				dispatch(authentication_success_creator(response.data.idToken, response.data.localId));
				dispatch(authentication_timeout_creator(response.data.expiresIn));
			})
			.catch(error => {
				dispatch(authentication_failiure_creator(error));
			});
	}
} 
