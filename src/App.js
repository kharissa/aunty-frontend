import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Home from './pages/Home.js'
import Chat from './pages/Chat.js'
import MapY from './pages/MapY.js'
import MapJ from './pages/MapJ.js'
import aunty from './images/aunty.jpg'

class App extends Component {
  state = {
  }

  render() {
    return (
      <div align="center">
        <img src={aunty} alt="aunty" width="250px" /><br /><br />
        <Link to="/">Home</Link><br /><br />
        <Route exact path="/" component={Home} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/mapy" component={MapY} />
        <Route exact path="/mapj" component={MapJ} />
      </div>
    )
  }
}

export default App;
