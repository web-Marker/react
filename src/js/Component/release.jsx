import React, {Component, PropTypes} from 'react';
import Tool from '../Config/Tool';
import { Link } from 'react-router'
import { is, fromJS} from 'immutable';

let imgAll=[],imgs=[],localId=[];

export default class Release extends Component {
	constructor(props, context) {
		super(props);
		this.state = {
			info: {},
			mobilereg: false,
			signDialogTitle:'',
			signDialogTxt:'',
			disabled:false,
			codetext:'发送验证码',
			upload: false,
			imgAll:'',
			imgs:'',
			localId:[],
			name:'',
			tel:'',
			code:'',
			title:'',
			date:'',
			city:'',
			polace:'',
			size:'',
			money:'',
			textare:'',
			success:false
		}

		//隐藏弹框
		this.dialogHide = () =>{
			this.setState({
				mobilereg:false
			})
		},

		//提交
		this.onSubmit = () =>{
			if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.state.tel))){
				this.setState({
					mobilereg:true,
					signDialogTitle:'提交失败',
					signDialogTxt:'请输入正确的手机号码'
				})
				return;
			}

			if (!this.state.name || !this.state.title || !this.state.date || !this.state.city || !this.state.polace ||!this.state.size || !this.state.money || !this.state.textare) {

				this.setState({
					mobilereg:true,
					signDialogTitle:'活动发布失败',
					signDialogTxt:'请输入完整的活动资料'
				})
		        return;
			}

			Tool.ajax({
				data:{
					'uid':localStorage.getItem('uid'),
	               	'fid':'45',
	               	'subject': this.state.title,
	               	'message': this.state.textare,
	               	'special': '4',
	               	'startTime': this.state.date,
	               	'city': this.state.city,
	               	'place': this.state.polace,
	               	'membercount': this.state.size,
	               	'cost': this.state.money,
	                'aidUsed': imgs.join(','),
					'aidAll': imgAll.join(',')
				},
				url: 'forum/newThread',
			}).then((data)=>{
				console.log(data)
				if (data.status) {
					this.setState({
						success: true
					})

					let goIndex = setTimeout(()=>{
						this.context.router.push(`/index`);
					},3000)
				}else{
					this.setState({
						mobilereg:true,
						signDialogTitle:'提交失败',
						signDialogTxt:data.msg
					})
				}
			})

		},

		//获取值
		this.hangChange = (type,event) => {
			let val = event.target.value;

			if (Object.is(type, 'name')) {
				this.setState({
					name:val
				})
			}else if (Object.is(type, 'mobile')) {
				this.setState({
					tel:val
				})
			}else if (Object.is(type, 'code')) {
				this.setState({
					code:val
				})
			}else if (Object.is(type, 'title')) {
				this.setState({
					title:val
				})
			}else if (Object.is(type, 'date')) {
				this.setState({
					date:val
				})
			}else if (Object.is(type, 'city')) {
				this.setState({
					city:val
				})
			}else if (Object.is(type, 'polace')) {
				this.setState({
					polace:val
				})
			}else if (Object.is(type, 'size')) {
				this.setState({
					size:val
				})
			}else if (Object.is(type, 'money')) {
				this.setState({
					money:val
				})
			}else if (Object.is(type, 'textare')){
				this.setState({
					textare:val
				})
			}
		},

		//验证码倒计时
		this.countDown = () =>{
			let time = 60;
	        let times = setInterval(function(){
	            time --;
	            if ( time < 0 ) {
	                clearInterval(times);
	                this.setState({
	                	codetext:'发送验证码',
	                	disabled:false
	                })
	                return;
	            }
	            this.setState({
                	codetext:time+'s',
                	disabled:true
                })
	        },1000)
		},

		//上传图片
		this.addPic = () =>{
			let _this = this;
			alert('测试环境无法获取用户签名');
			wx.chooseImage({
			    count: 1,
			    sizeType: ['original', 'compressed'],
			    sourceType: ['album', 'camera'],
			    success: function (res) {
		    	console.log(res)
		        var localIds = res.localIds;
		        	_this.setState({
		        		upload:true
		        	})
		      		//$('#releaseupload').removeClass('hide');
                    wx.uploadImage({
					    localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
					    success: function (res) {
					        let serverId = res.serverId;
					        Tool.ajax({
								data:{
									uid:localStorage.getItem('uid'),
					        		mediaid:serverId,
								},
								url: 'forum/uploadAttach',
							}).then((data)=>{
								if (data.status) {
									imgAll.push(data.data);
					        		imgs.push(data.data);
					        		localId.push(localIds[0]);
									_this.setState({
						        		upload:false,
						        		imgAll:imgAll,
						        		imgs:imgs,
						        		localId:localId
						        	})
								}
							})
					    }
					});
			    }
			})
		},

		//发送验证码
		this.sendCode = () =>{
			if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.refs.tel.value))){
				this.setState({
					mobilereg:true,
					signDialogTitle:'发送失败',
					signDialogTxt:'请输入正确的手机号码'
				})
				return;
			}

			if (this.state.disabled) {
				return;
			}

			Tool.ajax({
				data:{
					phone:this.refs.tel.value,
				},
				url: 'auth/send',
			}).then((data)=>{
				console.log('发送验证码',data)
				if(data.status) {
					this.countDown();
				}else{
					this.setState({
						mobilereg:true,
						signDialogTitle:'发送失败',
						signDialogTxt:data.msg
					})
					
				}
			})

		}
		
	}

	componentWillMount(){
		Tool.ajax({
			data:{
				uid:localStorage.getItem('uid'),
				vuid:localStorage.getItem('uid')
			},
			url: 'home/cardInfo',
		}).then((data)=>{
			console.log(data)
			this.setState({
				info: Object.assign({}, data.data),
				name: data.data.realname,
				tel: data.data.mobile
			},()=>{
				console.log(this.state)
			})
		})
	}

	shouldComponentUpdate(nextProps, nextState){
		return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
	}

	render(){
		return (
			<div className="release newrele">
	        	<div className="wrapper release">
	                <div className="namecard bk">
	                    <div className="box cardbox">
	                        <div className="bk pic">
	                            <img src={`${this.state.info.head}`} className="cardpic bk" />
	                        </div>
	                        <div className="bk telorname box1">
	                            <div className="names cardinput bk sz">
	                                <input type="text"  className="mname input" placeholder="请输入姓名" value={`${this.state.name}`} onChange={this.hangChange.bind(this,'name')} />
	                            </div>
	                            <div className="box tels cardinput sz box1">
	                                <input type="number" className="input tel bk" name="" placeholder="请输入电话号码" value={`${this.state.tel}`} ref="tel" onChange={this.hangChange.bind(this,'mobile')}/>
	                                <span className={`sendCode bk a ${this.state.tel ? `hide` : ``}`} onClick={this.sendCode}>{this.state.codetext}</span>
	                            </div>
	                        </div>
	                    </div>
	                    <div className={`box sz parIn codeinput ${this.state.tel ? `hide` : ``}`}>
	                        <span className="bk t">验证码</span>
	                        <input type="number" className="bk input code" name="" placeholder="请输入验证码" onChange={this.hangChange.bind(this,'code')}/>
	                    </div>
	                </div>
	                <div className="relaaseView">
	                    <p className="p box">
	                        <span className="sp bk">主题</span>
	                        <input type="text" name="rtitle" className="bk text" placeholder="请输入活动主题(最多20字)" onChange={this.hangChange.bind(this,'title')} />
	                    </p>
	                    <div className="p pk box">
	                        <span className="sp bk">时间</span>
	                        <div className="dateInput">
	                            <input type="date" name="rdata" className="bk text dates" placeholder="请输入活动日期"  onChange={this.hangChange.bind(this,'date')}/>
	                        </div>
	                    </div>
	                    <div className="p pk box">
	                        <span className="sp bk">地点</span>
	                        <div className="addressInput">
	                        	<select className="bk text address" style={{    background: "#fff",direction: "rtl"}} onChange={this.hangChange.bind(this,'city')}>
	                        		<option value ="0">请选择省份</option>
									<option value ="北京">北京</option>
									<option value ="上海">上海</option>
									<option value="广州">广州</option>
								</select>
	                        </div>
	                    </div>
	                    <div className="p box">
	                        <span className="sp bk">地址</span>
	                        <input type="text" name="polace" name="rsp" placeholder="请输入活动详细地址(最多15字)" className="bk text" onChange={this.hangChange.bind(this,'polace')}/>
	                    </div>
	                    <div className="p pk box">
	                        <span className="sp bk">人数</span>
	                        <div className="numberInput">
	                            <input type="text" name="rnumber" className="bk text number" placeholder="请输入人数"  onChange={this.hangChange.bind(this,'size')}/>
	                        </div>
	                    </div>
	                    <div className="p box last">
	                        <span className="sp bk">现场收费</span>
	                        <div className="box w">
	                            <input type="number" name="rw" className="bk text winput" onChange={this.hangChange.bind(this,'money')}/>
	                            <b className="bk t">元人</b>
	                        </div>
	                    </div>
	                </div>

	                <div className="picer">
	                    <div className="title box">
	                        <span className="line"></span><span>活动介绍</span>
	                    </div>
	                    <textarea placeholder="此处输入会议相关介绍及注意事项"   className="area" name="rtextare" onChange={this.hangChange.bind(this,'textare')}></textarea>

	                    <div className="addPic cf">
	                        <div className="bk mr20 bgAdd fl" onClick={this.addPic}>
	                            <img src="http://img.pengt.com/static/images/37@2x.png" className="bgImg"/>
	                        </div>
	                        {
	                        	this.state.localId.map((val, index)=>{

	                        		return  <div class="picBox bk fl" key={index}>
					                            <img src={`${val}`} class="images-image"/>
					                        </div>
	                        	})
	                        }
	                        
	                    </div>
	                </div>

	                <div className="releaseSubmit weui-btn weui-btn_primary submits" onClick={this.onSubmit}>确认提交</div>
	            </div>
	            <div className={`signDialog ${this.state.mobilereg ? `` : `hide`}`} >
	                <div className="weui-mask"></div>
	                <div className="weui-dialog">
	                    <div className="weui-dialog__hd"><strong className="weui-dialog__title signDialogTitle">{this.state.signDialogTitle}</strong></div>
	                    <div className="weui-dialog__bd signDialogTxt">{this.state.signDialogTxt}</div>
	                    <div className="weui-dialog__ft">
	                        <div className="weui-dialog__btn weui-dialog__btn_primary signDialogbtn" onClick={this.dialogHide}>知道了</div>
	                    </div>
	                </div>
	            </div>
	            <div id="toast releasetoast" className={`${this.state.success?``:`hide`}`}>
	                <div className="weui-mask_transparent"></div>
	                <div className="weui-toast">
	                    <i className="weui-icon-success-no-circle weui-icon_toast"></i>
	                    <p className="weui-toast__content">活动已发布</p>
	                </div>
	            </div>
	            <div id="loadingToast releaseupload" className={`${this.state.upload ? `` : `hide`}`}>
	                <div className="weui-mask_transparent"></div>
	                <div className="weui-toast">
	                    <i className="weui-loading weui-icon_toast"></i>
	                    <p className="weui-toast__content">图片上传中</p>
	                </div>
	            </div>
	        </div>
		)
	}
}

Release.contextTypes = {
    router: React.PropTypes.object.isRequired
}

