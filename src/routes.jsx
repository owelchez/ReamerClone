import React from 'react';

import { Route, Router, IndexRoute, browserHistory } from 'react-router';

// Load this component for ALL routes
import Application from './Components/Application';

import Main from './Pages/Main';
import Homepage from './Pages/Homepage';
import LoginPage from './Pages/LoginPage';
import CreateAccountPage from './Pages/CreateAccountPage';

export default (
	/* This means the Application component 
		is gonna be the parent of all components nested w/in this route! */
	<Router history={browserHistory}>
		<Route component={Application}>
			<Route path="/" component={Main} />
			<Route path="/home" component={Homepage} />
			<Route path="/login" component={LoginPage} />
			<Route path="/create" component={CreateAccountPage} />
		</Route>
	</Router>
);

