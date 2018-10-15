import React from 'react'
import PropTypes from 'prop-types'

class PlacesList extends React.Component {
	static propTypes = {
		venues: PropTypes.array.isRequired 
	}

	state = {
		clickedVenue: null
	}
	// When a venue is clicked on list view, its background color will change.
	// The clicked venue on the map will display infowindow too.
	clickVenueList(target) {
		if (target !== this.state.clickedVenue) {
			if (this.state.clickedVenue !== null) {
				this.state.clickedVenue.style.background='white'
			}
			target.style.background='red'
			this.setState({ clickedVenue: target} )
		}
	}

	render() {
		return(
			<div className='placesList'>
				<ul onClick={(e) => this.clickVenueList(e.target)} >
					{this.props.venues.map(venue => <li key={ venue.id }>{ venue.name }</li>
					)}
				</ul>
			</div>
		)

	}	
}

export default PlacesList