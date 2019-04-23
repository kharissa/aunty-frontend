import React from 'react';
import PhoneCall from '../components/phonecall';
import { Container, Row, Col, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);
 
export default class OnCall extends React.Component {
    state = {
        status: '',
    }

  render() {
    return (
        <Container className="p-4 call-screen" fluid>
            <PhoneCall />
            <Row className="p-2">
                <Col>
                <h4>On Call</h4>
                <br /> { moment.duration(this.state.callTime, "seconds").format("h:mm:ss", {trim: false}) }
                </Col>
            </Row>
            <Row className="p-2">
                <Col md={4}>
                    <div className="aunty-call">
                    </div>
                </Col>
            </Row>
            <Row className="p-3">
                <Col>
                    <h1>Aunty</h1>
                </Col>
            </Row>
            <Row className="p-3 call-action">
                <Col>
                    <Button color="secondary" className="btn-lg" onClick={this.handleCallEnd}><FontAwesomeIcon icon="video"/>
                    </Button>
                </Col>
                <Col>
                    <Button color="danger" className="btn-lg" onClick={this.handleCallEnd}><FontAwesomeIcon icon="phone-slash"/>
                    </Button>
                </Col>
            </Row>
        </Container>
    ); 
  }
}