import React from 'react';
import { renderToStaticMarkup } from "react-dom/server";
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import CreatePin from '../containers/CreatePin';
import { divIcon } from 'leaflet';
import Geolocation from '../components/Geolocation.js'

class MapJ extends React.Component {
    constructor(props){
        super(props);
        this.state={
            clickTime: 0,
            mapCenter: [3.134526, 101.63006],
            mapZoom: 15,
            mapTilesCarto: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
            marker: [3.134526, 101.670016],
            markers: [
                { id: "1", lat: 3.134526, lng: 101.630016, name: "Test Marker 01", category: "Theft" },
                { id: "2", lat: 3.154526, lng: 101.650016, name: "Test Marker 02", category: "Arson" },
                // to GET data from API
            ],
            clickedMarker : [],
            modal: false,
            isOpen: false,
            myLat: 0,
            myLng: 0,
        }
    }

    componentDidMount() {
        this.setState({
            myLat: localStorage.getItem('latitude'),
            myLng: localStorage.getItem('longitude'),
        });
        // get markers from API this.setState({ markers })
        // for each marker, show on map
    }

    handleClick = (e) => {
        const { lat, lng } = e.latlng;
        // console.log(lat, lng);
        this.setState({ clickedMarker: [lat, lng] })
        console.log(this.state.clickedMarker)
    }

    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    render() {

        const cannaIcon = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-cannabis fa-3x" />) });
        const theftIcon = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-angry fa-3x" />) });
        const murderIcon = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-skull fa-3x" />) });

        return (
            <LeafletMap
                center={[this.state.myLat, this.state.myLng]}
                zoom={this.state.mapZoom}
                maxZoom={20}
                attributionControl={true}
                zoomControl={true}
                doubleClickZoom={true}
                scrollWheelZoom={true}
                dragging={true}
                animate={true}
                easeLinearity={0.35}
                onclick={this.handleClick}
            >

                <TileLayer url={this.state.mapTilesCarto} />


                <Geolocation getGeoloc={this.getGeoloc} />

                <Marker position={this.state.marker} icon={cannaIcon}>
                    <Popup>
                        <p>Hardcoded Marker</p>
                        {this.state.marker.join(", ")}
                    </Popup>
                </Marker>

                { this.state.markers.map((marker, index) =>
                        <Marker key={index} position={[marker.lat, marker.lng]}
                        icon={marker.category === "Theft" ? theftIcon : murderIcon}
                        >
                            <Popup>
                                <p>{marker.name}</p>
                            </Popup>
                        </Marker>
                    )}

                {this.state.clickedMarker.length > 0
                    ? <Marker className="new-marker" position = {this.state.clickedMarker} onclick={this.toggleModal}></Marker>
                    : null
                    // create a marker onclick with a modal pop-up to create a new marker.
                }

                <CreatePin modal={this.state.modal} toggleModal={this.toggleModal} position={this.state.clickedMarker} />

            </LeafletMap>
        );
    }
}

export default MapJ;

