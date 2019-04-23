import React from 'react';
import axios from 'axios';

export default class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start_time: ''
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        const OneSignal = window.OneSignal || [];
        // compare start time to current time
        const current_time = Date.now()
        const countdown = current_time - this.state.start_time

        //get itinerary details
        axios({
            method: 'GET',
            url: 'http://localhost:5000/api/v1/pins/itinerary/',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                this.setState({
                    start_time: response.data.start_time
                })
                console.log('response: ' + response)
                // start countdown
                setTimeout(checkin_one, countdown)
            })

        //send tags to one signal to trigger first check in
        checkin_one = () => {
            OneSignal.push(function () {
                OneSignal.sendTags({
                    checkin: 1,
                });
                OneSignal.on('notificationDisplay', function (event) {
                    setTimeout(sos_trigger, 10000)
                    if ('popoverAllowClick') {
                        //if user checks in, redirect to home
                        console.log('popoverAllowClick')
                    } else {
                        console.log('trigger sos')
                    }
                });
            });
        }
    }
}