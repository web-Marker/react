import React, {Component, PropTypes} from 'react';
import Footer from './footer';
import { is, fromJS} from 'immutable';

export default class My extends Component {
	constructor(props) {
		super(props)
	}

	shouldComponentUpdate(nextProps, nextState){
		return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
	}

	render(){
		return(
			<div className="weui-tab wrapper my">
			    <div className="weui-tab__panel">
					<div>
					    <div className="head box boxjustify">
					        <div className="navs box boxjustify">
					            <div className="box pic">
					                <img src="" className="img bk" />
					                <div className="bk picname"></div>
					            </div>
					        </div>
					    </div>
					    <div className="list">
					        <ul>
					            <li>
					                <a href="mytb.html">
					                    <div className="cont box boxjustify">
					                        <div className="box">
					                            <span className="bk icon3 icon b"></span>
					                            <span className="bk sp">我的投标</span>
					                        </div>
					                        <span className="bk e"></span>
					                    </div>
					                </a>
					            </li>
					            <li>
					                <a href="myzb.html">
					                    <div className="cont box boxjustify">
					                        <div className="box">
					                            <span className="bk icon4 icon b"></span>
					                            <span className="bk sp">我的招标</span>
					                        </div>
					                        <span className="bk e"></span>
					                    </div>
					                </a>
					            </li>
					            <li className="mb">
					                <a href="mywt.html">
					                    <div className="cont box boxjustify">
					                        <div className="box">
					                            <span className="bk icon5 icon b"></span>
					                            <span className="bk sp">我的委托</span>
					                        </div>
					                        <span className="bk e"></span>
					                    </div>
					                </a>
					            </li>
					            <li>
					                <a href="mysign.html">
					                    <div className="cont box boxjustify">
					                        <div className="box">
					                            <span className="bk icon6 icon b"></span>
					                            <span className="bk sp">我报名的活动</span>
					                        </div>
					                        <span className="bk e"></span>
					                    </div>
					                </a>
					            </li>
					            <li>
					                <a href="myrelease.html">
					                    <div className="cont box boxjustify">
					                        <div className="box">
					                            <span className="bk icon7 icon b"></span>
					                            <span className="bk sp">我发布的活动</span>
					                        </div>
					                        <span className="bk e"></span>
					                    </div>
					                </a>
					            </li>
					            <li className="mb">
					                <a href="contacts.html">
					                    <div className="cont box boxjustify">
					                        <div className="box">
					                            <span className="bk icon8 icon b"></span>
					                            <span className="bk sp">通讯录</span>
					                        </div>
					                        <span className="bk e"></span>
					                    </div>
					                </a>
					            </li>
					            <li className="mb">
					                <a href="../Mycard/mycard" >
					                    <div className="cont box boxjustify">
					                        <div className="box">
					                            <span className="b bk icon1 icon"></span>
					                            <span className="bk sp">我的名片</span>
					                        </div>
					                        <span className="bk e"></span>
					                    </div>
					                </a>
					            </li>
					            <li>
					                <a href url="../Gy/gy">
					                    <div className="cont box boxjustify last">
					                        <div className="box">
					                            <span className="bk icon2 icon b"></span>
					                            <span className="bk sp">关于朋拓</span>
					                        </div>
					                        <span className="bk e"></span>
					                    </div>
					                </a>
					            </li>
					        </ul>
					    </div>
					</div>
			    </div>
			    <Footer />
			</div>
		)
	}
}