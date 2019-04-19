import React from 'react'
import axios from 'axios'
import { Table } from 'reactstrap';

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        axios({
            method: 'GET',
            url: 'http://localhost:5000/api/v1/users/me/',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            this.setState({
                user: response.data
            })
            console.log(this.state.user)
        })

    }

    convertTime() {

        { this.state.user.dob }
    }



    render() {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Personal Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">First Name</th>
                        <td>{this.state.user.first_name}</td>

                    </tr>
                    <tr>
                        <th scope="row">Last Name</th>
                        <td>{this.state.user.last_name}</td>
                    </tr>
                    <tr>
                        <th scope="row">Date Of Birth</th>
                        <td>{this.state.user.dob}</td>
                    </tr>
                    <tr>
                        <th scope="row">First Language</th>
                        <td>{this.state.user.language_primary}</td>
                    </tr>
                    <tr>
                        <th scope="row">Second Language</th>
                        <td>{this.state.user.language_secondary}</td>
                    </tr>
                    <tr>
                        <th scope="row">First Language</th>
                        <td>{this.state.user.language_primary}</td>
                    </tr>
                    <tr>
                        <th scope="row">First Language</th>
                        <td>{this.state.user.language_primary}</td>
                    </tr>
                </tbody>
            </Table>
        )
    }

}

export default Setting;