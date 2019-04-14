import React from 'react'
import { Button, Row, Col, Label, ModalBody, ModalFooter } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import axios from 'axios'

export default class Login extends React.Component{
    state = {
        email: '',
        password: '',
        variant: '',
        showAlert: false,
    };

    handleInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        axios({
            // Send POST request with registration information
            // In production build, remove localhost 
            method: 'POST',
            url: 'http://localhost:5000/api/v1/sessions/',
            data: {
                email: this.state.email,
                password: this.state.password
            }
        })
        .then(response => {
            console.log(response)
            // On success, display success message, 

            // Add JWT, userId and username to local storage
            localStorage.setItem('token', response.data['auth_token']);
            localStorage.setItem('userId', response.data.user['id']);
            localStorage.setItem('username', response.data.user['username']);
            localStorage.setItem('userPhoto', response.data.user['profile_picture']);
            this.setState({
                showAlert: true,
                variant: 'success',
                message: 'You have successfully logged in. Welcome back!'
            });
        })
        .catch(error => {
            // On failure, display failed message and keep Register modal open
            console.log(error);
            const message = error.response.data.message;
            this.setState({
                showAlert: true,
                variant: 'danger',
                message: 'There was an error with your login:\n' + message
            })
        })
        this.props.toggle();
    }

    render() {
        return(
            <>
            <ModalBody>
                <AvForm onValidSubmit={this.handleSubmit} id="login">
                    <Row>
                        <Col>
                            <AvGroup>
                                <Label>Email</Label>
                                <AvInput name="email" type="email" placeholder="Email Address" value={this.state.email} onChange={this.handleInput} id="email" required />
                                <AvFeedback>
                                    Please provide a valid email address.
                                </AvFeedback>
                            </AvGroup>
                        </Col>
                        <Col>
                            <AvGroup>
                                <Label>Password</Label>
                                <AvInput name="password" type="password" placeholder="Password" value={this.state.password} id="password" onChange={this.handleInput} required />
                                <AvFeedback>
                                    Please provide a valid password.
                                </AvFeedback>
                            </AvGroup>
                        </Col>
                    </Row>
                </AvForm>
            </ModalBody>
            <ModalFooter>
                <Button form="login" color="primary" type="submit">Login</Button>
            </ModalFooter>
        </>
        )
    }
}