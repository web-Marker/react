/*
* @Author: Mark
* @Date:   2017-07-17 10:06:27
* @Last Modified by:   mark
* @Last Modified time: 2017-07-17 18:07:00
*/

import React, {Component, PropTypes} from 'react';

export default class Navtab extends Component {

	constructor(props) {
		super(props)
		this.state = {
			type: true
		}

	}

	render(){

		return(
			<div className="navtab box">
		        <a href="javascript:;;" className={`navbar_item bk ${this.state.type ? `pactive` : ``}`} onClick={()=>{
		        	this.props.handleClick(true);
		        	this.setState({
						type: true
					})
				}}>
		           	需求
		        </a>
		        <a href="javascript:;;" className={`navbar_item bk ${this.state.type ? `` : `pactive`}`} onClick={()=>{
		        	this.props.handleClick(false);
		        	this.setState({
						type: false
					})
		        }}>
		            活动
		        </a>
		    </div>
		)
	}

}
