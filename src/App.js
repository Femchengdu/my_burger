//.
import React, { Component } from 'react';

import Layout from './components/Layout/Layout';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import Checkout from './containers/Checkout/Checkout';

import {Route} from 'react-router-dom';

import PrevOrders from './containers/PrevOrders/PrevOrders';

import Authentication from './containers/Authentication/Authentication';

import Logout from './containers/Authentication/Logout/Logout';

class App extends Component {
	/*
		Because the (path prop ) '/' is treated as a prefix path/route,
		All other paths/routes that have this prefix match the 
		'/' path??
		What does it meat to treat '/' as a prefix?
	*/
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

export default App;
