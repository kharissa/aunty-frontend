import React from 'react';
import { Button, Row, Col, Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import Ringtone from '../components/ringtone'
import PhoneCall from '../components/phonecall';
import { Redirect } from 'react-router-dom';

export default class Call extends React.Component {
    state = {
        incomingCall: true,
        onCall: false,
        callTime: 0,
        onVideo: false,
        endCall: false
    }

    handleToggle = () => {
        this.setState(prevState => ({
            incomingCall: !prevState.incomingCall
        }));
    }

    handleCallAccept = () => {
        this.setState({
            onCall: true,
            incomingCall: false,
            callTime: 0
        })
        this.handleTime()
    }

    handleCallEnd = () => {
        this.setState({
            onCall: false,
            incomingCall: false,
            callTime: 0,
            endCall: true
        }) 
        clearInterval(this.state.timer)
    }

    handleVideo = () => {
        this.setState({
            onVideo: true,
            onCall: false,
            incomingCall: false,
            callTime: 0
        }) 
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

    handleRedirect() {
        if (this.state.onVideo) {
            return <Redirect to="/camera" />
        }
        else if (this.state.endCall) {
            return <Redirect to="/" />
        }
    }

    render() {
        const { incomingCall, onCall, onVideo } = this.state;
        momentDurationFormatSetup(moment);
        
        return (
            <Container className="mx-0 px-0">
            { incomingCall ?
                <Container className="p-4 call-screen" fluid>
                    <Ringtone />
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
            : onCall ? 
                <Container className="p-4 call-screen" fluid>
                    <PhoneCall />
                    <Row className="p-2">
                        <Col>
                        <h4>On Call</h4>
                        <br /> { moment.duration(this.state.callTime, "seconds").format("h:mm:ss", {trim: false}) }
                        </Col>
                    </Row>
                    <Row className="p-2">
                        <Col md="4">
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
                            <Button color="secondary" className="btn-lg" onClick={this.handleVideo}><FontAwesomeIcon icon="video"/>
                            </Button>
                        </Col>
                        <Col>
                            <Button color="danger" className="btn-lg" onClick={this.handleCallEnd}><FontAwesomeIcon icon="phone-slash"/>
                            </Button>
                        </Col>
                    </Row>
                </Container>
                :
                <Container>
                    <Row>
                        <Col>
                        </Col>
                    </Row>
                </Container>
            }
            { this.handleRedirect() }
            </Container>
        )
    }
}
