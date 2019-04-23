import React from 'react';
import axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Progress } from 'reactstrap';
import sos from '../images/sos.jpg'

class Sos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            value: 0,
            message: "",
            disabled: false,
            contact: [],

            latitude: localStorage.getItem('latitude'),
            longitude: localStorage.getItem('longitude'),
            token: localStorage.getItem('token')
        };
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
            })
            console.log(response)
        })

    }

    reset() {
        this.setState({
            value: 0,
            message: "",
        })
    }

    close = () => {
        this.setState({ modal: false })
        this.reset();
    }

    open = () => {
        if (this.state.disabled === false) {
            this.setState({ modal: true })
            this.timeout();
        }
    }

    contact_emergency = (event) => {
        this.close()
        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/v1/sos/',
            withCredentials: false,
            headers: {
                'Authorization': `Bearer ${this.state.token}`,
                'Content-Type': 'application/json',
            },
            data: {
                latitude: this.state.latitude,
                longitude: this.state.longitude
            }
        }).then(response => {
            if (response.data.status === "success") {
                console.log('Aunty is asking for help dy!!')
            } else {
                console.log("Sorry, Aunty can't find your friend")
            };
        })
    }

    timeout = () => {
        this.setState({ disabled: true })
        setTimeout(() => {
            if (this.state.modal === true) {
                this.setState({ modal: false })
                console.log('Aunty is contacting your friend')
                this.contact_emergency();
            }
        }, 7000);

        setTimeout(() => {
            this.setState(prevState => ({
                value: prevState.value + 15,
                message: ""

            }))
        }, 1000)
        setTimeout(() => {
            this.setState(prevState => ({
                value: prevState.value + 15,
                message: "Response ASAP"

            }))
        }, 2000)
        setTimeout(() => {
            this.setState(prevState => ({
                value: prevState.value + 15,

            }))
        }, 3000)
        setTimeout(() => {
            this.setState(prevState => ({
                value: prevState.value + 15,
                message: "Aunty is worried!!"
            }))
        }, 4000)
        setTimeout(() => {
            this.setState(prevState => ({
                value: prevState.value + 15,
            }))
        }, 5000)
        setTimeout(() => {
            this.setState(prevState => ({
                value: prevState.value + 15,
                message: "Aunty is finding your friend!"

            }))
        }, 6000)
        setTimeout(() => {
            this.setState(prevState => ({
                value: prevState.value + 15,
                disabled: false
            }))
        }, 7000)

        this.reset();

    }


    render() {
        return (
            <div height="100%">
                <br /> <br />
                <img id='sosButton' className='my-auto' src={sos} onClick={this.open} width='100%' />
                <div>
                    <p>Name: {this.state.contact.name}</p>
                    <p>Relationship: {this.state.contact.relationship}</p>
                    <p>Phone Number: {this.state.contact.phone_number}</p>
                </div>

                <Modal isOpen={this.state.modal} toggle={this.close}>
                    <ModalHeader toggle={this.close}>Are you in danger?</ModalHeader>
                    <ModalBody>
                        Do you want Aunty to contact your friend?
                        <p></p>
                        <Progress striped color="danger" value={this.state.value}>{this.state.message}</Progress>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.contact_emergency}>Yes</Button>{' '}
                        <Button color="secondary" onClick={this.close}>No</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}



export default Sos;