/*
* @Author: mark
* @Date:   2017-08-21 10:56:32
* @Last Modified by:   mark
* @Last Modified time: 2017-08-21 16:41:57
*/

import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';
import { createStore } from 'redux';
import Counter from './counter';
import reducers from './reducers';

const store = createStore(reducers);
const rootEl = document.getElementById('app');

const reder = () => render(
	<Counter 
		value={store.getState()} 
		onIncrement={() => store.dispatch({type: 'INCREMENT'})}
		onDecrement={() => store.dispatch({type: 'DECREMENT'})}
	/>,
	rootEl
)

reder();
store.subscribe(reder)


