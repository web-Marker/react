import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router'

export default class Footer extends Component {

	constructor(props) {
		super(props)
	}

	render(){
		return(
			<div className="weui-tabbar">
		        <Link to="/index" className="weui-tabbar__item" activeClassName="weui-bar__item_on">
		            <div className="l1 weui-tabbar__icon" ></div>
		            <p className="weui-tabbar__label">朋拓</p>
		        </Link>
		        <Link to="/card" className="weui-tabbar__item" activeClassName="weui-bar__item_on">
		        	<div className="weui-tabbar__icon l2"></div>
		            <p className="weui-tabbar__label">名片夹</p>
		        </Link>
		        <Link to="/release" className="weui-tabbar__item" activeClassName="weui-bar__item_on">
		        	<div className="l3 weui-tabbar__icon"></div>
		            <p className="weui-tabbar__label">发布活动</p>
		        </Link>
		    </div>
		)
	}
}