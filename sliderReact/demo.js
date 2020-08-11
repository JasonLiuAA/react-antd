/*
 * @Author: 刘家辰
 * @Date: 2020-08-11 11:39:49
 * @LastEditTime: 2020-08-11 11:55:09
 * @LastEditors: 刘家辰
 * @Description:滑块 demo
 */

import React, { Component } from 'react';
import Silder from './slider';

export default class demo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showSlider: true, //是否显示滑块
			countdown: 60, //倒计时开始时间
		};
	}

	//定时器
	Time = () => {
		// 外部传入定时器  倒计时
		this.timer = setInterval(() => {
			this.setState({
				countdown: (this.state.countdown -= 1),
			});
		}, 1000);
	};
	// 接口 发送验证码
	rebindcode = () => {
		console.log('发送验证码...');
	};
	//重置滑块
	reset = () => {
		this.refs.silder.reset();
	};
	render() {
		const { showSlider, countdown } = this.state;
		return (
			<div id="renamePhone">
				<div>{countdown}</div>
				<button onClick={() => this.reset()}>重置滑块</button>
				<Silder
					event={'renamePhone'}
					width={400}
					showSlider={showSlider}
					fun={[this.Time, this.rebindcode.bind(this)]}
					ref="silder"
					clearTime={() => clearInterval(this.timer)}
				/>
			</div>
		);
	}
}
