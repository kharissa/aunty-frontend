import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from 'leaflet';


export default class Pins extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pins: [
                { id: "1", lat: 3.124526, lng: 101.630016, name: "Test Marker 03", category: "Theft" },
                { id: "2", lat: 3.134526, lng: 101.650016, name: "Test Marker 04", category: "Arson" },
                { id: "3", lat: 3.234526, lng: 101.650016, name: "Test Marker 04", category: "Arson" },
                { id: "4", lat: 3.133526, lng: 101.650016, name: "Test Marker 04", category: "Arson" },
                { id: "5", lat: 3.123526, lng: 101.650016, name: "Test Marker 04", category: "Arson" },
            ],
        }
    }

    componentDidMount() {
        // heroku api GET

        // set GET to markers
        // this.setState({ markers: })
    }

    render() {
        // const a bunch of icons

        const cannaIcon = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-cannabis fa-3x" />) });
        const theftIcon = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-angry fa-3x" />) });
        const murderIcon = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-skull fa-3x" />) });

        //if else statement to determine icon types
        console.log(this.props.currentZoom);

        return(
            <>
            { this.props.currentZoom <= 11 ? null :
                 this.state.pins.map((pin, index) =>
                    <Marker key={index} position={[pin.lat, pin.lng]}
                        icon={pin.category === "Theft" ? theftIcon : murderIcon} >
                        <Popup>
                            <p>{pin.name}</p>
                        </Popup>
                    </Marker>
                )}
            </>
        )
    }
}