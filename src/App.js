import React, { Component } from 'react';
import './App.css';
import Chat from './containers/Chat'
import { Container, Row, Col } from 'reactstrap'

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
