import React from 'react'
import PropTypes from 'prop-types'

class PlacesList extends React.Component {
	static propTypes = {
		venues: PropTypes.array.isRequired,
		onClickVenueList: PropTypes.func.isRequired
	}

	test() {
		console.log('======keypress on list item')
	}

	render() {
		return(
			<div className='placesList' aria-label='stores list'>
				<ul onClick={(e) => this.props.onClickVenueList(e.target)} >
					{this.props.venues.map(venue => <li key={ venue.id }  tabIndex='0' onKeyPress={this.test}>{ venue.name }</li>)}
				</ul>
				<div id='foursquare' aria-label='data resource credit'>
	    	    	<p><i>- Locations info. is from Foursquare -</i></p>
    	    	</div>
			</div>
		)

	}	
}

export default PlacesList