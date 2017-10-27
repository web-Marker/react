import React, {Component, PropTypes} from 'react';
import fetchJsonp from 'fetch-jsonp';
import { is, fromJS} from 'immutable';

export default class NoCard extends Component {
	constructor(props) {
		super(props)
	}

	shouldComponentUpdate(nextProps, nextState){
		return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
	}

	render(){
		return(
			<div className="nocard">
				<div className="bk pic">
		    		<img src="http://img.pengt.com/static/images1/icon31.png" className="img bk" />
				</div>
				<a href="newcard.html" className="bk a">去做一张</a>
			</div>	
		)
	}

}