import React from 'react'
import PropTypes from 'prop-types'

class PlacesList extends React.Component {
	static propTypes = {
		venues: PropTypes.array.isRequired,
		onClickVenueList: PropTypes.func.isRequired
	}
	// When users use keyboard to select a list and press enter, a modal of address and category of that list will pop up
	venueInfo(target) {
		const venueName =  target.innerHTML
		const venueInfo = this.props.venues.filter((venue) => venue.name === venueName )

		const modalInfo = `<div>Address: ${venueInfo[0].location.address} </div>
						   <div>Category: ${venueInfo[0].categories[0].name}</div>
						   <button id='modalButton' style='display: block;'>Close</button>`
		const elModal = document.getElementById('modal')
		elModal.innerHTML = modalInfo
		elModal.style.display = 'block';
		const elButton = elModal.children[2]
		elButton.focus()
		elModal.addEventListener('keypress', (modal, list) => {this.focusToList(elModal, target)})
		elModal.addEventListener('click', (modal, list) => {this.focusToList(elModal, target)})
		elModal.addEventListener('focusout', (modal, list) => {this.focusToList(elModal, target)})
	}
	// Function for users use keyboard to make modal disappeared.
	focusToList(modal, list) {
		modal.style.display = 'none'
		list.focus()
	}

	render() {
		return(
			<div className='placesList' aria-label='stores list'>
				<ul onClick={(e) => this.props.onClickVenueList(e.target)} >
					{this.props.venues.map(venue => <li key={ venue.id }  tabIndex='0' onKeyPress={(e) => this.venueInfo(e.target)}>{ venue.name }</li>)}
				</ul>
				<div id='foursquare' aria-label='data resource credit'>
	    	    	<p><i>- Locations info. is from Foursquare -</i></p>
    	    	</div>
			</div>
		)

	}	
}

export default PlacesList