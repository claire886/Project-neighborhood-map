import React from 'react'

class FilterBar extends React.Component {
	render() {
		return (
			<div className='filter'>
				<h3>Bethany Neighborhood</h3>
				<p>Portland, Oregon</p>
				<form>
					<input
						type='text'
						placeholder='Search...'
					/>
					<button id='filter'>Filter</button>
				</form>
			</div>
		)
	}
}

export default FilterBar