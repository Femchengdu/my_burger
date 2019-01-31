//..
import * as action_types from '../actions/action_types';

const initialState = {
	token: null,
	user_id: null,
	error: null,
	loading: false,
	after_authentication_redirect_path: '/'
}

const object_updater = (old_object, updated_properties) => {
	return {
		...old_object,
		...updated_properties
	}
}

const reducer_authentication_start = (state) => {
	const updated_properties = {error: null, loading: true}
	return object_updater(state, updated_properties);
}

const reducer_authentication_success = (state, action) => {
	const updated_properties = {
		token: action.token,
		user_id: action.user_id,
		error: null,
		loading: false
	}
	return object_updater(state, updated_properties);
}

const reducer_authentication_failure = (state, action) => {
	const updated_properties = {
		error: action.error,
		loading: false
	}
	return object_updater(state, updated_properties);
} 

const reducer_authentication_logout = (state) => {
	const updated_properties = {
		token: null,
		user_id: null
	}
	return object_updater(state, updated_properties);
}

const reducer_set_authentication_redirect_path = (state, action) => {
	const updated_properties = {
		after_authentication_redirect_path: action.path
	}
	return object_updater(state, updated_properties);
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case action_types.authentication_start:
			return reducer_authentication_start(state);
		case action_types.authentication_success:
			return reducer_authentication_success(state, action);
		case action_types.authentication_failure:
			return reducer_authentication_failure(state, action);
		case action_types.authentication_logout:
			return reducer_authentication_logout(state);
		case action_types.authentication_redirect_path:
			return reducer_set_authentication_redirect_path(state, action)
		default:
			return state;
	}
}


export default reducer;
