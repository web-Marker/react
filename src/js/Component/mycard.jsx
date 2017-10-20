import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router'
import Tool from '../Config/Tool';



export default class MyCard extends Component {
	constructor(props, context) {
		super(props)

		this.state = {
			info:{}
		}

		this.handClick = (e) =>{
			this.setState({
				share: true
			})
		}

		this.handShare = () =>{
			this.setState({
				share: false
			})
		}

	}

	componentWillMount() {
		Tool.ajax({
			data:{
				'uid':localStorage.getItem('uid'),
				'vuid':localStorage.getItem('uid'),
			},
			url:'home/cardInfo'
		}).then(data => {

			if (data.data.profile == '1') {
                this.context.router.push(`/nocard`);
				return;
            }
            console.log(data.data)
			this.setState({
				info: Object.assign({}, data.data)
			})
		})
	}
	
	render(){
		return (
			<div className="mycards">
				<div className="mycard first"> 
		            <span className="bg2Icon bk i hide"></span> 
		            <div className="bk mobule">
		                <div className="box mc">
		                    <div className="bk pic">
		                        <img src={`${this.state.info.head}`} className="usepic bk" />
		                    </div>
		                    <div className="bk mess">
		                        <p className="bk name">
		                        	{this.state.info.realname}
		                        </p>
		                        <p className="box usermess">
		                            <span className="position mr bk"></span>
		                            <span className="type1 type mr bk hide">总裁</span>
		                            <span className="type2 type mr bk hide">专家</span>
		                            <span className="type3 icon bk"></span>
		                        </p>

		                    </div>
		                </div>
		                <div className="mybg">
		                    <div className="box address mc2">
		                        <span>{this.state.info.company}</span>
		                    </div>
		                    <div className="box tel mc2">
		                        <span>{this.state.info.mobile}</span>
		                    </div>

		                    <div className="box email mc2">
		                        <span>{this.state.info.email}</span>
		                    </div>
		                </div>


		            </div>
		            <div className="box tag">
		                <div className="bk box1 ">
		                    <span className="icons i tag1 bk auto"></span>

		                    <span className="bk text auto"><span className="b">人气</span> <span className="view">{this.state.info.view}</span></span>
		                </div>
		                <div className="bk box1 ">
		                    <span className="icons tag2 bk auto i"></span>
		                    <span className="auto text bk"><span className="b">赞</span> <span className="like">{this.state.info.like}</span></span>
		                </div>
		                <div className="bk box1 ">
		                    <span className="icons tag3 bk auto i"></span>
		                    <span className="auto text bk"><span className="b">收藏</span> <span className="collect">{this.state.info.collect}</span></span>
		                </div>
		            </div>
		            <div className="textmore txt bk">
		               <span className="bk more">更多</span>
		               <div className="texts bk">
		               	{this.state.info.description}
		               </div>
		            </div>
		            <div className="box link">
		              
		                <Link to="/card" className="bk box1 a nav" style={{color:'#fff'}}>我的名片夹</Link>
		             
		                <span className="bk box1 a shares" onClick={this.handClick}>递名片给好友</span>
		            </div>
		            <div className={`share ${this.state.share ? `` : `hide`}`} onClick={this.handShare}>
		                <i className="i"></i>
		            </div>
		        </div>
	        </div>	
		)
	}
}

MyCard.contextTypes = {
    router: React.PropTypes.object.isRequired
}