import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { geolocated } from 'react-geolocated';
import Home from './pages/Home.js'
import Chat from './pages/Chat.js'
import MapJ from './pages/MapJ.js'
import Sos from './pages/Sos.js'
import Call from './pages/Call.js'
import Geolocation from './pages/Geolocation'
import Setting from './pages/Setting.js'
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

          <Route exact path="/sos" component={Sos} />

          <Route exact path="/setting" component={Setting} />
          <Route exact path="/map" component={props => <Geolocation {...props} lat={lat} lng={lng} />} />

          <Route exact path="/call" component={Call} />

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
