import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { geolocated } from 'react-geolocated';

import Geoloc from '../containers/Geoloc'

class Geolocation extends React.Component {
    render() {
        return (
            <div>
                <Geoloc />
            </div>
        );
    }
}

export default Geolocation;
