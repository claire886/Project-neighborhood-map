import React from 'react'
import PropTypes from 'prop-types'

class PlacesList extends React.Component {
	static propTypes = {
		venues: PropTypes.array.isRequired 
	}
	render() {
		return(
			<div className='placesList'>
				<ul>
					{this.props.venues.map(venue => <li key={ venue.id }>{ venue.name }</li>
					)}
				</ul>
			</div>
		)

	}	
}

export default PlacesList