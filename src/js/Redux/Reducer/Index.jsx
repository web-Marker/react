import {CHANG_TABLE} from '../Action/Index';
import {REQUEST_POSTS, RECEIVE_POSTS, GET_DATA_START, GET_DATA_SUCCESS, SET_DROP} from '../Action/Index'

export const navTab = (state = { type: true}, action) =>{
	switch (action.type) {
		case CHANG_TABLE:
			return Object.assign({},state,{type: action.data});
		default:
      		return state
	}
}	

//首次渲染页面
export const fetchData = (state = {fetchload: true, list: {}}, action) =>{
	switch (action.type) {
		case REQUEST_POSTS:
			return Object.assign({},state,{fetchload: action.data});
		case RECEIVE_POSTS:
			console.log('fetchData',action.data)
			return Object.assign({},state,{fetchload: action.data, list: action.json});
		default: 
			return state;
	}
}

//获取数据
export const getData = (state = {getload: true, list: {}}, action) =>{
	switch (action.type) {
		case GET_DATA_START:
			return Object.assign({},state,{getload: action.data});
		case GET_DATA_SUCCESS:		
			return Object.assign({},state,{getload: action.data, list: action.json});
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





