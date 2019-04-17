import React from 'react';
import { renderToStaticMarkup } from "react-dom/server";
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import CreatePinModal from '../containers/CreatePinModal';
import { divIcon } from 'leaflet';


class MapJ extends React.Component {
    constructor(props){
        super(props)
        this.state={
            clickTime: 0,
            mapCenter: [3.134526, 101.63006],
            mapZoom: 15,
            mapTilesStamen: 'http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
            mapTilesCarto: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
            mapOverlayStamen: 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}.png',
            mapTilesMapTiler: 'https://api.maptiler.com/maps/positron/{z}/{x}/{y}.png?key=QQTisrA3O6303lHbHZ4u',
            marker: [3.134526, 101.670016],
            markers: [
                { id: "1", lat: 3.134526, lng: 101.630016, name: "Test Marker 01", category: "Theft" },
                { id: "2", lat: 3.154526, lng: 101.650016, name: "Test Marker 02", category: "Arson" },
                // to GET data from API
            ],
            clickedMarker : [],
            modal: false,
            isOpen: false,
        }
    }

    componentDidMount() {
        // get markers from API this.setState({ markers })
        // for each marker, show on map
    }

    handleClick = (e) => {
        const { lat, lng } = e.latlng;
        // console.log(lat, lng);
        this.setState({ clickedMarker: [lat, lng] })
        console.log(this.state.clickedMarker)
    }

    handleMarkerClick = (e) => {
        console.log('clicked on this marker')
    }

    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    render() {
        // const iconMarkup = ;
        const cannaIcon = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-cannabis fa-3x" />) });
        const theftIcon = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-angry fa-3x" />) });
        const murderIcon = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-skull fa-3x" />) });

        return (
            <LeafletMap
                center={this.state.mapCenter}
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
                // url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            >

                <TileLayer url={this.state.mapTilesCarto} />
                {/* <TileLayer url={this.state.mapOverlayStamen} /> */}

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

                <CreatePinModal modal={this.state.modal} toggleModal={this.toggleModal} position={this.state.clickedMarker} />

            </LeafletMap>
        );
    }
}

export default MapJ;

