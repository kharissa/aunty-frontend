import React, { Component } from 'react';
import { Route} from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { geolocated } from 'react-geolocated';
import Login from './pages/Login.js'
import Chat from './pages/Chat.js'
import Call from './pages/Call.js'
import Settings from './pages/Settings.js'
import Geolocation from './pages/Geolocation'
import Navigation from './containers/Navigation.js'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPhoneSlash, faPhone, faVideo, faPhoneVolume, faMapMarkedAlt, faSlidersH, faBell } from '@fortawesome/free-solid-svg-icons';

library.add(faPhoneSlash, faPhone, faVideo, faPhoneVolume, faMapMarkedAlt, faSlidersH, faBell);

class App extends Component {
  state = {
    lat: 3.136053,
    lng: 101.6308768,
  }
  
  
  // loadNavigation (page) {
  //   if (page = '/') {
  //     return null;
  //   }
  //   return <Navigation/>
  // }
  
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
    // loadNavigation({window.location.pathname})
    return (
      // Denise: is there a reason why toastprovider wraps this isntead of <Router>
      <ToastProvider>
        <div align="center">
          <Route exact path="/" component={Login} />
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/map" component={props => <Geolocation {...props} lat={lat} lng={lng} />} />

          <Route exact path="/call" component={Call} />

          {/* SOS may no need a path, it may just be a button with a pop-up alert  */}
          <Route exact path="/sos" component={Login} />
          <Route exact path="/settings" component={Login} />
        </div>
        <Navigation/>
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
