/* global google */  // I don't understand this is. After googling, I added this line and the bug disappeared. 
import React from 'react'
import PropTypes from 'prop-types'

class MapComponent extends React.Component {
  static propTypes = {
    venues: PropTypes.array.isRequired,
    currentVenue: PropTypes.string.isRequired
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
  // When a venue on list is clicked, the matching marker on map would open the infowindow. 
  openInfowindow() {
    const currentMarker = this.markers.filter(marker => marker.title === this.props.currentVenue)
    const mkrIdx = this.markers.indexOf(currentMarker[0])
    window.google.maps.event.trigger(this.markers[mkrIdx], "click")

console.log('current venue & Marker', this.props.currentVenue, currentMarker, mkrIdx)
  }

  componentWillMount() {
    // Start Google Maps API loading
    this.getGoogleMaps();
  }

  componentDidMount() {
    // Once the Google Maps API has finished loading, initialize the map
    this.getGoogleMaps().then((google) => {
      const bethany = {lat: 45.554, lng: -122.836};
      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: bethany
      });

      let markers = []
      this.markers = markers
      let infoWindow =  new google.maps.InfoWindow()
      // Adding markers on map according to data fetched from Foursquare
      this.props.venues.forEach(venue => {
        const marker = new google.maps.Marker({
        position: {lat: venue.location.lat, lng: venue.location.lng},
        map: map,
        id: venue.id,
        animation: window.google.maps.Animation.DROP,
        title: venue.name
        });
        this.markers.push(marker);
        // When a marker is clicked, its infowindow will be open.
        // Only one infowindow would be displayed on map.
        marker.addListener('click', () => {
          if (infoWindow.marker !== marker) {
            infoWindow.marker = marker
            infoWindow.setContent(`<div style='text-align:left;'>
                          <p stypel='padding-right: 5px;'>${venue.name}</p>
                          <p style='margin:0;'>Address: ${venue.location.address}</p>
                          <p style='margin:0;'>Category: ${venue.categories[0].name}</p></div>`)
            marker.setAnimation(window.google.maps.Animation.BOUNCE)
            window.setTimeout(() => {marker.setAnimation(null);}, 500);
            infoWindow.open(map, marker)
            // When the infowindow is closed by clicked, infowindow.marker is set to be null.
            // Then if the same marker is clicked consectively, it can be displayed agian.
            infoWindow.addListener('closeclick', () => {infoWindow.marker = null})
          }
        })
      })
console.log('markers', this.markers)
    });
  }

  render() {
    if (this.props.currentVenue) {
console.log('..........')      
      this.openInfowindow()
    }
    return (
      <div id='mapContent' >
        <div id="map" style={{lex: 1}}></div>
      </div>
    )
  }
}

export default MapComponent