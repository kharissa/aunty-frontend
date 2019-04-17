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
        const cannaIcon = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-cannabis fa-3x" />) });
        const theftIcon = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-angry fa-3x" />) });
        const murderIcon = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-skull fa-3x" />) });

        if (cat === "Theft") {
            return theftIcon
        } else if (cat === "Arson") {
            return murderIcon
        } else if (cat === "Harassment") {
            return cannaIcon
        }
    }

    render() {
        return(
            <>
            { this.props.currentZoom <= 13 ? null : // show icons based on current map level
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