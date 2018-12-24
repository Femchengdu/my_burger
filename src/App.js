//.
import React, { Component } from 'react';

import Layout from './components/Layout/Layout';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import Checkout from './containers/Checkout/Checkout';

import {Route} from 'react-router-dom';

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
	        {/*
				<BurgerBuilder />
        		<Checkout />
	        */}
        </Layout>
      </div>
    );
  }
}

export default App;
