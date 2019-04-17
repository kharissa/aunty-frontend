import React from 'react';
import axios from 'axios';

export default class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start_time: '',
            latitude: '',
            longitude: '',
            resolved: '',
        }
    }

    // match userid from local storage
    // get start_time, longitude, latitude, resolved from itinerary
    // function: at start_time, check longitude and latitude for match
    // if match, set resolved to true
    // if no match, sendTag for timeout segment
    notificationItinerary = () => {
        axios({
            method: 'GET',
            url: 'https://gokaikai.herokuapp.com/api/v1/pins/initerary/',
            auth_header: localStorage.getItem('token'),
        })
            .then(response => {
                console.log(response)
            })
    }

    // componentDidMount() {
    //     axios({
    //         method: 'GET',
    //         url: 'https://gokaikai.herokuapp.com/api/v1/pins/initerary/',
    //         auth_header: localStorage.getItem('token'),
    //     })
    //         .then(response => {
    //             console.log(response)
    //         })
    // }
}

    // render() {
    //     return (
    //         <button onClick={this.notificationItinerary}></button>
    //     )
    // }
        // const OneSignal = window.OneSignal || [];
        // OneSignal.push(function () {
        //     OneSignal.init({
        //         appId: "d76693f6-d95e-4cca-93c1-b875207242e9",
        //         autoResubscribe: true,
        //         notifyButton: {
        //             enable: true,
        //         },
        //     });
        //     OneSignal.showNativePrompt();
        //     OneSignal.sendTags({
        //         latitude: localStorage.getItem('latitude'),
        //         longitude: localStorage.getItem('longitude')
        //     });
        // }




    // handleSubmit = (event) => {
    //     const { toastManager } = this.props;
    //     axios({
    //         // Send POST request with login information
    //         method: 'POST',
    //         url: 'https://gokaikai.herokuapp.com/api/v1/sessions/',
    //         data: {
    //             email: this.state.loginEmail,
    //             password: this.state.loginPassword
    //         }
    //     })
    //     .then(response => {
    //         if (response.data.status === "success") {
    //             // On success, display success toast
    //             toastManager.add('Welcome back! You are now logged in.', {
    //                 appearance: 'success',
    //                 autoDismiss: true,
    //             });

    //             // Save auth token and user details into local storage
    //             localStorage.setItem('token', response.data['auth_token']);
    //             localStorage.setItem('userId', response.data.user['id']);
    //             localStorage.setItem('firstName', response.data.user['first_name']);
    //             localStorage.setItem('lastName', response.data.user['last_name']);
    //             localStorage.setItem('email', response.data.user['email']);
    //         } else {
    //             // On response but password validation failure, display error toast
    //             toastManager.add(`Uh oh! We were unable to match your email with the password provided.`, {
    //                 appearance: 'error',
    //                 autoDismiss: true,
    //             });
    //         }
    //         // Close Login modal
    //         this.props.toggle();
    //     })
    //     .catch(error => {
    //         // On failed API call, display error toast and keep Login modal open
    //         console.log(error);
    //         const message = error.data.message;
    //         toastManager.add(`Something went wrong: "${message}"`, {
    //             appearance: 'error',
    //         });
    //     })
    // }