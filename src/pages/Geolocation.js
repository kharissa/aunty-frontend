import React from 'react';
import Map from '../containers/Map'

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
        return (
            !this.state.isGeolocationAvailable
                ? <div>Your browser does not support Geolocation</div>
                : !this.state.isGeolocationEnabled
                    ? <div>Geolocation is not enabled</div>
                    : this.state.latitude
                        ? <Map my_lat={this.state.latitude} my_lng={this.state.longitude} />
                        : <div>Getting the location data&hellip;</div>
        )
    }
}