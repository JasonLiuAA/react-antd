/*
 * @Author: 刘家辰
 * @Date: 2020-04-12 09:38:18
 * @LastEditTime: 2020-08-11 11:58:59
 * @LastEditors: 刘家辰
 * @Description:基于react的滑块验证
 * @FilePath:
 */
import React, { Component } from 'react';
import './index.less';

// 滑块
/**
 * @param  width        number      滑块长度 单位来px
 * @param  showSlider   boolean     是否显示滑块
 * @param  fun          arr [fun]   滑块成功调用的回调函数数组 函数依次执行
 * @param  reset        boolean     滑块重置
 * @param  event        str         鼠标使用滑块的作用范围，类名或id名  鼠标在该DOM元素之外将不能操作滑块
 * @param  clearTime    fun         定时器清理 外部定时器传入时 需要传入回调函数() => clearInterval(this.timer)清理定时器
 * */
export default class index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			leftX: 0,
			showSlider: this.props.showSlider,
			sendCode: false,
		};
		this.startX = 0;
		this.width = this.props.width - 40;
		this.sendCode = false;
		this.event = this.props.event;
	}
	componentDidMount() {
		// 不兼容IE8以下
		let event =
			document.getElementsByClassName(this.event)[0] || document.getElementById(this.event);
		event.addEventListener('mouseleave', this.sliderMleave);
		event.addEventListener('mouseup', this.sliderMup);
		event.addEventListener('mousemove', this.silerMove);
	}
	componentDidUpdate(preprops, propsstate) {
		if (this.props.showSlider !== preprops.showSlider) {
			this.setState({
				showSlider: this.props.showSlider,
			});
		}
	}
	// 重置
	reset = () => {
		this.setState({
			leftX: 0,
			showSlider: this.props.showSlider,
			sendCode: false,
		});
		this.startX = 0;
		this.width = this.props.width - 40;
		this.sendCode = false;
		this.props.clearTime();
	};
	//按下滑块启动
	sliderMdown = e => {
		// console.log("down")
		e.preventDefault();
		//记录滑块起始坐标
		this.startX = e.clientX;
		// 移除过渡效果
		if (this.state.leftX < this.width) {
			document
				.getElementsByClassName('login-SliderClick')[0]
				.classList.remove('transition_slider');
			document
				.getElementsByClassName('login-Slidered')[0]
				.classList.remove('transition_slider');
		}
	};
	//鼠标抬起
	sliderMup = e => {
		// console.log("up")
		if (this.sendCode || this.state.sendCode) {
			return;
		}
		if (this.state.leftX < this.width) {
			// 放开时候添加过渡效果
			document
				.getElementsByClassName('login-SliderClick')[0]
				.classList.add('transition_slider');
			document.getElementsByClassName('login-Slidered')[0].classList.add('transition_slider');
			this.startX = 0;
			this.setState({
				leftX: 0,
			});
		} else {
			this.sendCode = true;
			this.setState({
				sendCode: true,
			});
			if ((this.sendCode = true)) {
				for (let i = 0; i < this.props.fun.length; i++) {
					let item = this.props.fun[i];
					// console.log(item)
					item();
				}
			}
		}
	};
	//鼠标移动 登录框内
	silerMove = e => {
		e.preventDefault();
		// console.log("move")
		if (this.startX > e.clientX) {
			return;
		} else if (this.state.leftX >= this.width) {
			this.setState({
				//4个滑块切边像素
				leftX: this.width,
			});
			return;
		} else {
			if (this.startX) {
				this.setState({
					//4个滑块切边像素
					leftX: e.clientX - this.startX,
				});
			} else {
				this.setState({
					leftX: 0,
				});
			}
		}
	};
	//鼠标离开登录框
	sliderMleave = e => {
		// console.log("leave")
		if (this.state.leftX < this.width || !this.state.sendCode) {
			this.setState({
				leftX: 0,
			});
			this.startX = 0;
		}
	};
	render() {
		return (
			<div
				className="login-Slider"
				style={this.state.showSlider ? {} : { visibility: 'hidden' }}
			>
				{/*  已滑过区域 */}
				<div
					className="login-Slidered"
					style={this.startX ? { width: this.state.leftX + 2 + 'px' } : { width: 0 }}
				></div>
				{/* 滑块 */}
				<div
					className={this.state.sendCode ? 'login-SliderClick-ok' : 'login-SliderClick'}
					onMouseDown={this.sliderMdown}
					style={{ left: this.state.leftX + 'px' }}
				>
					{this.state.sendCode ? (
						<img src={require('./imgs/ic_hangqing_gouxuan_red.svg')} />
					) : (
						<img src={require('./imgs/ic_signup_arrow.svg')} />
					)}
				</div>
				{this.state.sendCode ? (
					<span className="login-sliderTitle-OK">验证通过</span>
				) : (
					<span className="login-sliderTitle">请按住滑块，拖动到最右边</span>
				)}
			</div>
		);
	}
}
