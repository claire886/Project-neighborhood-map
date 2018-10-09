import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MapComponent = withScriptjs(withGoogleMap((props) => {

	return (
	  <GoogleMap
	    defaultZoom={8}
	    defaultCenter={{ lat: -34.397, lng: 150.644 }}
	  >
	    { [<Marker key='1' position={{ lat: -34.397, lng: 150.644 }} />,
	    	<Marker key='2' position={{ lat: -34.297, lng: 150.544 }} />
	    	]
	    	}

	  </GoogleMap>
	)
}))

export default MapComponent