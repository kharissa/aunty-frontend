import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from 'leaflet';


export default class Pins extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    giveIcon = (cat) => {
        const iconHate = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-angry fa-2x" />) });
        const iconAssault = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-skull fa-2x" />) });
        const iconTheft = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-walking fa-2x" />) });
        const iconShoot = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-haykal fa-2x" />) });
        const iconHarrass = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-shoeprint fa-2x" />) });
        const iconPolice = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-bullhorn fa-2x" />) });
        const iconMedical = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-clinic-medical fa-2x" />) });
        const iconHotel = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-bed fa-2x" />) });
        const iconHome = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-home fa-2x" />) });
        const iconMarker = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-map-marker-alt fa-2x" />) });

        if (cat === "Hate Crime") {
            return iconHate
        } else if (cat === "Assault") {
            return iconAssault
        } else if (cat === "Theft") {
            return iconTheft
        } else if (cat === "Shooting") {
            return iconShoot
        } else if (cat === "Harassment") {
            return iconHarrass
        } else if (cat === "Police") {
            return iconPolice
        } else if (cat === "Medical") {
            return iconMedical
        } else if (cat === "Hotel") {
            return iconHotel
        } else if (cat === "Home") {
            return iconHome
        } else {
            return iconMarker
        }
    }

    render() {
        return(
            <>
            { this.props.currentZoom <= 5 ? null : // show icons based on current map level
                this.props.pins.map((pin, index) =>
                    <Marker key={index} position={[pin.lat, pin.lng]}
                        icon={this.giveIcon(pin.category)} >
                        <Popup>
                            <p>{pin.name}</p>
                        </Popup>
                    </Marker>
                )
            }
            </>
        )
    }
}