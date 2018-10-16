import React from 'react'
import PropTypes from 'prop-types'

class PlacesList extends React.Component {
	static propTypes = {
		venues: PropTypes.array.isRequired,
		onCurrentVenue: PropTypes.func.isRequired
	}

	state = {
		clickedVenue: ''
	}
	// When a venue is clicked on list view, its background color will change.
	// The clicked venue on the map will display infowindow too.
	clickVenueList(target) {
		if (target !== this.state.clickedVenue) {
			if (this.state.clickedVenue) {
			//	this.state.clickedVenue.style.background='white'
			}
			target.style.background='red'
			this.setState({ clickedVenue: target} )
			this.props.onCurrentVenue(target.innerHTML)
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