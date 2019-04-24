import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from 'leaflet';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const icons = {
    "Hate Crime": divIcon({ html: renderToStaticMarkup(<i className=" fa fa-angry fa-2x" />) }),
    "Assault": divIcon({ html: renderToStaticMarkup(<i className=" fa fa-skull fa-2x" />) }),
    "Theft": divIcon({ html: renderToStaticMarkup(<i className=" fa fa-walking fa-2x" />) }),
    "Shooting": divIcon({ html: renderToStaticMarkup(<i className=" fa fa-haykal fa-2x" />) }),
    "Harassment": divIcon({ html: renderToStaticMarkup(<i className=" fa fa-shoe-prints fa-2x" />) }),
    "Police Presence": divIcon({ html: renderToStaticMarkup(<i className=" fa fa-bullhorn fa-2x" />) }),
    "Medical": divIcon({ html: renderToStaticMarkup(<i className=" fa fa-first-aid fa-2x" />) }),
    "Hotel": divIcon({ html: renderToStaticMarkup(<i className=" fa fa-bed fa-2x" />) }),
    "Embassy": divIcon({ html: renderToStaticMarkup(<i className=" far fa-building fa-2x" />) }),
    "Home/Safe House": divIcon({ html: renderToStaticMarkup(<i className=" fa fa-home fa-2x" />) }),
    "Itinerary": divIcon({ html: renderToStaticMarkup(<i className=" far fa-clock fa-2x" />) }),
}

export default class Pins extends React.Component {

    render() {
        return(
            <>
            { this.props.pins.map((pin) =>
                <Marker key={pin.id} position={[Number(pin.latitude), Number(pin.longitude)]}
               icon={icons[pin.category]} >
                    <Popup>
                        <h6>{pin.category}</h6>
                        <p></p>
                        { (pin.pinName) ? <b>{pin.pinName}</b> : <b>{pin.name}</b> }
                        <br/>
                        { (pin.address) ? <>{pin.address}</> : null }
                        <br/>
                        { (pin.start_time)
                            ? <p><b>Check in time:</b> {pin.start_time} <br /><br />
                                <Button color="success" size="sm"><Link to={{ pathname: "/setting", state: {activeTab: '2'} }} style={{color: '#ffffff'}}>Edit this pin</Link></Button></p>
                            : null }
                    </Popup>
                </Marker>
            )}
            </>
        )
    }
}

