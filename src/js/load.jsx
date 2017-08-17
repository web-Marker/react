import React, {Component, PropTypes} from 'react';

export default class Load extends Component {
	constructor(props) {
		super(props)
		this.state = {
			toggle: true
		}
	}

	componentWillReceiveProps(nextProps){
		
		this.setState({
			toggle:nextProps.toggle
		})
	}

	render(){
		return (
			<div id="loadingToast" className={this.state.toggle ? '' : 'hide'}>
			    <div className="weui-mask_transparent"></div>
			    <div className="weui-toast">
			        <i className="weui-loading weui-icon_toast"></i>
			        <p className="weui-toast__content">数据加载中</p>
			    </div>
			</div>
		)
	}
}
