import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup, withLeaflet, MapControl } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch"
import Sos from '../pages/SOS'

class AddressControl extends MapControl {
    createLeafletElement() {
        const provider = new OpenStreetMapProvider()
        return GeoSearchControl({ provider: provider, style: 'bar' })
    }
}



class Map extends React.Component {
    state = {
        markers: [
            { "id": 1, "lat": 3.1348112113359, "lng": 101.62996282434, "category": "Snatch" },
            { "id": 2, "lat": 3.111030, "lng": 101.549431, "category": "Snatch" }],
    }

    // API Called to Database


    render() {
        const AddressSearch = withLeaflet(AddressControl)
        return (

            <LeafletMap
                center={[this.props.my_lat, this.props.my_lng]}
                zoom={15}
                maxZoom={20}
                attributionControl={true}
                zoomControl={true}
                doubleClickZoom={true}
                scrollWheelZoom={true}
                dragging={true}
                animate={true}
                easeLinearity={0.35}
            >

                <TileLayer
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />

                <AddressSearch />

                {this.state.markers.map(marker =>
                    <Marker position={[marker.lat, marker.lng]}>
                        <Popup>
                            {marker.category}
                        </Popup>
                    </Marker>
                )}

            </LeafletMap>
        );
    }
}

export default Map
