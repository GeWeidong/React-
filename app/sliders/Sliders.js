/**
 * Sliders
 */
import React, { Component, PropTypes } from 'react'
import styles from './style.css'

const propTypes = {
	
}

const defaultProps = {
	
}

class Sliders extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		var aStyles = {
			width: document.documentElement.clientWidth + "px"
		}
		return (
			<a href={this.props.link} className={styles["slide-a"]} style={aStyles}>
				<div className={styles["slide-li"]}>
					<h1 style={{color:'#fff',fontSize: 90}}>{this.props.indexNum}</h1>
				</div>
			</a>
		)
	}
}

Sliders.propTypes = propTypes
Sliders.defaultProps = defaultProps

export default Sliders;