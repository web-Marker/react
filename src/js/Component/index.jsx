/*
* @Author: Mark
* @Date:   2017-07-07 16:59:18
* @Last Modified by:   mark
* @Last Modified time: 2017-07-17 16:51:34
*/

import React, {Component, PropTypes} from 'react';
import Navtab from './navtab'
import List from './list'
import Load from './load'
import Drop from './drop'

let num = 0;

export default class Index extends Component {

	constructor(props) {
		super(props)
		this.state = {
         	demand: true, 
         	load: true,
            num:num
        }

        this.handleClick = (value) => {
        	this.setState({
        		demand:value,
        		load:true
        	})
        }

        this.complete = (value) => {
        	console.log(value)
        	this.setState({
        		load:value
        	})
        }

        this.fetch = (call)=>{
            num++;
            this.setState({
                num: num,
                load: true,
                call: call
            },()=>{
                console.log(this.state.num)
            })
          
        }
 
	}

	render() {
		return (
			<div className={`index need`}>
				<Navtab handleClick={this.handleClick} />
                <Drop run={this.fetch}/>
				<List data={this.state.demand} complete={this.complete} size={this.state.num} call={this.state.call} />
				<Load toggle={this.state.load}/>
			</div>		
			
		)
	}
}
