import App from './components/App.jsx';
import VideoDetail from './components/VideoDetail.jsx';
import  {Router,  IndexRoute, Route , hashHistory } from 'react-router'
import ReactDOM from 'react-dom';
import React from 'react';
var routes = [
		<Route path="/detail" component={VideoDetail}>
            </Route>,
        <Route path="/" component={App}>
		</Route>
			];
//ReactDOM.render(<App history={hashHistory}/>, document.getElementById('react_content'));
ReactDOM.render(<Router routes={routes} history={hashHistory}/>, document.getElementById('react_content'));
