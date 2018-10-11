import React from 'react'

class FilterBar extends React.Component {
	render() {
		return (
			<div className='filter'>
				<h3>Northwest Portland</h3>
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