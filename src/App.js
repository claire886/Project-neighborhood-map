import React, { Component } from 'react';
import './App.css';
import MapComponent from './MapComponent';
import HamburgerMenu from './HamburgerMenu';
import FilterBar from './FilterBar';
import PlacesList from './PlacesList';

class App extends Component {
  state = {
    allVenues: [],
    searchTerm: '',
    filteredVenues: [],
    clickedVenue: ''
  }
  // Getting venues around Beaverton town center, Oregon through Foursquare API
  // Filtering out data without address
  getVenues = () => {
    const foursquareApi = 'https://api.foursquare.com/v2/venues/search?ll=45.488,-122.801&client_id=KNHSATCIRLFKV1XG5AABYEOCD203O3PCQHN5TMOTPE4EPWOO&client_secret=VK3WAOLFWLVRSKVEXOYCM4XAGVVLXTHOPZM3YVFXNA3EQNOT&v=20181012'
    return(
      fetch(foursquareApi)
      .then(resp => resp.json())
      .then(data => data.response.venues.filter(venue => (venue.location.address && venue.categories.length>0)))
      .catch(err => console.log(err))
    )
  }
  // When a venue is clicked on list, its background color will change.
  clickVenueList(target) {
    const preTarget = document.querySelector('.clicked')
    if (preTarget) {
      preTarget.classList.remove('clicked')
    }
    if (target !== preTarget) {
      target.className='clicked'
      this.setState({ clickedVenue: target.innerHTML } )
    }
  }
  // Filter locations
  filterLocations(query) {
    const result = this.state.allVenues.filter(venue => (
                                    venue.name.toLowerCase().includes(query) || venue.categories[0].name.toLowerCase().includes(query)))
    this.setState({ searchTerm: query,
                    filteredVenues: result})
  }

  componentWillMount() {
    this.getVenues()
    .then(result => {
      this.setState({ allVenues: result})
    })
  }

  render() {
    let venues = this.state.searchTerm ? this.state.filteredVenues : this.state.allVenues
    return (
      <div className="App">
        <header>
          <HamburgerMenu />
          <h2 tabIndex='0'>Beaverton Town Center, Oregon</h2>
        </header>
        <div className='sideBar' aria-label='side bar'>
          <FilterBar onFilterLocations = { this.filterLocations.bind(this) } />
          <PlacesList venues={ venues } onClickVenueList={ this.clickVenueList.bind(this) } />
        </div>
        <div className='mapContainer'>
          <MapComponent venues={ venues } allVenues={ this.state.allVenues } searchTerm={ this.state.searchTerm } clickedVenue={ this.state.clickedVenue } />
          </div>
      </div>
    );
  }
}

export default App;
