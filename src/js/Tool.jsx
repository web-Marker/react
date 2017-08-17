import fetchJsonp from 'fetch-jsonp';

const url = 'https://api.pengt.com/';
const froms = '308f23b7cada2828bb7ade10401aa5f8';

module.exports =  {
	objorString(obj){
		let array = [];
		for (let key in obj){
			let str = key+'='+obj[key];
			array.push(str);
		}
		let urlParam = array.join('&')
		return urlParam;
	},

	async ajax(params){
		params.data.from = froms;
		if (localStorage.getItem('token')) {
			params.data.token = localStorage.getItem('token');
	    }

	    let datas = {};
	    	datas = params.data;
	    try{

			let reponse = await fetchJsonp(url + params.url + '?' + this.objorString(datas))
			let data = reponse.json();
			return data;

		}catch(e){
			console.log("获取错误", e);
		}  
	}
}


