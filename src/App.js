import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import Home from './pages/Home.js'
import Chat from './pages/Chat.js'
import Map from './pages/Map.js'
import Call from './pages/Call.js'
import Setting from './pages/Setting.js'
import Navigation from './containers/Navigation.js'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPhoneSlash, faPhone, faVideo } from '@fortawesome/free-solid-svg-icons';
import CameraCall, { CameraToasts } from './pages/Camera.js';
// import axios from 'axios';
// import Notification from './containers/Notification';
import './App.css';
library.add(faPhoneSlash, faPhone, faVideo);


class App extends Component {
  // notificationItinerary = () => {
  //   const token = localStorage.getItem('token')
  //   console.log('this funciton works')
  //   axios({
  //     method: 'GET',
  //     url: 'https://gokaikai.herokuapp.com/api/v1/pins/itinerary/',
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   })
  //     .then(response => {
  //       console.log('this is the response')
  //       console.log(response)
  //     })
  // }

  // componentDidMount() {
  //   this.notificationItinerary();
  // }

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
          <Route exact path="/setting" component={Setting} />
          <Route exact path="/map" component={props => <Map {...props} lat={lat} lng={lng} />} />
          <Route exact path="/call" component={Call} />
          <Route exact path="/camera" component={CameraToasts} />

          {/* update SOS path  */}
          <Route exact path="/sos" component={Home} />
        </div>
      </ToastProvider>
    )
  }
}

export default App;