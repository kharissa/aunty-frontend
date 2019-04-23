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
    // notificationItinerary = () => {
    //     const token = localStorage.getItem('token')
    //     console.log('this funciton works')
    //     axios({
    //         method: 'GET',
    //         url: 'https://gokaikai.herokuapp.com/api/v1/pins/itinerary/',
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     })
    //         .then(response => {
    //             console.log('this is the response')
    //             console.log(response)
    //         })
    // }

}