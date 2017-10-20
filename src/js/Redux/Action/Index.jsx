
export const CHANG_TABLE = 'CHANG_TABLE'; //头部tab导航切换

export const REQUEST_POSTS = 'REQUEST_POSTS'; //开始发送请求
export const RECEIVE_POSTS = 'RECEIVE_POSTS'; //收到请求结果
export const GET_DATA_START = 'GET_DATA_START'; //开始发送请求
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS'; //收到请求结果
export const SET_DROP = 'SET_DROP'; //发起下拉刷新请求

import Tool from '../../Config/Tool'

//tab切换action 
export const changeTab = (data) =>{
	return {
		type: CHANG_TABLE,
		data
	}
}

//发送请求开始
export const requestPosts = (data) =>{
	return {
    	type: REQUEST_POSTS,
    	data
  	}
}

//收到了请求结果
export const receivePosts = (data, json) =>{
	return {
    	type: RECEIVE_POSTS,
    	data,
    	json
  	}
}

//页面第一次渲染
export const fetchPosts = (start, end) =>{
	return dispatch => {
		dispatch(requestPosts(start));
		Tool.ajax({
			data:{
				mod: 'getBidding',
	        	appid:'pengt'
			},
			url:'bidding'
		}).then((data)=>{
			console.log(data)
			if (data.code == 100) {
				alert('测试环境获取id有延迟,请再次刷新');
				return;
			}
			dispatch(receivePosts(end, data.msg.data));
			// this.setState({
			// 	list: Object.assign([], data.msg.data),
			// })
		})
	}
}

//发送请求开始
export const getDataStart = (data) =>{
	return {
    	type: GET_DATA_START,
    	data
  	}
}

//收到了请求结果
export const getDataSuccess = (data, json) =>{
	return {
    	type: GET_DATA_SUCCESS,
    	data,
    	json
  	}
}

//手动获取数据的action
export const newGetData = (data, url, start, end) => {
    return dispatch => {
        dispatch(getDataStart(start));
		Tool.ajax({
			data:data,
			url:url
		}).then((data)=>{
			console.log(data)
			if (data.code == 100) {
				alert('测试环境获取id有延迟,请再次刷新');
				dispatch(getDataSuccess(start, {}));
				return;
			}
			dispatch(getDataSuccess(end, data.data || data.msg.data));
			
		})
    }
}

//发起下拉刷新
export const onDrop = (data) => {
	return {
		type: SET_DROP,
		data
	}
}