import React, { Component } from 'react';
import './App.css';
import MapComponent from './MapComponent';
import HamburgerMenu from './HamburgerMenu';
import FilterBar from './FilterBar';
import PlacesList from './PlacesList';

class App extends Component {
  state = {
    // Locations will be showed on map and list
    venues: [],
    // The location is clicked
    currentVenue: ''
  }
  // Getting venues around Bethany plazza through Foursquare API
  // Filtering out data without address
  getVenues = () => {
    const foursquareApi = 'https://api.foursquare.com/v2/venues/search?ll=45.554,-122.836&client_id=KNHSATCIRLFKV1XG5AABYEOCD203O3PCQHN5TMOTPE4EPWOO&client_secret=VK3WAOLFWLVRSKVEXOYCM4XAGVVLXTHOPZM3YVFXNA3EQNOT&v=20181012'
    return(
      fetch(foursquareApi)
      .then(resp => resp.json())
      .then(data => data.response.venues.filter(venue => (venue.location.address && venue.categories.length>0)))
      .catch(err => console.log(err))
    )
  }
  // Got the clicked venue name when a venue on list is clicked 
  currentVenue(venue) {
    this.setState({currentVenue: venue})
  }

  componentWillMount() {
    this.getVenues()
    .then(result => {
      this.setState({ venues: result})
    })
  }

  render() {
    return (
      <div className="App">
        <div className='sideBar'>
          <FilterBar />
          <PlacesList venues={ this.state.venues } onCurrentVenue={ this.currentVenue.bind(this) } />
        </div>
        <div className='mapContainer'>
          <HamburgerMenu />
          <MapComponent venues={ this.state.venues } currentVenue={ this.state.currentVenue } />
        </div>
      </div>
    );
  }
}

export default App;
