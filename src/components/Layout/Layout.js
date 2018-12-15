//
import React, {Component} from 'react';

import Aux from '../../hoc/Aux';

import classes from './Layout.css';

import Toolbar from '../Navigation/Toolbar/Toolbar';

import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

// Single root element achieve with hoc Aux
class Layout extends Component {
	state = {
		showSide: true
	}

	sideClose = () => {
		this.setState({showSide: false});
	}

	render () {
		return (
			<Aux>
				<Toolbar />
				<SideDrawer 
				open={this.state.showSide} 
				closed={this.sideClose}/>
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Aux>
		)
	}
}

export default Layout;
