// import React from 'react';
// import { ThemeProvider } from 'styled-components';
// import ChatBot from 'react-simple-chatbot';
// import { Container, Row, Col } from 'reactstrap';
// import axios from 'axios'
// import 'rc-time-picker/assets/index.css';
// import moment from 'moment';
// import TimePicker from 'rc-time-picker';
// import { Redirect } from 'react-router-dom'
// import GoogleMapsLoader from 'google-maps'


// export default class ItineraryConfirm extends React.Component {
//     state = {
//         location: '',
//         description: '',
//         time: ''
//     };

//     componentWillMount() {
//         const userId = localStorage.getItem('userId');
//         const location = localStorage.getItem('itineraryLocation');
//         const time = localStorage.getItem('itineraryTime');
//         const description = localStorage.getItem('itineraryDetails');
//         const latitude = localStorage.getItem('itineraryLatitude');
//         const longitude = localStorage.getItem('itineraryLongitude');

//         // Make axios POST request to create itinerary pin
//         axios({
//             method: 'POST',
//             url: 'https://gokaikai.herokuapp.com/api/v1/pins/itinerary/',
//             data: {
//                 pinName: location,
//                 userId: userId,
//                 longitude: parseFloat(latitude),
//                 latitude: parseFloat(longitude),
//                 startTime: time,
//                 description: description
//             }
//         })
//         .then(response => {
//             console.log(response.data);
//         })
//         .catch(error => {
//             console.log(error);
//         })
//         this.setState({
//             location: location,
//             description: description,
//             time: time
//         })
//   }
//   render() {
//     return (
//         <div>
//             <p>Ok so you are going to {this.state.location} {this.state.description} at {this.state.time}?</p>
//             <p>Aunty will check in then, lah!</p>
//         </div>
//     );
//   }
// }