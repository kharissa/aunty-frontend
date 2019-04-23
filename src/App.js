import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import Login from './pages/Login.js'
import Chat from './pages/Chat.js'
import Sos from './containers/Sos.js'
import Map from './pages/Map.js'
import Call from './pages/Call.js'
import Setting from './pages/Setting.js'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPhoneSlash, faPhone, faVideo, faPhoneVolume, faMapMarkedAlt, faSlidersH, faBell } from '@fortawesome/free-solid-svg-icons';
import { CameraToasts } from './pages/Camera.js';
import './App.css';
import CustomRoute from './CustomRoute.js';

library.add(faPhoneSlash, faPhone, faVideo, faPhoneVolume, faMapMarkedAlt, faSlidersH, faBell);

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: 3.136053,
      lng: 101.6308768,
    }
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
      <>
        <ToastProvider>
          <div align="center">
            <CustomRoute noNav exact path="/login" component={Login} />
            <CustomRoute noNav exact path="/call" component={Call} />
            <CustomRoute exact path="/" component={Chat} />
            <CustomRoute exact path="/sos" component={Sos} />
            <CustomRoute exact path="/setting" component={Setting} />
            <CustomRoute
              exact
              path="/map"
              component={props => (
                <Map {...props} lat={this.state.lat} lng={this.state.lng} />
              )}
            />
            <CustomRoute exact path="/camera" component={CameraToasts} />
          </div>
        </ToastProvider>
      </>
    );
  }
}

export default App;