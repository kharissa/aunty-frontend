import React from 'react';
import { renderToStaticMarkup } from "react-dom/server";
import { Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';

export default class Geolocation extends React.Component {
    state = {
        isGeolocationAvailable: '',
        isGeolocationEnabled: '',
        latitude: 0,
        longitude: 0,
        error: ''
    }

    componentDidMount() {
        this.setState({
            isGeolocationAvailable: localStorage.getItem('isGeolocationAvailable'),
            isGeolocationEnabled: localStorage.getItem('isGeolocationEnabled'),
            latitude: localStorage.getItem('latitude'),
            longitude: localStorage.getItem('longitude'),
        });
    }

    render() {
        const geolocIcon = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-circle" />) });

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
            // console.log(this.state.latitude)
            return (
                <Marker position={[this.state.latitude, this.state.longitude]} icon={geolocIcon}>
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