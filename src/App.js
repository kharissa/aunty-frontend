import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Home from './pages/Home.js'
import Chat from './pages/Chat.js'
import Geolocation from './pages/Show_Geoloc.js'
import MapJ from './pages/MapJ.js'
import aunty from './images/aunty.jpg'
import { ToastProvider } from 'react-toast-notifications';

class App extends Component {
  state = {
  }

  render() {
    return (
      <ToastProvider>
        <div align="center">
          <img src={aunty} alt="aunty" width="250px" /><br /><br />
          <Link to="/">Home</Link><br /><br />
          <Route exact path="/" component={Home} />
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/mapy" component={Geolocation} />
          <Route exact path="/mapj" component={MapJ} />
        </div>
      </ToastProvider>
    )
  }
}

export default App;
