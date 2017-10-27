import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import *as action from '../Redux/Action/Index';
import { is, fromJS} from 'immutable';


const el = document.body.classList;
let num = 1;

class Drop extends Component {
	constructor(props) {
		super(props)
		this.state = {
			startY: 0,
			diffY: 0,
			moveY:0,
			distance:50,
			height:0
		}

		this.handleStart = (e) =>{
			e.preventDefault();
    		e.stopPropagation();
    		if (document.body.classList.contains('refreshing')) return;
			if (!this.refs.drop)return;
			this.setState({
				startY: e.targetTouches[0].pageY,
				diffY: 0
			})
		}

		this.handleMove = (e) =>{
			if (document.body.classList.contains('refreshing') || !this.state.startY)return;
			e.preventDefault();
    		e.stopPropagation();
			let diffY = e.targetTouches[0].pageY - this.state.startY;
		
			if (diffY < 0 ) diffY = 0;
			diffY = Math.pow(diffY, 0.8);

			el.add('touching');
			if (diffY < this.state.distance) {
				el.remove("pull-up");
				el.add("pull-down");	
			}else{
				el.remove("pull-down");
				el.add("pull-up");
			}
			if (!this.refs.drop)return;
			this.setState({
				diffY: diffY,
				height:diffY+'px'
			})
		}

		this.handleEnd = (e) =>{
			if (!this.refs.drop)return;
			this.setState({
				startY: false
			})
			if (this.state.diffY <= 0 || el.contains('refreshing')) return;
			el.remove("touching");
			el.remove("pull-down");
			el.remove("pull-up");
			if (Math.abs(this.state.diffY) <= this.state.distance) {
				this.setState({
					height:0
				})
				
			}else{
				this.setState({
					height:this.state.distance
				})
				el.add("refreshing");

				//使用redux之后可以不需要refresh方法 
				//this.refresh(this.props.run);

				//使用redux后 发送一个action
				this.props.dispatch(action.onDrop(num++))
				console.log(this.props)
			}
			return false;

		}

		//使用redux之后可以不需要refresh方法 
		this.refresh = (callback) =>{
			console.log(callback)
			if (callback) callback(this.pullToRefreshDone)
		}

		this.pullToRefreshDone = () =>{
			console.log("3")
			el.remove("refreshing"); //移除
    		this.setState({
    			height:0
    		})
		}

		//使用redux后的刷新请求数据
	}

	componentWillReceiveProps(nextProps){
		console.log('drop',nextProps)
		if (!nextProps.getload && el.contains('refreshing')) {
			this.pullToRefreshDone();
		}
	}

	componentWillMount(){
		window.addEventListener('touchstart', this.handleStart.bind(this));
		window.addEventListener('touchmove', this.handleMove.bind(this));
		window.addEventListener('touchend', this.handleEnd.bind(this));
	}

	shouldComponentUpdate(nextProps, nextState){
		return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
	}

	render(){
		return(
			<div className="dropload-layer" style={{height:this.state.height}} ref="drop">
				<div className="inner">
					<div className="arrow">
					</div>
		        	<div className="loader"></div>
		        	<div className="down">下拉刷新</div>
		        	<div className="up">释放刷新</div>
		        	<div className="refresh">正在刷新</div>
	        	</div>
        	</div>
		)
	}
}

//上级给下级的props
const mapStateToProps = (state) =>{
	return {
		getload: state.getData.toJS().getload
	}
}


export default connect(mapStateToProps)(Drop);