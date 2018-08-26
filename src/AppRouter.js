import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import ArtistDetail from './ArtistDetail';

export default class AppRouter extends Component {
	
	render(){
		return(
			<Router>
				<div>
					<Route path='/' component={App} exact />
					<Route path='/:artist' component={ArtistDetail} />
				</div>
			</Router>
		);
	}
}