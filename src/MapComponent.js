/* global google */
import React from 'react'
import PropTypes from 'prop-types'

class MapComponent extends React.Component {

  static propTypes = {
    places: PropTypes.array.isRequired
  }

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

  componentWillMount() {
    // Start Google Maps API loading
    this.getGoogleMaps();
  }

  componentDidMount() {
    // Once the Google Maps API has finished loading, initialize the map
    this.getGoogleMaps().then((google) => {
      const portland = {lat: 45.519093, lng: -122.679489};
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: portland
      });

      let markers = []
      this.props.places.forEach(place => {
        const marker = new google.maps.Marker({
        position: {lat: place.lat, lng: place.lng},
        map: map,
        });
        markers.push(place.place)
      })
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