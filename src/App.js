import React, { Component } from 'react';
import './App.css';
import MapComponent from './MapComponent';
import HamburgerMenu from './HamburgerMenu';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HamburgerMenu />

        <MapComponent 
          isMarkerShown={ true } 
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAwBnLKlsjBN7U-nxl6rF9NUCv1Mkf04Ow"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div id='Neighborhood-map' style={{ height: `600px`}} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default App;
