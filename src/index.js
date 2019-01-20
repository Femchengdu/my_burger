import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import burger_builder_reducer from './reducer_store/reducers/burger_builder_reducer';
import order_reducer from './reducer_store/reducers/order_reducer';
import thunk_middleware from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const combined_reducers = combineReducers({
	burger_builder_in_combined_reducer: burger_builder_reducer,
	order_in_combined_reducer: order_reducer
}) 
const redux_state_tree_store = createStore(combined_reducers, composeEnhancers(
	applyMiddleware(thunk_middleware)
));
// Crate a JSX element that wraps the app component
const routed_app = (
	<Provider store={redux_state_tree_store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(routed_app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
