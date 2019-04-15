// Yong's map main page goes here

import React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

class MapY extends React.Component {
    render() {
        return (
            <LeafletMap
                center={[3.134526, 101.630016]}
                zoom={17}
                maxZoom={17}
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
                <Marker position={[50, 10]}>
                    <Popup>
                        Popup for any custom information.
          </Popup>
                </Marker>
            </LeafletMap>
        );
    }
}

export default MapY;