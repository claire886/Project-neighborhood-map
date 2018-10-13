/* global google */
import React from 'react'
import PropTypes from 'prop-types'

class MapComponent extends React.Component {

  getGoogleMaps() {
    //Define the promise if there is it is not existed
    if (!this.googleMapsPromise) {
      this.googleMapsPromise = new Promise((resolve) => {
        // Add a global handler for when the API finishes loading
        // I don't understand below(it is from overstack)
        window.resolveGoogleMapsPromise = () => {
          // Resolve the promise
          resolve(google);
          // Tidy up
          delete window.resolveGoogleMapsPromise;
        };

        // Load the Google Maps API
        const script = document.createElement("script");
        const API = 'AIzaSyAwBnLKlsjBN7U-nxl6rF9NUCv1Mkf04Ow';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`;
        script.async = true;
        document.body.appendChild(script);
      });
    }
    // Return a promise for the Google Maps API
    return this.googleMapsPromise;
  }

// Getting venues around International Rose Test Garden by Foursquare API
  // Filtering out data without address
  getVenues = () => {
    const foursquareApi = 'https://api.foursquare.com/v2/venues/search?ll=45.52,-122.71&client_id=KNHSATCIRLFKV1XG5AABYEOCD203O3PCQHN5TMOTPE4EPWOO&client_secret=VK3WAOLFWLVRSKVEXOYCM4XAGVVLXTHOPZM3YVFXNA3EQNOT&v=20181012'
    return(
      fetch(foursquareApi)
      .then(resp => resp.json())
      .then(data => data.response.venues.filter(venue => venue.location.address))
      .catch(err => console.log(err))
    )
  }
 
  componentWillMount() {
    // Start Google Maps API loading
    this.getGoogleMaps();
    this.getVenues()
    .then(d => console.log(d))

  }

  componentDidMount() {
    // Once the Google Maps API has finished loading, initialize the map
    this.getGoogleMaps().then((google) => {
      const portland = {lat: 45.52, lng: -122.71};
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: portland
      });

      let venues = []
      let markers = []

      this.getVenues()
      .then(data => {
        venues = data
        venues.forEach(venue => {
          const marker = new google.maps.Marker({
          position: {lat: venue.location.lat, lng: venue.location.lng},
          map: map,
          });
          markers.push(venue)        
        })
      })
console.log('venues', venues)
console.log('markers', markers)
    });
  }

  render() {
    return (
      <div id='mapContent' >
        <div id="map" style={{lex: 1}}></div>
      </div>
    )
  }
}

export default MapComponent