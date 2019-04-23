import React from 'react';
import axios from 'axios';
import { Table, Button } from 'reactstrap';

class Itinerary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itineraries: [],
            pin_id: ''
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

    handleDelete = (event) => {
        const token = localStorage.getItem('token');
        let pin_id = event.target.getAttribute('data-pin_id');

        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/v1/pins/itinerary/delete/',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                pinId: pin_id
            }
        })
            .then(response => {
                console.log(response.data);
                window.location.reload()
            })
            .catch(error => {
                console.log(error);
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
                            <th scope="row">
                                <div className='m-2'>
                                    {itinerary.pinName}
                                </div>
                                <tr>
                                    <div className='m-2'>
                                        <Button outline color='danger' size='sm' onClick={this.handleDelete} data-pin_id={itinerary.id}>Delete</Button>
                                    </div>
                                </tr>
                            </th>
                            <td>
                                {itinerary.start_time} <br />
                                <hr />
                                {itinerary.address}
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

        )
    }



}

export default Itinerary;
