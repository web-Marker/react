/*
* @Author: mark
* @Date:   2017-08-21 16:38:46
* @Last Modified by:   mark
* @Last Modified time: 2017-09-04 16:21:02
*/

import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux'

//react component
class Counter extends Component {
	render () {
		const { value, onIncreaseClick } = this.props;
		return (
			<div>
				<span>{value}</span>
				<button onClick={onIncreaseClick}>Increase*-</button>
			</div>
		)
	}
}

Counter.propTypes = {
	value: PropTypes.number.isRequired,
	onIncreaseClick: PropTypes.func.isRequired
}

const increaseAction = { type: 'increase' }

function counter(state = {count: 0}, action){
	const count = state.count;
	switch (action.type){
		case 'increase':
			return { count: count + 1 }
		default:
			return state
	}
}

const store = createStore(counter)

function mapStateToProps(state){
	return {
		value: state.count
	}
}

function mapDispatchToProps(dispatch){
	return {
		onIncreaseClick: () => dispatch(increaseAction)
	}
}

const App = connect(
	mapStateToProps,
	mapDispatchToProps
)(Counter)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
  	document.getElementById('app')
)





