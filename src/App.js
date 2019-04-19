import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { geolocated } from 'react-geolocated';
import Home from './pages/Home.js'
import Chat from './pages/Chat.js'
import MapJ from './pages/MapJ.js'
import Sos from './pages/Sos.js'
import Geolocation from './pages/Geolocation'
import aunty from './images/aunty.jpg'

class App extends Component {
  render() {
    if (this.props.coords) {
      localStorage.setItem('latitude', this.props.coords.latitude)
      localStorage.setItem('longitude', this.props.coords.longitude)
      localStorage.setItem('isGeolocationAvailable', this.props.isGeolocationEnabled)
      localStorage.setItem('isGeolocationEnabled', this.props.isGeolocationEnabled)
    }

    return (
      <ToastProvider>
        <div align="center">
          <img src={aunty} alt="aunty" width="250px" /><br /><br />
          <Link to="/">Home</Link><br /><br />
          <Route exact path="/" component={Home} />
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/geolocation" component={Geolocation} />
          <Route exact path="/mapj" component={MapJ} />
          <Route exact path="/sos" component={Sos} />

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
