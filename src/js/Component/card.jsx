import React, {Component, PropTypes} from 'react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router'

import Tool from '../Config/Tool';

console.log(Tool)
import Footer from './footer.jsx';

export default class Card extends Component {
	constructor(props, context) {
		super(props);
		this.state = {
			info: {},
			list: []
		}

		//失去焦点
		this.handBlur = (e) =>{
			this.setState({
				focus: false
			})
		}

		//持续输入
		this.handInput = (event) => {
			console.log('持续输入',event)
			
		}

		//点击取消
		this.handClick = (e) =>{
			//this.refs.search.onblur();
			//or
			this.setState({
				focus: false
			})
		}

		//获取焦点
		this.handFocus = (e) => {
			this.setState({
				focus: true
			})
			console.log('获取焦点',e)
		}

	}

	componentWillMount() {
		Tool.ajax({
			data: {
				vuid:7,
            	type:3
			},
			url:'home/myCardLog'
		}).then((data)=>{
			console.log(data)
			if (data.status) {
				//没有名片
				if (data.data.info.card) {
					this.context.router.push(`/nocard`);
					return;
				}
				this.setState({
					info: Object.assign({}, data.data.info),
					list: Object.assign([], data.data.list)
				})
			}else{
				alert('测试环境获取id有延迟,请再次刷新');
				
			}
		})
	}

	render(){
		return(
			<div className="weui-tab wrapper cards">
			    <div className="weui-tab__panel">
					<section>
						<div id="searchForm">
		            		<div className={`box search ${this.state.focus ? `searchFouru` : ``}`}>
						        <i></i>
						        <input type="text" className={`searchInput bk sz ${this.state.focus ? `fouse` : ``}`}  placeholder="搜索" onBlur={this.handBlur} onInput={this.handInput} onFocus={this.handFocus} ref="search"/>
						        <span className={`submit bk ${this.state.focus ? `` : `hide`}`} onClick={this.handClick}>取消</span>
						        <div className="close hide"></div>
						    </div>
						    <div className="module bk">
						        <div className="mess box boxjustify ">
						            <div className="box">
						                <div className="bk">
						                    <img src={`${this.state.info.head}`} className="img bk" />
						                </div>
						                <div className="bk mo">
						                    <p className="box namepar"><span className="name bk">{this.state.info.realname}</span><span className="line bk"></span><span className="position bk">{this.state.info.position}</span></p>
						                    <p>
						                        <span className="bk compy">{this.state.info.company}</span>
						                    </p>
						                </div>
						            </div>
						            <div className="bk">
						                <Link to={`/mycard?vuid=${this.state.info.uid}`} className="giveCard bk">递名片给好友</Link>
						            </div>
						        </div>
						    </div>
		            		<p className="bottomText">这是我的底线</p>
	            		</div>
	            	</section>
			    </div>
			 	<Footer />
			</div>
		)
		
	}
}

Card.contextTypes = {
    router: React.PropTypes.object.isRequired
}
