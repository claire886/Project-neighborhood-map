import React from 'react'

class MapComponent extends React.Component {
	getGoogleMap() {
		/* global google */
		if (!this.googleMapPromise) {
			this.googleMapPromise = new Promise((resolve) => {
				let google
				window.resolveGoogleMapsPromise = () => {
					resolve(google)
					delete window.resolveGoogleMapsPromise
				}
			const script = document.createElement('script')
			const API = 'AIzaSyAwBnLKlsjBN7U-nxl6rF9NUCv1Mkf04Ow'
			script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`
			script.async = true
			document.body.appendChild(script)
			})
		}
	return this.googleMapPromise		
	}

	componentWillMount() {
		this.getGoogleMap()
	}

	componentDidMount() {
		this.getGoogleMap().then((google) => {
      const uluru = {lat: -25.363, lng: 131.044};
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
      });
      const marker = new google.maps.Marker({
        position: uluru,
        map: map
      });
    });
	}

	render() {
		return (
			<div id='map'></div>
		)
	}
}

export default MapComponent