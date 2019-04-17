// import React from 'react';
// import Map from '../containers/Map'

// export default class Geolocation extends React.Component {
//     state = {
//         isGeolocationAvailable: '',
//         isGeolocationEnabled: '',
//         latitude: 0,
//         longitude: 0,
//     }
//     componentDidMount() {
//         this.setState({
//             isGeolocationAvailable: localStorage.getItem('isGeolocationAvailable'),
//             isGeolocationEnabled: localStorage.getItem('isGeolocationEnabled'),
//             latitude: localStorage.getItem('latitude'),
//             longitude: localStorage.getItem('longitude'),
//         })
//     }
//     render() {
//         if (!this.state.isGeolocationAvailable) {
//             return (
//             <div>Your browser does not support Geolocation</div>
//             )
//         }
//         else if (!this.state.isGeolocationEnabled){
//             return (
//             <div>Geolocation is not enabled</div>
//             )
//         }
//         else if (this.state.latitude)
//             return(
//                 <Map my_lat={this.state.latitude} my_lng={this.state.longitude} />
//             )
//         else {
//             return(
//                 <div>Getting the location data&hellip;</div>
//             )
//         }
//     }
// }


import React from 'react';
import { Marker, Popup } from 'react-leaflet';

export default class Geolocation extends React.Component {
    state = {
        isGeolocationAvailable: '',
        isGeolocationEnabled: '',
        latitude: 0,
        longitude: 0,
    }
    componentDidMount() {
        this.setState({
            isGeolocationAvailable: localStorage.getItem('isGeolocationAvailable'),
            isGeolocationEnabled: localStorage.getItem('isGeolocationEnabled'),
            latitude: localStorage.getItem('latitude'),
            longitude: localStorage.getItem('longitude'),
        })
    }
    render() {
        if (!this.state.isGeolocationAvailable) {
            return (
                <div>Your browser does not support Geolocation</div>
            )
        }
        else if (!this.state.isGeolocationEnabled) {
            return (
                <div>Geolocation is not enabled</div>
            )
        }
        else if (this.state.latitude){
            console.log(this.state.latitude)
            console.log(this.state.longitude);
            return (
                    <Marker position={[this.state.latitude, this.state.longitude]}>
                        <Popup>Geolocated Position</Popup>
                    </Marker>
            )
        }
        else {
            return (
                <div>Getting the location data&hellip;</div>
            )
        }
    }
}