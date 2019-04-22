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
            pins: [{ id: "1", latitude: 3.119762, longitude: 101.60296, name: "testMarker1", category: "Hate Crime" },
                { id: "2", latitude: 3.110983, longitude: 101.61024, name: "testMarker2", category: "Harassment" },
                { id: "3", latitude: 3.171447, longitude: 101.641153, name: "testMarker3", category: "Theft" },
                { id: "4", latitude: 3.139644, longitude: 101.608547, name: "testMarker4", category: "Shooting" },
                { id: "5", latitude: 3.130199, longitude: 101.641782, name: "testMarker5", category: "Harassment" },
                { id: "6", latitude: 3.106342, longitude: 101.641819, name: "testMarker6", category: "Police Presence" },
                { id: "7", latitude: 3.12007, longitude: 101.667079, name: "testMarker7", category: "Theft" },
                { id: "8", latitude: 3.168114, longitude: 101.687128, name: "testMarker8", category: "Shooting" },
                { id: "9", latitude: 3.19088, longitude: 101.604994, name: "testMarker9", category: "Police Presence" },
                { id: "10", latitude: 3.161724, longitude: 101.656656, name: "testMarker10", category: "Shooting" },
                { id: "11", latitude: 3.188178, longitude: 101.6444, name: "testMarker11", category: "Hotel" },
                { id: "12", latitude: 3.112263, longitude: 101.623803, name: "testMarker12", category: "Police Presence" },
                { id: "13", latitude: 3.187117, longitude: 101.623561, name: "testMarker13", category: "Police Presence" },
                { id: "14", latitude: 3.183028, longitude: 101.66733, name: "testMarker14", category: "Shooting" },
                { id: "15", latitude: 3.11285, longitude: 101.64148, name: "testMarker15", category: "Shooting" },
                { id: "16", latitude: 3.174661, longitude: 101.616431, name: "testMarker16", category: "Home/Safe House" },
                { id: "17", latitude: 3.147024, longitude: 101.669873, name: "testMarker17", category: "Assault" },
                { id: "18", latitude: 3.142843, longitude: 101.620548, name: "testMarker18", category: "Theft" },
                { id: "19", latitude: 3.184614, longitude: 101.652273, name: "testMarker19", category: "Police Presence" },
                { id: "20", latitude: 3.165951, longitude: 101.627323, name: "testMarker20", category: "Medical" },
                { id: "21", latitude: 3.134949, longitude: 101.654135, name: "testMarker21", category: "Hotel" },
                { id: "22", latitude: 3.177534, longitude: 101.611822, name: "testMarker22", category: "Assault" },
                { id: "23", latitude: 3.178374, longitude: 101.606668, name: "testMarker23", category: "Theft" },
                { id: "24", latitude: 3.155008, longitude: 101.60233, name: "testMarker24", category: "Shooting" },
                { id: "25", latitude: 3.19386, longitude: 101.604615, name: "testMarker25", category: "Medical" },
                { id: "26", latitude: 3.101151, longitude: 101.688244, name: "testMarker26", category: "Shooting" },
                { id: "27", latitude: 3.173683, longitude: 101.67386, name: "testMarker27", category: "Theft" },
                { id: "28", latitude: 3.124245, longitude: 101.683102, name: "testMarker28", category: "Home/Safe House" },
                { id: "29", latitude: 3.188432, longitude: 101.665079, name: "testMarker29", category: "Assault" },
                { id: "30", latitude: 3.170735, longitude: 101.618958, name: "testMarker30", category: "Police Presence" },
                { id: "31", latitude: 3.178123, longitude: 101.605709, name: "testMarker31", category: "Home/Safe House" },
                { id: "32", latitude: 3.135818, longitude: 101.642709, name: "testMarker32", category: "Medical" },
                { id: "33", latitude: 3.165527, longitude: 101.690918, name: "testMarker33", category: "Police Presence" },
                { id: "34", latitude: 3.145956, longitude: 101.623987, name: "testMarker34", category: "Shooting" },
                { id: "35", latitude: 3.102214, longitude: 101.698403, name: "testMarker35", category: "Hate Crime" },
                { id: "36", latitude: 3.167531, longitude: 101.672277, name: "testMarker36", category: "Harassment" },
                ],
            itinerary: [],
            publicPins: [],
            privatePins: [],
        };
        this.onClickGeoloc = this.onClickGeoloc.bind(this)
        this.leafletMap = React.createRef();
    }

    componentDidMount() {

        const token = localStorage.getItem('token');
        console.log(this.leafletMap.current)

        // axios({
        //     method: 'GET',
        //     url: 'https://gokaikai.herokuapp.com/api/v1/pins/map/',
        //     'headers': {
        //         Authorization: `Bearer ${token}`
        //     }
        // }).then(response => {
        //     // this.state.pins.push(response.data.publicPins);
        //     // console.log(response.data.publicPins);
        //     this.setState({ pins: response.data.publicPins });
        // }).catch(error => {
        //     console.log(error)
        // })
    }

    // TODO
    // get itinerary pins


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
        console.log('button is working~');
        const {lat, lng} = this.props;
        this.leafletMap.current.leafletElement.flyTo([lat, lng], 15)
    }

    render() {
        const { lat, lng } = this.props
        const geolocIcon = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-circle" />) });
        return (
            <>
                <LeafletMap
                    ref={this.leafletMap}
                    useFlyTo={true}
                    center={[lat, lng]}
                    zoom={13}
                    maxZoom={20}
                    attributionControl={true}
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
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
                        <Popup>
                            <div align="center">
                                <img src="https://media.giphy.com/media/1rNWZu4QQqCUaq434T/giphy.gif" width="200px" alt="??"/><br/>
                                <b>Wah, this place you bring Aunty so nice!</b>
                            </div>
                        </Popup>
                    </Marker>

                    {this.state.clickedMarker.length > 0
                        ? <Marker opacity='0.7' draggable={true} className="new-marker" position={this.state.clickedMarker} onClick={this.toggleModal}
                            icon={ divIcon({ html: renderToStaticMarkup(<i className=" fa fa-plus fa-2x" />)}) }></Marker>
                        : null
                    }

                    <CreatePin modal={this.state.modal} toggleModal={this.toggleModal} position={this.state.clickedMarker} />

                </LeafletMap>

                <button className="go-to-loc" onClick={this.onClickGeoloc}> go to my location</button>
            </>
        );
    }
}