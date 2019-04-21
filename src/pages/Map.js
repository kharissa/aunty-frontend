import React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import CreatePin from '../containers/CreatePin';
import Pins from '../components/Pins.js';
import GeoSearch from '../components/GeoSearch.js';
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from 'leaflet';
import axios from 'axios';

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickTime: 0,
            currentZoom: 15,
            mapTilesCarto: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
            clickedMarker: [],
            modal: false,
            isOpen: false,
            pins: [],
            itinerary: [],
            publicPins: [],
            privatePins: [],
        }
    }

    componentDidMount() {
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
        const { lat, lng } = this.props
        const geolocIcon = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-circle" />) });
        return (
            <>
                <LeafletMap
                    center={[lat, lng]}
                    zoom={13}
                    maxZoom={20}
                    attributionControl={true}
                    zoomControl={false}
                    doubleClickZoom={true}
                    scrollWheelZoom={true}
                    closePopupOnClick={true}
                    dragging={true}
                    animate={true}
                    easeLinearity={0.35}
                    onclick={this.handleClick}
                    onZoomend={this.onZoomEvent}
                    worldCopyJump={true}
                    tap={true}
                    className="markercluster-map">

                    <GeoSearch interactive={true}/>
                    <TileLayer url={this.state.mapTilesCarto} />

                    <MarkerClusterGroup showCoverageOnHover={true} maxClusterRadius={100} animate={true}
                        spiderLegPolylineOptions={{ weight: 1.5, color: '#d3d3d3', opacity: 0.3 }}>

                    <Pins pins={this.state.pins} />
                    </MarkerClusterGroup>

                    <Marker position={[lat, lng]} icon={geolocIcon}>
                        <Popup>You & Aunty are here!</Popup>
                    </Marker>

                    {this.state.clickedMarker.length > 0
                        ? <Marker className="new-marker" position={this.state.clickedMarker} onclick={this.toggleModal}
                            icon={ divIcon({ html: renderToStaticMarkup(<i className=" fa fa-plus fa-2x" />)}) }></Marker>
                        : null
                    }

                    <CreatePin modal={this.state.modal} toggleModal={this.toggleModal} position={this.state.clickedMarker} />

                </LeafletMap>
            </>
        );
    }
}