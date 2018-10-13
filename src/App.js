import React, { Component } from 'react';
import './App.css';
import MapComponent from './MapComponent';
import HamburgerMenu from './HamburgerMenu';
import FilterBar from './FilterBar';
import PlacesList from './PlacesList';

class App extends Component {
  // Getting venues around International Rose Test Garden by Foursquare API
  // Filtering out data without address
  getVenues = () => {
    const foursquareApi = 'https://api.foursquare.com/v2/venues/search?ll=45.52,-122.71&client_id=KNHSATCIRLFKV1XG5AABYEOCD203O3PCQHN5TMOTPE4EPWOO&client_secret=VK3WAOLFWLVRSKVEXOYCM4XAGVVLXTHOPZM3YVFXNA3EQNOT&v=20181012'

    fetch(foursquareApi)
    .then(resp => resp.json())
    .then(data => data.response.venues.filter(venue => venue.location.address))
    .then(d => console.log(d))
    .catch(err => console.log(err))
  }

  componentWillMount() {
    this.getVenues()
  }

  render() {
    const places = [
      {place: 'Oregon Zoo', lat: 45.509625, lng: -122.712601, tag: ['zoo', 'kid', 'family']}, 
      {place: 'Pioneer Courthouse Square', lat: 45.519093, lng: -122.679489, tag: ['shopping', 'restaurant', 'food']},
      {place: 'International Rose Test Garden', lat: 45.520430, lng: -122.706770, tag: ['park', 'garden']},
      {place: 'Portland Saturday Market', lat: 45.523100, lng: -122.670320, tag: ['shopping', 'food', 'family']},
      {place: "Powell's City of Books", lat: 45.523200, lng: -122.681420, tag: ['shopping', 'family', 'landmark']}
    ]

    return (
      <div className="App">
        <div className='sideBar'>
          <FilterBar />
          <PlacesList places={ places} />
        </div>
        <div className='mapContainer'>
          <HamburgerMenu />
          <MapComponent places={ places } />
        </div>
      </div>
    );
  }
}

export default App;
