import React from 'react';
import { Button, Row, Col, Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

export default class Call extends React.Component {
    state = {
        show: false,
        onCall: false,
        callTime: 0
    }
    handleToggle = () => {
        this.setState(prevState => ({
            show: !prevState.show
        }));
    }
    handleCallAccept = () => {
        this.setState({
            onCall: true,
            callTime: 0
        })
        this.handleTime()
    }
    handleCallEnd = () => {
        this.setState({
            onCall: false,
            show: false,
            callTime: 0
        }) 
        clearInterval(this.state.timer)
    }

    handleTime = () => {
        const timer = setInterval(() => {
            this.setState({
                callTime: this.state.callTime + 1
            })
        }, 1000)
        this.setState({
            timer: timer
        })
    }

    render() {
        const { show, onCall, callTime } = this.state;
        momentDurationFormatSetup(moment);
        return (
            <Container className="mx-0 px-0">
                <div className="py-2">
                    <Button color="primary" onClick={this.handleToggle}>Click here to initiate a call.</Button>
                </div>
                {   onCall ?
                    <Container className="p-4 call-screen" fluid>
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
                    :
                    !show
                    ? 
                    <Row>
                        <Col>
                        </Col>
                    </Row>
                    : 
                    <Container className="p-4 call-screen" fluid>
                    <Row className="p-2">
                        <Col>
                        <h4>Incoming Call</h4>
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
                            <Button color="success" className="btn-lg" onClick={this.handleCallAccept}> 
                            <FontAwesomeIcon icon="phone"/>
                            </Button>
                        </Col>
                        <Col>
                            <Button color="danger" className="btn-lg" onClick={this.handleCallEnd}><FontAwesomeIcon icon="phone-slash"/>
                            </Button>
                        </Col>
                    </Row>
                    </Container>
                }
            </Container>
        )
    }
}