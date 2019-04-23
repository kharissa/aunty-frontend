import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from 'leaflet';

const icons = {
    "Hate Crime": divIcon({ html: renderToStaticMarkup(<i className=" fa fa-angry fa-2x" />) }),
    "Assault": divIcon({ html: renderToStaticMarkup(<i className=" fa fa-skull fa-2x" />) }),
    "Theft": divIcon({ html: renderToStaticMarkup(<i className=" fa fa-walking fa-2x" />) }),
    "Shooting": divIcon({ html: renderToStaticMarkup(<i className=" fa fa-haykal fa-2x" />) }),
    "Harassment": divIcon({ html: renderToStaticMarkup(<i className=" fa fa-shoe-prints fa-2x" />) }),
    "Police Presence": divIcon({ html: renderToStaticMarkup(<i className=" fa fa-bullhorn fa-2x" />) }),
    "Medical": divIcon({ html: renderToStaticMarkup(<i className=" fa fa-first-aid fa-2x" />) }),
    "Hotel": divIcon({ html: renderToStaticMarkup(<i className=" fa fa-bed fa-2x" />) }),
    "Home/Safe House": divIcon({ html: renderToStaticMarkup(<i className=" fa fa-home fa-2x" />) }),
    "Itinerary": divIcon({ html: renderToStaticMarkup(<i className=" far fa-clock fa-2x" />) }),

    // const iconMarker = divIcon({ html: renderToStaticMarkup(<i className=" fa fa-map-marker-alt fa-2x" />) });

    // const iconItnUpcoming = divIcon({ html: renderToStaticMarkup(<i className=" far fa-clock fa-2x" />) });
    // const iconItnResolved = divIcon({ html: renderToStaticMarkup(<i className=" fas fa-history fa-2x" />) });
    // const iconSOS = divIcon({ html: renderToStaticMarkup(<i className=" fas fa-bell fa-2x" />) });
}

export default class Pins extends React.Component {

    render() {
        return(
            <>
            { this.props.pins.map((pin, index) =>
                <Marker key={pin.id} position={[Number(pin.latitude), Number(pin.longitude)]}
               icon={icons[pin.category]} >
                    <Popup>
                        <p>{pin.category}</p>
                    </Popup>
                </Marker>
            )}
            </>
        )
    }
}

