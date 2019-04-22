import React from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';

class Itinerary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itineraries: [],
        }
    }



    componentDidMount() {
        const token = localStorage.getItem('token');
        axios({
            method: 'GET',
            url: 'http://localhost:5000/api/v1/pins/itinerary/',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            this.setState({
                itineraries: response.data
            })
        })

    }


    render() {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Itinerary</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {this.state.itineraries.map(itinerary =>
                        <tr>
                            <th scope="row">{itinerary.pinName}</th>
                            <td>
                                {itinerary.start_time} <br />
                                Latitude: {itinerary.latitude}, <br />
                                Longitude: {itinerary.longitude}
                            </td>
                        </tr>
                    )}


                </tbody>
            </Table>

        )
    }



}

export default Itinerary;
