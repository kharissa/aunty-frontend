import React from 'react'
import { Button, Row, Col, Label, ModalBody, ModalFooter } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import axios from 'axios'

export default class Login extends React.Component{
    state = {
        loginEmail: '',
        loginPassword: ''
    };

    handleInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        const { toastManager } = this.props;
        axios({
            // Send POST request with login information
            // In production build, remove localhost
            method: 'POST',
            url: 'https://gokaikai.herokuapp.com/api/v1/sessions/',
            data: {
                email: this.state.loginEmail,
                password: this.state.loginPassword
            }
        })
        .then(response => {
            if (response.data.status === "success") {
                // On success, display success toast
                toastManager.add('Welcome back! You are now logged in.', {
                    appearance: 'success',
                    autoDismiss: true,
                });

                // Save auth token and user details into local storage
                localStorage.setItem('token', response.data['auth_token']);
                localStorage.setItem('userId', response.data.user['id']);
                localStorage.setItem('firstName', response.data.user['first_name']);
                localStorage.setItem('lastName', response.data.user['last_name']);
                localStorage.setItem('email', response.data.user['email']);
            } else {
                // On response but password validation failure, display error toast
                toastManager.add(`Uh oh! We were unable to match your email with the password provided.`, {
                    appearance: 'error',
                    autoDismiss: true,
                });
            }
            // Close Login modal
            this.props.toggle();
        })
        .catch(error => {
            // On failed API call, display error toast and keep Login modal open
            console.log(error);
            const message = error.data.message;
            toastManager.add(`Something went wrong: "${message}"`, {
                appearance: 'error',
            });
        })
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
                                <AvInput name="loginEmail" type="email" placeholder="Email Address" value={this.state.loginEmail} onChange={this.handleInput} id="loginEmail" required />
                                <AvFeedback>
                                    Please provide a valid email address.
                                </AvFeedback>
                            </AvGroup>
                        </Col>
                        <Col>
                            <AvGroup>
                                <Label>Password</Label>
                                <AvInput name="loginPassword" type="password" placeholder="Password" value={this.state.loginPassword} id="loginPassword" onChange={this.handleInput}autoComplete="off"  required />
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