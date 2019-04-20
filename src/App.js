import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { geolocated } from 'react-geolocated';
import Home from './pages/Home.js'
import Chat from './pages/Chat.js'
import Call from './pages/Call.js'
import Geolocation from './pages/Geolocation'
import MapJ from './pages/MapJ.js'
import Navigation from './containers/Navigation.js'
import aunty from './images/aunty.jpg'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPhoneSlash, faPhone, faVideo } from '@fortawesome/free-solid-svg-icons';

library.add(faPhoneSlash, faPhone, faVideo);

class App extends Component {
  state = {
    lat: 3.136053,
    lng: 101.6308768,
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords
      this.setState({
        lat: latitude,
        lng: longitude
      });
      localStorage.setItem('latitude', latitude.toFixed(6));
      localStorage.setItem('longitude', longitude.toFixed(6));
    })
  }

  render() {
    const { lat, lng } = this.state

    return (
      <ToastProvider>
        <Navigation />
        <div align="center">
          <Route exact path="/" component={Home} />
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/map" component={props => <MapJ {...props} lat={lat} lng={lng} />} />

          <Route exact path="/call" component={Call} />

          {/* update these two  */}
          <Route exact path="/sos" component={Home} />
          <Route exact path="/itinerary" component={Home} />
        </div>
      </ToastProvider>
    )
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 6000,
})(App);
