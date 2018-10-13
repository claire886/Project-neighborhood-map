import React, { Component } from 'react';
import './App.css';
import MapComponent from './MapComponent';
import HamburgerMenu from './HamburgerMenu';
import FilterBar from './FilterBar';
import PlacesList from './PlacesList';

class App extends Component {
  state = {
    venues: []
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
    this.getVenues()
    .then(result => {
      this.setState({ venues: result})
    })
  }

  render() {
console.log('venues', this.state.venues)
    return (
      <div className="App">
        <div className='sideBar'>
          <FilterBar />
          <PlacesList venues={ this.state.venues } />
        </div>
        <div className='mapContainer'>
          <HamburgerMenu />
          <MapComponent venues={ this.state.venues } />
        </div>
      </div>
    );
  }
}

export default App;
