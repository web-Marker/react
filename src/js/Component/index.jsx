/*
* @Author: Mark
* @Date:   2017-07-07 16:59:18
* @Last Modified by:   mark
* @Last Modified time: 2017-07-17 16:51:34
*/

import React, {Component, PropTypes} from 'react';
import {is, fromJS} from 'immutable';
import Navtab from './navtab';
import List from './list';
import Load from './load';
import Drop from './drop';

if (module.hot) {
	module.hot.accept();
}

var statrs = {'a':'s', 'b':'sd'};
var formJSs = fromJS(statrs);
var sets = formJSs.set('a','gs');
console.log(formJSs)
console.log(sets)

export default class Index extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className={`index need`}>
				<Navtab/>
                <Drop />
				<List />
				<Load />
			</div>		
		)
	}
}


