import React from 'react';
import { geolocated } from 'react-geolocated';

import Map from './Map'
import Sos from './SOS'

class Geoloc extends React.Component {
    render() {
        return !this.props.isGeolocationAvailable
            ? <div>Your browser does not support Geolocation</div>
            : !this.props.isGeolocationEnabled
                ? <div>Geolocation is not enabled</div>
                : this.props.coords
                    ? <div>
                        <Map my_lat={this.props.coords.latitude} my_lng={this.props.coords.longitude} />
                        <Sos my_lat={this.props.coords.latitude} my_lng={this.props.coords.longitude} />
                    </div>
                    : <div>Getting the location data&hellip; </div>;
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Geoloc);


