import React from 'react';
import { Button, Row, Col, Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';


export default class Call extends React.Component {
    state = {
        show: false,
        onCall: false,
        callTime: '',
        currentTime: ''
    }
    handleToggle = () => {
        this.setState(prevState => ({
            show: !prevState.show
        }));
    }
    handleCallAccept = () => {
        this.setState({
            onCall: true,
            startTime: 0
        })
    }
    handleCallEnd = () => {
        this.setState({
            onCall: false,
            show: false,
            startTime: 0
        }) 
    }

    handleTime = () => {
        setInterval(() => {
            this.setState({
                startTime: this.state.startTime + 1
            })
        })
    }

    render() {
        const { show, onCall, callTime } = this.state;
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
                        <br />{ this.handleTime() }
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
                    <Row>
                        <Col className="end-call">
                            <Button color="danger" className="btn-lg float-right" onClick={this.handleCallEnd}><FontAwesomeIcon icon="phone-slash"/>
                            </Button>
                        </Col>
                    </Row>
                    </Container>
                    :
                    !show
                    ? 
                    <Row>
                        <Col>
                            <p>False</p>
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
                            <Button color="success" className="btn-lg" onClick={this.handleCallAccept}>Accept {' '} 
                            <FontAwesomeIcon icon="phone"/>
                            </Button>
                        </Col>
                        <Col>
                            <Button color="danger" className="btn-lg" onClick={this.handleCallEnd}>Decline {' '} <FontAwesomeIcon icon="phone-slash"/>
                            </Button>
                        </Col>
                    </Row>
                    </Container>
                }
            </Container>
        )
    }
}