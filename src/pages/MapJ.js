// Jade's map main page goes here

import React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';


class MapJ extends React.Component {
    constructor(props){
        super(props);
        this.state={
            mapCenter: [3.134526, 101.63006],
            mapZoom: 15,
            mapTilesStamen: 'http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
            mapOverlayStamen: 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}.png',
            marker: [3.134526, 101.670016],
            markers: [
                { id: "1", lat: 3.134526, lng: 101.630016, name: "Test Marker 01" },
                { id: "2", lat: 3.154526, lng: 101.650016, name: "Test Marker 02" },
                // to GET from API
            ],
            clickedMarker : [],
        }
    }

    componentDidMount() {
        // get markers from api
        // for each marker, show on map
    }

    handleClick = (e) => {
        const { lat, lng } = e.latlng;
        // console.log(lat, lng);
        this.setState({ clickedMarker: [lat, lng] })
        console.log(this.state.clickedMarker)
    }

    render() {
        return (
            <LeafletMap
                center={this.state.mapCenter}
                zoom={this.state.mapZoom}
                maxZoom={17}
                attributionControl={true}
                zoomControl={true}
                doubleClickZoom={true}
                scrollWheelZoom={true}
                dragging={true}
                animate={true}
                easeLinearity={0.35}
                onclick={this.handleClick}
                // url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            >

                <TileLayer url={this.state.mapTilesStamen} />
                <TileLayer url={this.state.mapOverlayStamen} />

                <Marker position={this.state.marker}>
                    <Popup>
                        <p>Hardcoded Marker</p>
                        {this.state.marker.join(", ")}
                    </Popup>
                </Marker>

                {this.state.markers.map((marker, index) =>
                    <Marker key={index} position={[marker.lat, marker.lng]}>
                        <Popup>
                            <p>{marker.name}</p>
                        </Popup>
                    </Marker>
                )}

            </LeafletMap>
        );
    }
}

export default MapJ;

