import React, {Component, PropTypes} from 'react';
import { Router, Route, Redirect, IndexRedirect, IndexRoute, browserHistory, hashHistory } from 'react-router';

import Index from './index';
import Card from './card';
import My from './my';
import NoCard from './nocard';
import MyCard from './mycard';
import Release from './release';


class Roots extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}


const history = process.env.NODE_ENV !== 'development' ? browserHistory : hashHistory;

const RouteConfig = (
	<Router history={history}>
		<Route path="/" component={Roots}>
			<IndexRoute component={Index}/>
			<IndexRedirect to="/index" />
			<Route path="index" component={Index} />
			<Route path="card" component={Card} />
			<Route path="nocard" component={NoCard} />
			<Route path="release" component={Release} />
			<Route path="mycard" component={MyCard} />
		</Route>
	</Router>
)

export default RouteConfig;