import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { geolocated } from 'react-geolocated';
import Home from './pages/Home.js';
import Chat from './pages/Chat.js';
import Geolocation from './pages/Geolocation';
import MapJ from './pages/MapJ.js';
import aunty from './images/aunty.jpg';
import Camera from './pages/Camera.js';
import axios from 'axios';
// import Notification from './containers/Notification';
import './App.css';

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
          <Route exact path="/camera" component={Camera} />
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
