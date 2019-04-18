import React from 'react';
import { Map as LeafletMap, TileLayer, Marker } from 'react-leaflet';
import CreatePin from '../containers/CreatePin';
import Geolocation from '../components/Geolocation.js';
import Pins from '../components/Pins.js';
import GeoSearch from '../components/GeoSearch.js';
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from 'leaflet';

class Map extends React.Component {
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
                { id: "1", lat: 3.108668, lng: 101.631993, name: "testMarker1", category: "Hate Crime" },
                { id: "2", lat: 3.125047, lng: 101.6695, name: "testMarker2", category: "Assault" },
                { id: "3", lat: 3.142737, lng: 101.626388, name: "testMarker3", category: "Theft" },
                { id: "4", lat: 3.153728, lng: 101.601984, name: "testMarker4", category: "Harassment" },
                { id: "5", lat: 3.136028, lng: 101.667281, name: "testMarker5", category: "Harassment" },
                { id: "6", lat: 3.161986, lng: 101.69677, name: "testMarker6", category: "Hate Crime" },
                { id: "7", lat: 3.111429, lng: 101.637513, name: "testMarker7", category: "Assault" },
                { id: "8", lat: 3.153875, lng: 101.611314, name: "testMarker8", category: "Theft" },
                { id: "9", lat: 3.13635, lng: 101.661764, name: "testMarker9", category: "Hate Crime" },
                { id: "10", lat: 3.114791, lng: 101.616046, name: "testMarker10", category: "Theft" },
                { id: "11", lat: 3.134271, lng: 101.62012, name: "testMarker11", category: "Theft" },
                { id: "12", lat: 3.1007, lng: 101.675709, name: "testMarker12", category: "Assault" },
                { id: "13", lat: 3.192428, lng: 101.675724, name: "testMarker13", category: "Hate Crime" },
                { id: "14", lat: 3.151036, lng: 101.607105, name: "testMarker14", category: "Theft" },
                { id: "15", lat: 3.121371, lng: 101.699955, name: "testMarker15", category: "Harassment" },
                { id: "16", lat: 3.145999, lng: 101.650021, name: "testMarker16", category: "Assault" },
                { id: "17", lat: 3.168235, lng: 101.681871, name: "testMarker17", category: "Hate Crime" },
                { id: "18", lat: 3.110751, lng: 101.61258, name: "testMarker18", category: "Hate Crime" },
                { id: "19", lat: 3.13528, lng: 101.618331, name: "testMarker19", category: "Assault" },
                { id: "20", lat: 3.178239, lng: 101.628615, name: "testMarker20", category: "Theft" },
                { id: "21", lat: 3.188394, lng: 101.675421, name: "testMarker21", category: "Theft" },
                { id: "22", lat: 3.152531, lng: 101.646399, name: "testMarker22", category: "Shooting" },
                { id: "23", lat: 3.13343, lng: 101.649805, name: "testMarker23", category: "Theft" },
                { id: "24", lat: 3.197295, lng: 101.62923, name: "testMarker24", category: "Harassment" },
                { id: "25", lat: 3.152853, lng: 101.680313, name: "testMarker25", category: "Assault" },
                { id: "26", lat: 3.111137, lng: 101.649274, name: "testMarker26", category: "Theft" },
                { id: "27", lat: 3.177945, lng: 101.674398, name: "testMarker27", category: "Assault" },
                { id: "28", lat: 3.179306, lng: 101.600988, name: "testMarker28", category: "Shooting" },
                { id: "29", lat: 3.16021, lng: 101.644122, name: "testMarker29", category: "Theft" },
                { id: "30", lat: 3.188388, lng: 101.67999, name: "testMarker30", category: "Hate Crime" },
                { id: "31", lat: 3.163617, lng: 101.676585, name: "testMarker31", category: "Shooting" },
                { id: "32", lat: 3.110123, lng: 101.686059, name: "testMarker32", category: "Assault" },
                { id: "33", lat: 3.160943, lng: 101.67763, name: "testMarker33", category: "Harassment" },
                { id: "34", lat: 3.196577, lng: 101.610157, name: "testMarker34", category: "Hate Crime" },
                { id: "35", lat: 3.198915, lng: 101.644745, name: "testMarker35", category: "Shooting" },
                { id: "36", lat: 3.174993, lng: 101.684546, name: "testMarker36", category: "Hate Crime" },
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

    // createClusterCustomIcon = (cluster) => {
    //     const count = cluster.getChildCount();
    //     let size = 'LargeXL';

    //     if (count < 10) {
    //         size = 'Small';
    //     }
    //     else if (count >= 10 && count < 100) {
    //         size = 'Medium';
    //     }
    //     else if (count >= 100 && count < 500) {
    //         size = 'Large';
    //     }
    //     const options = {
    //         cluster: `markerCluster${size}`,
    //     };

    //     return divIcon({
    //         html:
    //             `<div>
    //                 <span class="markerClusterLabel">${count}</span>
    //             </div>`,
    //         className: `${options.cluster}`,
    //     });
    // };


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
                    onZoomend={this.onZoomEvent}
                    className="markercluster-map">

                    <GeoSearch />
                    <TileLayer url={this.state.mapTilesCarto} />
                    <MarkerClusterGroup>
                    <Pins currentZoom={this.state.currentZoom} pins={this.state.pins} />
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
