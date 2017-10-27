import {CHANG_TABLE} from '../Action/Index';
import {REQUEST_POSTS, RECEIVE_POSTS, GET_DATA_START, GET_DATA_SUCCESS, SET_DROP} from '../Action/Index'
import Immutable from 'immutable'

//两个tab的切换
const defaultType = Immutable.fromJS({type: true});

export const navTab = (state = defaultType, action) =>{
	switch (action.type) {
		case CHANG_TABLE:
			return state.set('type',action.data)
			//Object.assign({},state,{type: action.data});
		default:
      		return state
	}
}	

//首次渲染页面
const defaultState = Immutable.fromJS({fetchload: true, list: {}})

export const fetchData = (state = defaultState, action) =>{
	switch (action.type) {
		case REQUEST_POSTS:
			return state.set('fetchload', action.data) 
			//  Object.assign({},state,{fetchload: action.data});
		case RECEIVE_POSTS:
			console.log('fetchData',action.data)
			return Immutable.Map({'fetchload': action.data, 'list': action.json})
			//return Object.assign({},state,{fetchload: action.data, list: action.json});
		default: 
			return state;
	}
}

//获取数据
const defaultGetState = Immutable.fromJS({getload: true, list: {}})

export const getData = (state = defaultGetState, action) =>{
	switch (action.type) {
		case GET_DATA_START:
		console.log(action.data)
			return state.set('getload', action.data)
			//Object.assign({},state,{getload: action.data});
		case GET_DATA_SUCCESS:
					
			return Immutable.Map({'getload': action.data, 'list': action.json}) 
			//Object.assign({},state,{getload: action.data, list: action.json});
		default: 
			return state;
	}

}

//发起下拉刷新
export const setDrop = (state = {isdorp: 0}, action) =>{
	switch (action.type) {
		case SET_DROP:
		console.log(action.data)
			return Object.assign({},state,{isdorp: action.data});
		default:
			return state; 
	}
}





