import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

import Aux from '../Aux';

const globalErrors = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null
		}
		componentWillMount () {
			this.request_intercept = axios.interceptors.request.use(request => {
				this.setState({error: null});
				return request;
			});
			this.response_intercept = axios.interceptors.response.use(response => response, error => {
				this.setState({error: error});
			});
		}

		componentWillUnmount () {
			axios.interceptors.request.eject(this.request_intercept);
			axios.interceptors.response.eject(this.response_intercept);
		}

		errorDismis = () => {
			this.setState({
				error: null
			});
		}

		render () {
			return (
				<Aux>
					<Modal 
					show={this.state.error} 
					close={this.errorDismis}>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props}/>
				</Aux>
			);
		}
	}
}




export default globalErrors;
