/*
* @Author: Mark
* @Date:   2017-07-07 16:27:22
* @Last Modified by:   mark
* @Last Modified time: 2017-07-25 10:50:36
*/

import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';
import router from './Route';



import fetchJsonp from 'fetch-jsonp';

//加载样式
import 'Sy/weui';
import 'Sy/style';
import 'Sy/reset';

//加载rem计算
import './phonerm';

const url = 'https://api.pengt.com/';
const str = 'from=308f23b7cada2828bb7ade10401aa5f8&uid=7&sign=04b29480233f4def5c875875b6bdc3b1';

/**
 * *获取token
 * @return {[type]} [description]
 */

async function gettoken(){
	try{
		let reponse = await fetchJsonp(url + 'home/getToken?' + str)
		let data = reponse.json();
		return data;
	}catch(e){
		console.log("获取token错误", e);
	}
}

if (process.env.NODE_ENV === 'development') {
	console.log(process.env.NODE_ENV)
	localStorage.setItem('uid', '7')
	gettoken().then((data)=>{
		
		localStorage.setItem('token',data.data.token);
	});
}

render(
	router
	,document.getElementById('app')
);