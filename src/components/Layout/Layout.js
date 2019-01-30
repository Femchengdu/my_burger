//
import React, {Component} from 'react';

import Aux from '../../hoc/Aux';

import classes from './Layout.css';

import Toolbar from '../Navigation/Toolbar/Toolbar';

import {connect} from 'react-redux';

import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

// Single root element achieve with hoc Aux
class Layout extends Component {
	state = {
		showSide: false
	}

	sideClose = () => {
		this.setState({showSide: false});
	}

	toggle_method = () => {
		this.setState((prevState) => {
			return {showSide: !prevState.showSide};
		})
		// Another approach to toggle
		// this.setState({showSide: true})
	}

	render () {
		return (
			<Aux>
				<Toolbar
					layout_is_user_authenticated={this.props.reducer_authentication_status}
					toggleClick={this.toggle_method}/>
				<SideDrawer
					layout_is_user_authenticated={this.props.reducer_authentication_status} 
					open={this.state.showSide} 
					closed={this.sideClose}/>
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Aux>
		)
	}
}

const map_reducer_state_to_props = state => {
	return {
		reducer_authentication_status: state.authentication_in_combined_reducer.token !== null
	}
}

export default connect(map_reducer_state_to_props)(Layout);
