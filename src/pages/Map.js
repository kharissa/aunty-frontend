import React from 'react';
import { Map as LeafletMap, TileLayer, Marker } from 'react-leaflet';
import CreatePin from '../containers/CreatePin';
import Geolocation from '../components/Geolocation.js';
import Pins from '../components/Pins.js';
import GeoSearch from '../components/GeoSearch.js';
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from 'leaflet';
import axios from 'axios';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickTime: 0,
            currentZoom: 15,
            mapTilesCarto: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
            clickedMarker: [],
            modal: true,
            isOpen: true,
            myLat: 0,
            myLng: 0,
            pins: [],
        }
    }

    componentDidMount() {
        this.setState({
            myLat: localStorage.getItem('latitude'),
            myLng: localStorage.getItem('longitude'),
        });

        const token = localStorage.getItem('token');

        axios({
            method: 'GET',
            url: 'https://gokaikai.herokuapp.com/api/v1/pins/map/',
            'headers': {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            // this.state.pins.push(response.data.publicPins);
            // console.log(response.data.publicPins);
            this.setState({ pins: response.data.publicPins });
        }).catch(error => {
            console.log(error)
        })

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

    render() {
        return (
            <>
                <LeafletMap
                    center={[this.state.myLat, this.state.myLng]}
                    zoom={13}
                    maxZoom={20}
                    attributionControl={true}
                    zoomControl={true}
                    doubleClickZoom={true}
                    scrollWheelZoom={true}
                    dragging={true}
                    animate={true}
                    easeLinearity={0.35}
                    onclick={this.handleClick}
                    onZoomend={this.onZoomEvent}
                    className="markercluster-map">

                    <GeoSearch />
                    <TileLayer url={this.state.mapTilesCarto} />
                    <MarkerClusterGroup>
                    <Pins pins={this.state.pins} />
                    </MarkerClusterGroup>

                    <Geolocation />
                    {this.state.clickedMarker.length > 0
                        ? <Marker className="new-marker" position={this.state.clickedMarker} onclick={this.toggleModal}
                            icon={ divIcon({ html: renderToStaticMarkup(<i className=" fa fa-plus fa-2x" />)}) }></Marker>
                        : null
                        // create a marker onclick, with a modal pop-up to create a new marker.
                    }

                    <CreatePin modal={this.state.modal} toggleModal={this.toggleModal} position={this.state.clickedMarker} />

                </LeafletMap>
            </>
        );
    }
}

export default Map;

