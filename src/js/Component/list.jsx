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
import { is, fromJS} from 'immutable';
import immutable from 'immutable';
import x3 from '../../images/xxicon3.png';
console.log(immutable)
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
		// console.log('nextProps',nextProps)
		// console.log(this.props)
		let {jsons, tablist, type, isdrop} = this.props;
		if (!is(fromJS(jsons),fromJS(nextProps.jsons))) {
			this.setState({
				list: nextProps.jsons
			})
			console.log(nextProps.jsons)
		}

		if (!is(fromJS(tablist),fromJS(nextProps.tablist))) {
			this.setState({
				list: nextProps.tablist
			})
			console.log(nextProps.tablist)
		}

		//|| (this.props.isdrop != nextProps.isdrop)
		
		if ((!is(fromJS(nextProps.type),fromJS(type))) || (!is(fromJS(nextProps.isdrop),fromJS(isdrop)))) {
			if (nextProps.type) {
				this.props.dispatch(action.newGetData({mod: 'getBidding',appid:'pengt'},'bidding',true, false))
			}else{
				this.props.dispatch(action.newGetData({fid: 45},'forum/getThreadList',true, false))
			}
		}
	}
	
	shouldComponentUpdate(nextProps, nextState){
		return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
		console.log(!is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState)))
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
		type: state.navTab.toJS().type,
		jsons: state.fetchData.toJS().list,
		tablist: state.getData.toJS().list,
		isdrop: state.setDrop.isdorp
	}
}


export default connect(mapStateToProps)(List);

