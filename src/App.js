import React, { Component } from 'react';
import './App.css';
import Chat from './containers/Chat'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class App extends Component {
  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Chat />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
