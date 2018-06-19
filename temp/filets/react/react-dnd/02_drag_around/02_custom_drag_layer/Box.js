import React from 'react'
import PropTypes from 'prop-types'

const styles: React.CSSProperties = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	cursor: 'move',
}

export default class Box extends React.PureComponent<BoxProps> {
	static propTypes = {
		title: PropTypes.string.isRequired,
		yellow: PropTypes.bool,
	}

	render() {
		const { title, yellow } = this.props
		const backgroundColor = yellow ? 'yellow' : 'white'

		return <div style={{ ...styles, backgroundColor }}>{title}</div>
	}
}
