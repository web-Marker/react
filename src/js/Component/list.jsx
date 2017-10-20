/*
* @Author: Mark
* @Date:   2017-07-17 11:27:41
* @Last Modified by:   mark
* @Last Modified time: 2017-07-18 09:51:42
*/

import React, {Component, PropTypes} from 'react';
import Of from './of';
import Footer from './footer';
import Tool from '../Config/Tool';
import { Link } from 'react-router'
import { connect } from 'react-redux';
import *as action from '../Redux/Action/Index';
import x3 from '../../images/xxicon3.png';


class List extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			list:[],
			size:0,
			showFrom:false
		}
		this.handClick = () => {
			this.setState({
				showFrom: !this.state.showFrom
			})
		}

	}

	componentWillReceiveProps(nextProps){
		console.log('nextProps',nextProps)
		console.log(this.props.type)
		if (this.props.jsons != nextProps.jsons) {
			this.setState({
				list: nextProps.jsons
			})
		}

		if (this.props.tablist != nextProps.tablist) {
			this.setState({
				list: nextProps.tablist
			})
		}

		//|| (this.props.isdrop != nextProps.isdrop)
		
		if ((nextProps.type != this.props.type) || (nextProps.isdrop != this.props.isdrop)) {
			if (nextProps.type) {
				this.props.dispatch(action.newGetData({mod: 'getBidding',appid:'pengt'},'bidding',true, false))
			}else{
				this.props.dispatch(action.newGetData({fid: 45},'forum/getThreadList',true, false))
			}
		}
	}
	

	shouldComponentUpdate(nextProps, nextState){
		return !(nextProps === this.props) || !(nextState === this.state);
	}

	componentWillMount() {
		console.log('componentWillMount')
		this.props.dispatch(action.fetchPosts(true, false))

	}


	
	render(){
	
		if (Tool.isEmptyObject(this.state.list)) return null;
		return (
			<div className="weui-tab wrapper">
			    <div className="weui-tab__panel">
					<section>
	            		<div className="list">
	            			<dl>
	            				{
	            					this.state.list.map((index, elem)=>{
	            						return <Of attr={index} key={elem}/>
	            					})
	            				}
	            			</dl>
	            		</div>
	            		<p className="bottomText">这是我的底线</p>
	            	</section>
			    </div>
			    <Footer />
			</div>
		)
		
	}

}


//上级给下级的props
const mapStateToProps = (state) =>{
	return {
		type: state.navTab.type,
		jsons: state.fetchData.list,
		tablist: state.getData.list,
		isdrop: state.setDrop.isdorp
	}
}


export default connect(mapStateToProps)(List);

