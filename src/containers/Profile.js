import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { Table, Button, Input, } from 'reactstrap';


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            user: [],
            dob: '',
            first_name: '',
            last_name: '',
            nationality: '',
            firstLanguage: '',
            secondLanguage: '',
            passportNum: '',
        }
    }

    convertDate = () => {
        let datetime = moment(this.state.dob).format('LL')
        this.setState({ dob: datetime })
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
                user: response.data,
                dob: response.data.dob,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                firstLanguage: response.data.language_primary,
                secondLanguage: response.data.language_secondary,
                passportNum: response.data.passport_num,
                nationality: response.data.nationality
            })
            this.convertDate();
        })
    }

    handleEdit = (event) => {
        event.preventDefault();
        this.setState({
            disabled: !this.state.disabled,
        })
    }

    handleSave = (event) => {
        const token = localStorage.getItem('token');
        this.setState({
            disabled: !this.state.disabled,
        })
        event.preventDefault();
        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/v1/users/update/',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                firstName: this.state.first_name,
                lastName: this.state.last_name,
                dateOfBirth: this.state.dob,
                firstLanguage: this.state.firstLanguage,
                secondLanguage: this.state.secondLanguage,
                passportNum: this.state.passportNum
            }
        }).then(response => {
            if (response.data.status === "success") {
                console.log(response)
            }
        })
            .catch(error => {
                console.log(error);
            })
    }



    render() {
        let { disabled } = this.state;
        let submitButton = disabled === false
            ? <Button type='submit' size='sm' outline color='danger' className='float-right' onClick={this.handleSave}>Save</Button>
            : <Button outline color='primary' size='sm' className='float-right' onClick={this.handleEdit}>Edit</Button>
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Personal Details</th>
                        <th>{submitButton}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">First Name</th>
                        <td><Input id='edit' type='text' value={this.state.first_name} disabled={this.state.disabled} onChange={e => this.setState({ first_name: e.target.value })} /></td>
                    </tr>
                    <tr>
                        <th scope="row">Last Name</th>
                        <td><Input id='edit' value={this.state.last_name} disabled={this.state.disabled} onChange={e => this.setState({ last_name: e.target.value })} /></td>
                    </tr>
                    <tr>
                        <th scope="row">Date Of Birth</th>
                        <td><Input id='edit' value={this.state.dob} disabled onChange={e => this.setState({ dob: e.target.value })} /></td>
                    </tr>
                    <tr>
                        <th scope="row">First Language</th>
                        <td><Input id='edit' value={this.state.firstLanguage} disabled={this.state.disabled} onChange={e => this.setState({ firstLanguage: e.target.value })} />
                        </td>
                    </tr>

                    <tr>
                        <th scope="row">Second Language</th>
                        <td><Input id='edit' value={this.state.secondLanguage} disabled={this.state.disabled} onChange={e => this.setState({ secondLanguage: e.target.value })} /></td>
                    </tr>
                    <tr>
                        <th scope="row">Nationality</th>
                        <td><Input id='edit' value={this.state.nationality} disabled onChange={e => this.setState({ nationality: e.target.value })} /></td>
                    </tr>
                    <tr>
                        <th scope="row">Passport Number</th>
                        <td><Input id='edit' value={this.state.passport_num} disabled={this.state.disabled} onChange={e => this.setState({ passport_num: e.target.value })} /></td>
                    </tr>
                </tbody>
            </Table >
        )
    }



}

export default Profile;
