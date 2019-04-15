import React, { Component } from 'react';
import './App.css';
import Chat from './containers/Chat'
import Map from './containers/Map'
import Geolocation from './containers/Show_Geoloc'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class App extends Component {
  render() {
    return (
      <Container>
        <Map />
      </Container>
    );
  }
}

export default App;
