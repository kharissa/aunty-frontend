import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { geolocated } from 'react-geolocated';

import Geoloc from '../containers/Geoloc'

export default class Geolocation extends React.Component {
    render() {
        return (
            <div>
                <Geoloc {...this.props} />
            </div>
        );
    }
}

const Main = geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Geoloc);

ReactDOM.render(<Main />, document.getElementById('root'));
