import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';


class Load extends Component {
	constructor(props) {
		super(props)
		this.state = {
			toggle:true
		}
	}

	componentWillReceiveProps(nextProps){
		const {fetchload, getload} = this.props;
		console.log(this.props)
		if (!is(fromJS(fetchload), fromJS(nextProps.fetchload))) {
			this.setState({
				toggle: nextProps.fetchload
			})
			console.log(nextProps.fetchload)
			console.log('fetchload')
		}

		if (!is(fromJS(getload), fromJS(nextProps.getload))) {
			this.setState({
				toggle: nextProps.getload
			})
			console.log(nextProps.getload)
			console.log('getload')
		}
		
	}

	shouldComponentUpdate(nextProps, nextState){
		return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
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

//上级给下级的props
const mapStateToProps = (state) =>{
	console.log(state)
	return {
		fetchload: state.fetchData.toJS().fetchload,
		getload: state.getData.toJS().getload
	}
}


export default connect(mapStateToProps)(Load);
