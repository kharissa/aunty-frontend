import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { geolocated } from 'react-geolocated';
import Home from './pages/Home.js'
import Chat from './pages/Chat.js'
import Map from './pages/Map.js'
import aunty from './images/aunty.jpg'
import './App.css';


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
          <Route exact path="/map" component={Map} />
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
