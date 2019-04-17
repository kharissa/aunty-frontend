import React from 'react';
import { renderToStaticMarkup } from "react-dom/server";
import { Map as LeafletMap, TileLayer, Marker, Popup} from 'react-leaflet';
import CreatePin from '../containers/CreatePin';
import { divIcon } from 'leaflet';
import Geolocation from '../components/Geolocation.js'
import Pins from '../components/Pins.js'

class MapJ extends React.Component {
    constructor(props){
        super(props);
        this.state={
            clickTime: 0,
            mapZoom: 15,
            currentZoom: 15,
            mapTilesCarto: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
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

        const cannaIcon = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-cannabis fa-3x" />) });
        const theftIcon = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-angry fa-3x" />) });
        const murderIcon = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-skull fa-3x" />) });

        return (
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

                <TileLayer url={this.state.mapTilesCarto} />


                <Geolocation getGeoloc={this.getGeoloc} />
                <Pins currentZoom={this.state.currentZoom}/>

                {/* { this.state.markers.map((marker, index) =>
                    <Marker key={index} position={[marker.lat, marker.lng]}
                        icon={marker.category === "Theft" ? theftIcon : murderIcon} >
                        <Popup>
                            <p>{marker.name}</p>
                        </Popup>
                    </Marker>
                )} */}

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

