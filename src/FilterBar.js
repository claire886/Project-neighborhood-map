import React from 'react'
import PropTypes from 'prop-types'

class FilterBar extends React.Component {
	static proptypes = {
		onFilterLocations: PropTypes.func.isRequired
	}

	getQuery() {
		const elQuery = document.getElementById('query')
		this.props.onFilterLocations(elQuery.value)
	}

	render() {
		return (
			<div className='filter'>
				<h3>Beaverton Town Center</h3>
				<p>Beaverton, Oregon</p>
				<input
					id='query'
					type='text'
					placeholder='Search...'
					onChange={ () => this.getQuery() }
				/>
			</div>
		)
	}
}

export default FilterBar