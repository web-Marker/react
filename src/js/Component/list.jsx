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

import x3 from '../../images/xxicon3.png';


export default class List extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			list:[],
			need:true,
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
 
		if ((nextProps.size != this.state.size) || (nextProps.data != this.state.need)) {
			console.log(nextProps)
			this.setState({
				need:nextProps.data,
				size:nextProps.size
			},()=>{

				if (this.state.need) {
					Tool.ajax({
						data:{
							mod: 'getBidding',
			            	appid:'pengt'
						},
						url:'bidding'
					}).then((data)=>{
						this.setState({
							list: Object.assign([], data.msg.data)
						})

						
						this.props.complete(false)
						if (this.props.call) this.props.call();
					})
				}else{
					console.log("45")
					Tool.ajax({
						data:{
							fid: 45
						},
						url:'forum/getThreadList'
					}).then((data)=>{
						this.setState({
							list: Object.assign([], data.data)
						})
						this.props.complete(false)
						if (this.props.call) this.props.call();
					})
				}
			})
		}
		
		
	}

	componentWillMount() {
		Tool.ajax({
			data:{
				mod: 'getBidding',
            	appid:'pengt'
			},
			url:'bidding'
		}).then((data)=>{
			if (data.code == 100) {
				alert('测试环境获取id有延迟,请再次刷新');
				return;
			}
			this.setState({
				list: Object.assign([], data.msg.data),
			})
			this.props.complete(false)
		})
	}
	
	render(){
		console.log()
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

