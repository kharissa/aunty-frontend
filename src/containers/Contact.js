import React from 'react';
import axios from 'axios';
import { Table, Input, Button } from 'reactstrap';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            contact: [],
            name: '',
            relationship: '',
            phone_number: '',
            email: '',
            contact_id: '',
        }
    }



    componentDidMount() {
        const token = localStorage.getItem('token');
        axios({
            method: 'GET',
            url: 'http://localhost:5000/api/v1/contacts/',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            this.setState({
                contact: response.data.personalContacts[0],
                contact_id: response.data.personalContacts[0].id,
                name: response.data.personalContacts[0].name,
                relationship: response.data.personalContacts[0].relationship,
                phone_number: response.data.personalContacts[0].phone_number,
                email: response.data.personalContacts[0].email,
            })
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
            method: 'PUT',
            url: `http://localhost:5000/api/v1/contacts/12/`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                name: this.state.name,
                relationship: this.state.relationship,
                phoneNumber: this.state.phone_number,
                email: this.state.email
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
                        <th>Contact</th>
                        <th>{submitButton}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Name</th>
                        <td><Input id='edit' type='text' value={this.state.name} disabled={this.state.disabled} onChange={e => this.setState({ name: e.target.value })} /></td>
                    </tr>
                    <tr>
                        <th scope="row">Relationship</th>
                        <td><Input id='edit' type='text' value={this.state.relationship} disabled={this.state.disabled} onChange={e => this.setState({ relationship: e.target.value })} /></td>
                    </tr>
                    <tr>
                        <th scope="row">Phone Number</th>
                        <td><Input id='edit' type='text' value={this.state.phone_number} disabled={this.state.disabled} onChange={e => this.setState({ phone_number: e.target.value })} /></td>
                    </tr>
                    <tr>
                        <th scope="row">Email</th>
                        <td><Input id='edit' type='text' value={this.state.email} disabled={this.state.disabled} onChange={e => this.setState({ email: e.target.value })} /></td>
                    </tr>
                </tbody>
            </Table>

        )
    }



}

export default Contact;
