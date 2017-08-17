import React, {Component, PropTypes} from 'react';
import fetchJsonp from 'fetch-jsonp';

export default class NoCard extends Component {
	constructor(props) {
		super(props)
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