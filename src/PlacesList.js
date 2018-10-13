import React from 'react'
import PropTypes from 'prop-types'

class PlacesList extends React.Component {
	static propTypes = {
		places: PropTypes.array.isRequired 
	}
	render() {
		return(
			<div className='placesList'>
				<ul>
					{this.props.places.map(place => <li key={ place.place }>{ place.place }</li>
					)}
				</ul>
			</div>
		)

	}	
}

export default PlacesList