import React, { Component, PropTypes } from 'react';
import Sliders from './sliders/Sliders';
import style from './style.css';
import banner1 from './img/banner1.png'
import banner2 from './img/banner2.png'
import banner3 from './img/banner3.png'

const propTypes = {
	
}

const defaultProps = {
	
}

let SlideInter;

const opts = [{
	link: 'javascript:;',
	src: banner1
},{
	src: banner2
},{
	link: '#',
	src: banner3
}]

class Slider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			baseWidth: document.documentElement.clientWidth, //宽度
			startX: "",
			curX: "",
			moveX: "",
			time: 0,
			distance: 0, //移动距离
			swiper: 30, //滑动滚动触发距离
			index: 0,
			length: 3,
			continuous: false, //是否循环滚动
			autoSlide: false,
			slideSpeed: 2000
		}
	}
	touchStart (e) {
		this.setState({
			time: 0,
			startX: e.touches[0].pageX
		})
	}

	touchMove (e) {
		// 测试git
		e.preventDefault()
		if(this.state.autoSlide) {
			this.stopSlideFun();
		}
		var _curX = e.touches[0].pageX
		var _moveX = _curX - this.state.startX
		var _distance = -(this.state.index * this.state.baseWidth - _moveX)

		this.setState({
			curX: _curX,
			moveX: _moveX,
			time: 0,
			distance: _distance
		})
	}

	touchEnd (e) {
		if(Math.abs(this.state.moveX) <= this.state.swiper) {
			this.slideFun('', '.5')
		} else {
			if(this.state.moveX > this.state.swiper) {
				this.slideFun('prev', '.5')
			} else if(Math.abs(this.state.moveX) > this.state.swiper) {
				this.slideFun('next', '.5')
			}
		}

		this.setState({
			moveX: 0
		})
	}

	/**
	 * index控制
	 * @param  {num} go   指定index数值
	 * @param  {num} time transition时间
	 */
	slideFun (go, time) {
		var _index = this.state.index
		if(typeof go === "number") {
			_index = go
		} else if(go == "next") {
			_index ++
		} else if(go == "prev") {
			_index --
		}

		// 是否循环滚动
		// if(this.state.continuous) {
		// 	if(_index > this.state.length) {
		// 		this.scrollFun(_index, time)
		// 		//返回第一个
		// 		_index = 1
		// 		setTimeout(() => {
		// 			this.scrollFun(_index, 0)
		// 			this.setState({
		// 				index: _index
		// 			})
		// 		}, 500);
		// 	} else if(_index < 1) {
		// 		this.scrollFun(_index, time)
		// 		//返回最后一个
		// 		_index = this.state.length
		// 		setTimeout(() => {
		// 			this.scrollFun(_index, 0)
		// 			this.setState({
		// 				index: _index
		// 			})
		// 		}, 500)
		// 	} else {
		// 		this.scrollFun(_index, time)
		// 		this.setState({
		// 			index: _index
		// 		})
		// 	}
		// } else {
		if(_index >= this.state.length) {
			_index = this.state.length-1;
		} else if(_index < 0) {
			_index = 0;
		}
		this.scrollFun(_index, time)
		this.setState({
			index: _index
		})
		// }
	}

	/**
	 * 滚动函数
	 * @param  {num} index 指定滚动的index
	 * @param  {num} time  transition的时间
	 */
	scrollFun (index, time) {
		this.setState({
			time: time,
			distance: -(index * this.state.baseWidth)
		})
	}

	stopSlideFun() {
		clearInterval(SlideInter)
	}

	componentDidMount() {
	}

	render() {

		var slideStyle = {
			width: (document.documentElement.clientWidth * (this.state.length)) + "px",
			WebkitTransform: 'translate3d(' + this.state.distance + "px,0,0)",
			transform: 'translate3d(' + this.state.distance + "px,0,0)",
			WebkitTranstion: "all " + this.state.time + "s ease-out" ,
			transition: "all " + this.state.time + "s ease-out"
		}

		var dots = opts.map((item, i) => {
			return (
				<span key={i} className={this.state.index == i ? style["active"] : style["dots"]}></span>
			)
		}) 

		return (
			<div className={style["slide-wrap"]}>
				<div className={style["slide-ul"]} style={slideStyle} onTouchStart={e=>this.touchStart(e)} onTouchMove={e=>this.touchMove(e)} onTouchEnd={e=>this.touchEnd(e)} >
					<Sliders indexNum={1}/>
					<Sliders indexNum={2}/>
					<Sliders indexNum={3}/>
				</div>
				<div className={style["dots-wrap"]}>
					{dots}
				</div>
			</div>
		);
	}
}

Slider.propTypes = propTypes
Slider.defaultProps = defaultProps

export default Slider;