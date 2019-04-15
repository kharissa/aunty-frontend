// Jade's map main page goes here

import React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';


class MapJ extends React.Component {
    constructor(props){
        super(props);
        this.state={
            mapCenter: [3.134526, 101.630016],
            mapZoom: 15,
            mapTilesStamen: 'http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
            mapOverlayStamen: 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}.png',
            marker: [3.134526, 101.630016]
        }
    }

    componentDidMount() {
        // get markers from api
        // for each marker, show on map
    }

    handleClick = (e) => {
        const { lat, lng } = e.latlng;
        console.log(lat, lng);
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
            >
                <TileLayer
                    url={this.state.mapTilesStamen}
                    // url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                <TileLayer
                    url={this.state.mapOverlayStamen}
                />
                <Marker position={this.state.marker}>
                    <Popup>
                        Popup for any custom information.
          </Popup>
                </Marker>
            </LeafletMap>
        );
    }
}

export default MapJ;