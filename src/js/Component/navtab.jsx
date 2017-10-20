/*
* @Author: Mark
* @Date:   2017-07-17 10:06:27
* @Last Modified by:   mark
* @Last Modified time: 2017-07-17 18:07:00
*/

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import *as action from '../Redux/Action/Index';

class Navtab extends Component {

	constructor(props) {
		super(props)
	}


	render(){
		const {type, dispatch} = this.props;
		console.log(type)
		return(
			<div className="navtab box">
		        <a href="javascript:;;" className={`navbar_item bk ${type ? `pactive` : ``}`} onClick={()=> 
		        	dispatch(action.changeTab(true))
				}>
		           	需求1
		        </a>
		        <a href="javascript:;;" className={`navbar_item bk ${type ? `` : `pactive`}`} onClick={()=>
		        	dispatch(action.changeTab(false))
		        }>
		            活动
		        </a>
		    </div>
		)
	}
}

//上级给下级的props
const mapStateToProps = (state) =>{
	return {
		type: state.navTab.type
	}
}


export default connect(mapStateToProps)(Navtab);
