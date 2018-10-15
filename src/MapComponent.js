/* global google */
import React from 'react'
import PropTypes from 'prop-types'

class MapComponent extends React.Component {
  static propTypes = {
    venues: PropTypes.array.isRequired
  }
  // This function will get google map through API
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
      const portland = {lat: 45.554, lng: -122.836};
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: portland
      });

      let markers = [];
      let infoWindow =  new google.maps.InfoWindow
      // Adding markers on map according to data fetched from Foursquare
      this.props.venues.forEach(venue => {
        const marker = new google.maps.Marker({
        position: {lat: venue.location.lat, lng: venue.location.lng},
        map: map,
        });
        markers.push(marker);
        // When a marker is clicked, its infowindow will be open.
        // Only one infowindow would be displayed on map.
        marker.addListener('click', () => {
          if (infoWindow.marker !== marker) {
            infoWindow.marker = marker
            infoWindow.setContent(`<div style='text-align:left;'><p style='margin:0; padding-right: 5px'>Address: ${venue.location.address}</p>
                          <p style='margin:0;'>Category: ${venue.categories[0].name}</p></div>`)
            infoWindow.open(map, marker)
            // When the infowindow is closed by clicked, infowindow.marker is set to be null.
            // Then if the same marker is clicked consectively, it can be displayed agian.
            infoWindow.addListener('closeclick', () => {infoWindow.marker = null})
          }
console.log('infoWindow', infoWindow, infoWindow.marker)
        })                     
      })
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