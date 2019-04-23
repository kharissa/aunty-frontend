import React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import CreatePin from '../containers/CreatePin';
import Pins from '../components/Pins.js';
import GeoSearch from '../components/GeoSearch.js';
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from 'leaflet';
import axios from 'axios';

const { BaseLayer, Overlay } = LayersControl

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
            safePins: [],
            dangerPins: [],
            privatePins: [],
        };
        this.onClickGeoloc = this.onClickGeoloc.bind(this)
        this.leafletMap = React.createRef();
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
            // console.log(response.data.publicPins);

            let pubPins = response.data.publicPins;
            let isSafe = [];
            let isDanger = [];

            pubPins.forEach(pin => {
                if (pin.is_safe === true) {
                    isSafe.push(pin)
                } else {
                    isDanger.push(pin)
                }
            })

            this.setState({ safePins: isSafe, dangerPins: isDanger });
            this.setState({ privatePins: response.data.privatePins });

        }).catch(error => {
            console.log(error)
        })

        axios({
            method: 'GET',
            url: 'https://gokaikai.herokuapp.com/api/v1/pins/itinerary/',
            'headers': {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            // SUPER HACKY! DONT DO THIS IN REAL SITUATIONS, FIX YOUR BACKEND!!!! (by Matt)

            let newData = response.data.map(pin => {
                let newPin = pin;
                let latitude = pin.latitude;
                let longitude = pin.longitude;
                newPin.latitude = longitude;
                newPin.longitude = latitude;
                return newPin
            })
            // console.log(newData);
            this.setState({ itinerary: newData.map(pin => ({
                ...pin,
                category: 'Itinerary'
            })) });
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

    onClickGeoloc = () => {
        const { lat, lng } = this.props;
        this.leafletMap.current.leafletElement.flyTo([lat, lng], 15)
    }

    render() {
        const { lat, lng } = this.props
        const geolocIcon = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-circle" />) });

        return (
            <>
                <LeafletMap
                    ref={this.leafletMap}
                    center={[lat, lng]}
                    zoom={13} maxZoom={20} zoomControl={false}
                    attributionControl={true} attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    doubleClickZoom={true} scrollWheelZoom={true}
                    closePopupOnClick={true} worldCopyJump={true} easeLinearity={0.35}
                    onClick={this.handleClick} >

                    <GeoSearch interactive={true} />

                    <LayersControl position="bottomright">

                        <BaseLayer checked name="Base Layer">
                            <TileLayer url={this.state.mapTilesCarto} />
                        </BaseLayer>

                        <Overlay checked name="Dangerous">
                            <MarkerClusterGroup showCoverageOnHover={true} maxClusterRadius={35} animate={true}
                                spiderLegPolylineOptions={{ weight: 1.5, color: '#d3d3d3', opacity: 0.3 }}>
                                <Pins pins={this.state.dangerPins} />
                            </MarkerClusterGroup>
                        </Overlay>

                        <Overlay checked name="Itinerary">
                            <MarkerClusterGroup showCoverageOnHover={true} maxClusterRadius={35} animate={true}
                                spiderLegPolylineOptions={{ weight: 1.5, color: '#d3d3d3', opacity: 0.3 }}>
                                <Pins pins={this.state.itinerary} />
                            </MarkerClusterGroup>
                        </Overlay>

                        <Overlay checked name="Safe">
                            <MarkerClusterGroup showCoverageOnHover={true} maxClusterRadius={35} animate={true}
                                spiderLegPolylineOptions={{ weight: 1.5, color: '#d3d3d3', opacity: 0.3 }}>
                                <Pins pins={this.state.safePins} />
                            </MarkerClusterGroup>
                        </Overlay>

                        <Overlay checked name="Private">
                            <MarkerClusterGroup showCoverageOnHover={true} maxClusterRadius={35} animate={true}
                                spiderLegPolylineOptions={{ weight: 1.5, color: '#d3d3d3', opacity: 0.3 }}>
                                <Pins pins={this.state.privatePins} />
                            </MarkerClusterGroup>
                        </Overlay>

                        <Marker position={[lat, lng]} icon={geolocIcon}>
                            <Popup>
                                <div align="center">
                                    <img src="https://media.giphy.com/media/1rNWZu4QQqCUaq434T/giphy.gif" width="200px" alt="??" /><br />
                                    <b>Wah, this place you bring Aunty so nice!</b>
                                </div>
                            </Popup>
                        </Marker>

                        {this.state.clickedMarker.length > 0
                            ? <Marker opacity='0.7' draggable={true} className="new-marker"
                                position={this.state.clickedMarker}
                                onClick={this.toggleModal}
                                icon={divIcon({ html: renderToStaticMarkup(<i className=" fa fa-plus fa-2x" />) })}>
                            </Marker>
                            : null
                        }

                        <CreatePin modal={this.state.modal} toggleModal={this.toggleModal} position={this.state.clickedMarker} />

                    </LayersControl>
                </LeafletMap>

                <button className="go-to-loc" onClick={this.onClickGeoloc}><i className="far fa-dot-circle"></i></button>

            </>
        );
    }
}