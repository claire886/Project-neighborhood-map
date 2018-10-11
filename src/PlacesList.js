import React from 'react'

const PlacesList = (props) => {
	return(
		<div className='placesList'>
			<ul>
				{props.places.map(place => <li key={ place.place }>{ place.place }</li>
				)}
			</ul>
		</div>
	)
}

export default PlacesList