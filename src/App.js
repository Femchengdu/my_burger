//.
import React, { Component } from 'react';

import Layout from './components/Layout/Layout';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import Checkout from './containers/Checkout/Checkout';

import {Route, withRouter} from 'react-router-dom';

import PrevOrders from './containers/PrevOrders/PrevOrders';

import Authentication from './containers/Authentication/Authentication';

import Logout from './containers/Authentication/Logout/Logout';

import {connect} from 'react-redux';

import * as app_actions from './reducer_store/actions/index';

class App extends Component {
  componentDidMount () {
    this.props.reducer_auto_signup();
  }

  render() {
    return (
      <div>
        <Layout>
        	<Route path='/' exact component={BurgerBuilder} />
        	<Route path='/checkout' component={Checkout} />
          <Route path='/prev-orders' component={PrevOrders} />
          <Route path='/authentication' component={Authentication} />
          <Route path='/logout' component={Logout} />
        </Layout>
      </div>
    );
  }
}

const map_dispatch_action_to_props = dispatch => {
  return {
    reducer_auto_signup: () => dispatch(app_actions.authentication_stored_state_check_creator())
  }
}

export default withRouter(connect(null, map_dispatch_action_to_props)(App));
