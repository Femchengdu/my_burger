//.
import React, { Component } from 'react';

import Layout from './components/Layout/Layout';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import Checkout from './containers/Checkout/Checkout';

import {Route, withRouter, Redirect, Switch} from 'react-router-dom';

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

    let conditional_routes = (
      <Switch>
        <Route path='/' exact component={BurgerBuilder} />
        <Route path='/authentication' component={Authentication} />
        <Redirect to='/' />
      </Switch>
    );

    if (this.props.reducer_is_user_authenticated) {
      conditional_routes = (
        <Switch>
          <Route path='/prev-orders' component={PrevOrders} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {conditional_routes}	
        </Layout>
      </div>
    );
  }
}

const map_reducer_state_to_props = state => {
  return {
    reducer_is_user_authenticated: state.authentication_in_combined_reducer.token !== null
  }
}

const map_dispatch_action_to_props = dispatch => {
  return {
    reducer_auto_signup: () => dispatch(app_actions.authentication_stored_state_check_creator())
  }
}

export default withRouter(connect(map_reducer_state_to_props, map_dispatch_action_to_props)(App));
