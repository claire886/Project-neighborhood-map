import React from 'react'
import PropTypes from 'prop-types'

class PlacesList extends React.Component {
	static propTypes = {
		venues: PropTypes.array.isRequired,
		onClickVenueList: PropTypes.func.isRequired
	}

	render() {
		return(
			<div className='placesList'>
				<ul onClick={(e) => this.props.onClickVenueList(e.target)} >
					{this.props.venues.map(venue => <li key={ venue.id }>{ venue.name }</li>
					)}
				</ul>
		        <div id='foursquare'>
	    	     <p>Locations infomation are from Foursquare</p>
    	    	 </div>

			</div>
		)

	}	
}

export default PlacesList