/*
* @Author: Mark
* @Date:   2017-07-17 17:17:54
* @Last Modified by:   mark
* @Last Modified time: 2017-07-17 17:31:12
*/

import React, {Component, PropTypes} from 'react';

export default class Of extends Component {
	constructor(props) {
		super(props)

	}

	render(){
		return (
			<dd className="bk of">
				<a href={`needdetail.html?tid=${this.props.attr.tid}`} className="nav" >
					<div className="title box boxjustify">
						<span className="box"><span className="bk e">{this.props.attr.subject}</span><span className={`bk b ${this.props.attr.authorid == `0` ? `` : `hide`}`}>朋拓委托</span></span>
						<span className={`bk icon1 ic ${this.props.attr.status == `0` ? `` : `hide`}`}>未投标</span>
						<span className={`bk icon2 ic ${this.props.attr.status == `1` ? `` : `hide`}`}>已投标</span>
						<span className={`bk icon3 ic ${this.props.attr.status == `2` ? `` : `hide`}`}>已中标</span>
						<span className={`bk icon4 ic ${this.props.attr.status == `3` ? `` : `hide`}`} >未中标</span>
						<span className={`bk icon4 ic ${this.props.attr.status == `4` ? `` : `hide`}`} >已结束</span>

					</div>
					<div className="bk">
						<div className="bk mtext">
							{this.props.attr.message}
						</div>
						<div className="mtab1 box boxjustify">
							<span className="size box"><span className="bk i"></span><span className="bk em">{this.props.attr.replies}</span><span className="s bk">人已投标</span></span>
							<span className="bk date">{this.props.attr.dbdateline}</span>
						</div>
						<div className="mtab2 box boxjustify">
							<span className="box j"><span className="bk e">预算金额</span><span className="b bk">¥ {this.props.attr.budget}</span></span>
							<span className="box d"><span className="bk e">剩余天数</span> <span className="bk l">{this.props.attr.days}</span></span>
						</div>
					</div>
				</a>
			</dd>
		)
	}
}