import React from 'react';

class Geoloc extends React.Component {
    state = {
        latitude: "",
        longtitude: "",
        timestamp: "",
        user_id: "",
    }

    // Send POST request of current location to database 

    render() {
        return !this.props.isGeolocationAvailable
            ? <div>Your browser does not support Geolocation</div>
            : !this.props.isGeolocationEnabled
                ? <div>Geolocation is not enabled</div>
                : this.props.coords
                    ? <div>
                        <p>latitude: {this.props.coords.latitude}</p>
                        <p>longitude {this.props.coords.longitude}</p>
                    </div>
                    : <div>Getting the location data&hellip; </div>;
    }
}

export default Geoloc;