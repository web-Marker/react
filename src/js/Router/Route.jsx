import React, {Component, PropTypes} from 'react';
import { Router, Route, Redirect, IndexRedirect, IndexRoute, browserHistory, hashHistory } from 'react-router';

if (module.hot) {
    module.hot.accept();
}

class Roots extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

const Index = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/index').default)
    },'index')
}

const Card = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/card').default)
    },'card')
}

const My = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/my').default)
    },'my')
}

const NoCard = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/nocard').default)
    },'noCard')
}

const MyCard = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/mycard').default)
    },'myCard')
}

const Release = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/release').default)
    },'release')
}


const history = process.env.NODE_ENV !== 'development' ? hashHistory : browserHistory;

const RouteConfig = (
	<Router history={history}>
		<Route path="/" component={Roots}>
			<IndexRoute getComponent={Index}/>
			<IndexRedirect to="/index" />
			<Route path="index" getComponent={Index} />
			<Route path="card" getComponent={Card} />
			<Route path="nocard" getComponent={NoCard} />
			<Route path="release" getComponent={Release} />
			<Route path="mycard" getComponent={MyCard} />
		</Route>
	</Router>
)

export default RouteConfig;