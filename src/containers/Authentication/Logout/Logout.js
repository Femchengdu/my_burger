import React, {Component} from 'react';

import {Redirect} from 'react-router-dom';

import {connect} from 'react-redux';

import * as logout_actions from '../../../reducer_store/actions/index';

class Logout extends Component {
	componentDidMount () {
		this.props.reducer_logout();
	}

	render () {
		return <Redirect to='/' />;
	}
}

const map_dispatch_action_to_props = dispatch => {
	return {
		reducer_logout: () => dispatch(logout_actions.logout_creator()),
		
	}
}

export default connect(null, map_dispatch_action_to_props)(Logout);