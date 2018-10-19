/* global google */ 
import React from 'react'
import PropTypes from 'prop-types'

class MapComponent extends React.Component {
  static propTypes = {
    venues: PropTypes.array.isRequired,
    clickedVenue: PropTypes.string.isRequired,
    searchTerm: PropTypes.string
  }

  // This function will get google map through API
  getGoogleMaps() {
    //Define the promise if there is it is not existed
    if (!this.googleMapsPromise) {
      this.googleMapsPromise = new Promise((resolve) => {
        // Add a global handler for when the API finishes loading
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
    const currentMarker = this.markers.filter(marker => marker.title === this.props.clickedVenue)
    const mkrIdx = this.markers.indexOf(currentMarker[0])
    window.google.maps.event.trigger(this.markers[mkrIdx], "click")

console.log('current venue & Marker', this.props.clcikedVenue, currentMarker, mkrIdx)
  }

  clearClickedList() {
    if (document.querySelector('.clicked')) {
      document.querySelector('.clicked').classList.remove('clicked')
    }
  }

  componentWillMount() {
    // Start Google Maps API loading
    this.getGoogleMaps();
  }

  componentDidMount() {
    // Once the Google Maps API has finished loading, initialize the map
    this.getGoogleMaps().then((google) => {
      const beaverton = {lat: 45.49, lng: -122.81};
      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: beaverton
      });

      let markers = []
      this.markers = markers
      let infoWindow =  new window.google.maps.InfoWindow()
      this.infoWindow = infoWindow
      // Adding markers on map according to data fetched from Foursquare
      this.props.venues.forEach(venue => {
        const marker = new window.google.maps.Marker({
        position: {lat: venue.location.lat, lng: venue.location.lng},
        map: map,
        id: venue.id,
        title: venue.name
        });
        this.markers.push(marker);
        // When a marker is clicked, a infowindow will be open.
        marker.addListener('click', () => {
          if (infoWindow.marker !== marker) {
            infoWindow.marker = marker
            infoWindow.setContent(`<div style='text-align:left;'>
                          <p stypel='padding-right: 5px; margin: 6px 0;'>${venue.name}</p>
                          <p style='margin:0;'>Address: ${venue.location.address}</p>
                          <p style='margin:0;'>Category: ${venue.categories[0].name}</p></div>`)
            marker.setAnimation(window.google.maps.Animation.BOUNCE)
            window.setTimeout(() => {marker.setAnimation(null);}, 500);
            infoWindow.open(map, marker)
            // When the infowindow is closed by clicked, infowindow.marker is set to be null.
            // Then if the same marker is clicked consectively, it can be displayed agian.
            infoWindow.addListener('closeclick', () => {infoWindow.marker = null
                                                        this.clearClickedList()
                                                        })
            // If clicked marker is not clicked venue on list, reset list
            if (document.querySelector('.clicked') && this.props.clickedVenue !== marker.title) {
              document.querySelector('.clicked').classList.remove('clicked')
            }
          }
        })
      })
      console.log('...........this.markers', this.markers)
    });
  }

  render() {
    // Setting markers showed or hidden according the searched result
    if(this.markers) {
      if (this.props.venues.length !== this.markers.length) {
        this.markers.forEach((marker, index) => {
          if (this.props.venues.every(venue => venue.id !== marker.id)) {
            this.markers[index].setVisible(false)
          } else {
            this.markers[index].setVisible(true)
          }
        })
      } else {
        this.markers.forEach(marker => marker.setVisible(true))
      }
    }
    // If a venue click happens, the infowindow will open.
    if (this.props.clickedVenue) {
      this.openInfowindow()
    }
    // Reset venue lists and infowindow when search bar is using.
    const activeElement = document.activeElement.tagName
console.log('active......', activeElement)
    if (activeElement === 'INPUT') {
      this.infoWindow.close()
      this.clearClickedList()
    }
    return (
      <div id='mapContent' >
        <div id="map" style={{lex: 1}}></div>
      </div>
    )
  }
}

export default MapComponent