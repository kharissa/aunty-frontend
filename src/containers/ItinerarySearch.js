import React from 'react';
import GoogleMapsLoader from 'google-maps'

// Setting Google Maps library variables
GoogleMapsLoader.KEY = process.env.REACT_APP_GOOGLE_KEY;
GoogleMapsLoader.LIBRARIES = ['places'];
GoogleMapsLoader.LANGUAGE = 'en';

export default class ItinerarySearch extends React.Component {
    state = {
        error: false,
        name: '',
        address: '',
        loading: true
    };
    componentWillMount() {

        // Retrieving user's coords from local storage
        const userLat = parseFloat(localStorage.getItem('latitude'))
        const userLong = parseFloat(localStorage.getItem('longitude'))

        // Radius is set to 100 km / 60 miles around user's location
        const userLocation = {radius: 100000, center: {lat: userLat, lng: userLong}}

        // Request returns location name, coords, and address
        const request = {
            query: this.props.steps.itineraryLocation.value,
            fields: ['name', 'geometry', 'formatted_address'],
            locationBias: userLocation
        }
    
        GoogleMapsLoader.load((google) => {
            // Creating / attaching a node required to use API
            const map = new google.maps.Map(document.createElement('div'));
            const service = new google.maps.places.PlacesService(map);
            
            // Sending query text-based request to find place
            service.findPlaceFromQuery(request, (results, status) => {
                if (status === "OK") {
                    this.props.triggerNextStep({ trigger: '8' })
                    this.setState({
                        loading: false,
                        name: results[0]['name'],
                        address: results[0]['formatted_address']
                    })
                    // Must call functions to find lat/lng
                    const lat = results[0]['geometry']['location'].lat().toFixed(6)
                    const lng = results[0]['geometry']['location'].lng().toFixed(6)
                    localStorage.setItem('itineraryLatitude', lat)
                    localStorage.setItem('itineraryLongitude', lng)
                    localStorage.setItem('itineraryLocation', this.state.name);
                } else {
                    this.props.triggerNextStep({
                        trigger: '5'
                    })
                    this.setState({
                        error: true,
                        loading: false,
                    })
                }
            })
        });
    }

    render() {
        const { name, address, error, loading } = this.state;
        return (
            <div> {
                loading 
                ? <p>Searching my phonebook...</p>
                : error 
                    ? <p>
                        I don't know where that is! Please try again.
                    </p>
                    : <div id="result">
                        <p>Is it this one ah?</p>
                        <p><b>{ name }</b></p>
                        <p>{ address }</p>
                </div> }
            </div>
        );
    }
}