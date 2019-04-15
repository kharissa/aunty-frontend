import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { geolocated } from 'react-geolocated';

import Geoloc from './Geoloc'

class Geolocation extends React.Component {
    render() {
        return (
            <div>
                <Geoloc {...this.props} />
            </div>
        );
    }
}

const MainWithGeoloc = geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Geolocation);

ReactDOM.render(<MainWithGeoloc />, document.getElementById('root'));

export default Geolocation;
