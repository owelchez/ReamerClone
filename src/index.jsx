import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

// NOTE: this is where we "import" our routes from our routes file
import routes from './routes';

//load foundation
$(document).foundation();

//app css
require('style!css!sass!applicationStyles')

// our entry point to our application! we render our application and "mount"
// it into the DOM
ReactDOM.render(
	<Router history={browserHistory}>{routes}</Router>,
  document.getElementById('app')
);
