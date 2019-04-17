import React from 'react';
import { Map as LeafletMap, TileLayer, Marker } from 'react-leaflet';
import CreatePin from '../containers/CreatePin';
import Geolocation from '../components/Geolocation.js';
import Pins from '../components/Pins.js';
import GeoSearch from '../components/GeoSearch.js';

class MapJ extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickTime: 0,
            currentZoom: 15,
            mapTilesCarto: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
            clickedMarker: [],
            modal: false,
            isOpen: false,
            myLat: 0,
            myLng: 0,
            pins: [
                { id: "1", lat: 3.124526, lng: 101.630016, name: "Test Marker 03", category: "Theft" },
                { id: "2", lat: 3.134526, lng: 101.650016, name: "Test Marker 04", category: "Arson" },
                { id: "3", lat: 3.234526, lng: 101.650016, name: "Test Marker 04", category: "Theft" },
                { id: "4", lat: 3.133526, lng: 101.650016, name: "Test Marker 04", category: "Arson" },
                { id: "5", lat: 3.123526, lng: 101.650016, name: "Test Marker 04", category: "Harassment" },
            ],
        }
    }

    componentDidMount() {
        this.setState({
            myLat: localStorage.getItem('latitude'),
            myLng: localStorage.getItem('longitude'),
        });

        // heroku api GET
        // set GET to pins
        // this.setState({ pins: })

    }

    handleClick = (e) => {
        const { lat, lng } = e.latlng;
        this.setState({ clickedMarker: [lat, lng] })
        console.log(this.state.clickedMarker)
    }

    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    onZoomEvent = (e) => {
        this.setState({ currentZoom: e.target.getZoom() })
    }

    render() {

        return (
            <>
                <LeafletMap
                    center={[this.state.myLat, this.state.myLng]}
                    zoom={this.state.currentZoom}
                    maxZoom={20}
                    attributionControl={true}
                    zoomControl={true}
                    doubleClickZoom={true}
                    scrollWheelZoom={true}
                    dragging={true}
                    animate={true}
                    easeLinearity={0.35}
                    onclick={this.handleClick}
                    onZoomend={this.onZoomEvent} >

                    <GeoSearch />
                    <TileLayer url={this.state.mapTilesCarto} />

                    <Geolocation />
                    <Pins currentZoom={this.state.currentZoom} pins={this.state.pins} />

                    {this.state.clickedMarker.length > 0
                        ? <Marker className="new-marker" position={this.state.clickedMarker} onclick={this.toggleModal}></Marker>
                        : null
                        // create a marker onclick, with a modal pop-up to create a new marker.
                    }

                    <CreatePin modal={this.state.modal} toggleModal={this.toggleModal} position={this.state.clickedMarker} />

                </LeafletMap>
            </>
        );
    }
}

export default MapJ;

