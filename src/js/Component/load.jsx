import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

class Load extends Component {
	constructor(props) {
		super(props)
		this.state = {
			toggle:true
		}
	}

	componentWillReceiveProps(nextProps){
		const {fetchload, getload} = this.props;
		
		if (fetchload != nextProps.fetchload) {
			this.setState({
				toggle: nextProps.fetchload
			})
		}

		if (getload != nextProps.getload) {
			this.setState({
				toggle: nextProps.getload
			})
		}
		
	}


	render(){
		console.log('load',this.state.toggle)
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

//上级给下级的props
const mapStateToProps = (state) =>{
	return {
		fetchload: state.fetchData.fetchload,
		getload: state.getData.getload
	}
}


export default connect(mapStateToProps)(Load);
