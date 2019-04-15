import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

export default class Map extends React.Component {
    state = {
        markers: [
            { "id": 1, "lat": 3.1348112113359, "lng": 101.62996282434, "category": "Snatch" },
            { "id": 2, "lat": 3.111030, "lng": 101.549431, "category": "Snatch" }],
    }
    render() {
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
