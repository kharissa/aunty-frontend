import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import axios from 'axios';

class CreatePin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            autoFocus: true,
            name: '',
            is_safe: false,
            category: 'none',
            is_public: true,
            modalType: false,
        };
    }

    handleInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        // console.log(this.state)
    }

    handleSafeOrDanger = () => {
        this.setState(prevState => ({
            is_safe: !prevState.is_safe
        }));
        // console.log(this.state);
    }

    handlePublicOrPrivate = () => {
        this.setState(prevState => ({
            is_public: !prevState.is_public
        }))
    }

    handleCategorySelect = (e) => {
        this.setState({ category: e.target.value })
        // console.log(this.state.category)
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const latitude = this.props.position[0].toFixed(6)
        const longitude = this.props.position[1].toFixed(6)
        const token = localStorage.getItem('token');


        axios({
            method: 'post',
            url: 'https://gokaikai.herokuapp.com/api/v1/pins/map/',
            'headers': {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            data: {
                pinName: this.state.name,
                userId: localStorage.getItem('userId'),
                latitude: latitude,
                longitude: longitude,
                category: this.props.category,
                isSafe: this.props.is_safe,
                isPublic: this.props.is_public,
                radius: 3,
                source: 'User'
            }
        }).then(response => {
            if (response.data.status === "success") {
                console.log('pin created!');
            } else {
                console.log('ohnoes.');
            }
        }).catch(error => {
            console.log(error);
        })

        console.log(this.state);
    }

    render() {
        const closeBtn = <button className="close" onClick={this.props.toggleModal}>
            &times;
            </button>;

        return (
            <>
                <Modal isOpen={this.props.modal} toggle={this.props.toggleModal}>
                    <ModalHeader className="create-pin-head" toggle={this.toggleModal} close={closeBtn}>
                    Create a Pin
                    </ModalHeader>
                    <ModalBody>
                        <Form>

                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" onChange={this.handleSafeOrDanger}/>{' '}
                                    Is this a safe place?
                                </Label>
                            </FormGroup>

                            <FormGroup>
                                <Label for="pinName" size="sm">Describe this pin</Label>
                                <Input type="text" id="name" placeholder="" onChange={this.handleInput} />
                                <FormText color="muted">Tell us what's here or what happened at this location.</FormText>
                            </FormGroup>

                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="pinLat">Latitude</Label>
                                        <Input disabled type="text" id="pinLat" placeholder={this.props.position[0]} />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="pinLng">Longitude</Label>
                                        <Input disabled type="text" id="pinLng" placeholder={this.props.position[1]} />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <FormGroup>
                                <Label for="selectCat">Category</Label>
                                <Input type="select" id="selectCat" value={this.state.category} onChange={this.handleCategorySelect}>
                                { this.state.is_safe === false ?
                                    <>
                                        <option value="">Select a category</option>
                                        <option value="Harassment">Harassment</option>
                                        <option value="Hate Crime">Hate Crime</option>
                                        <option value="Assault">Assault</option>
                                        <option value="Theft">Theft</option>
                                        <option value="Shooting">Shooting</option>
                                    </>
                                :
                                    <>
                                        <option value="">Select a category</option>
                                        <option value="Home/Safe House">Home/Safe House</option>
                                        <option value="Hotel">Hotel</option>
                                        <option value="Hospital">Hospital</option>
                                        <option value="Police Presence">Police Presence</option>
                                    </>
                                }
                                </Input>
                            </FormGroup>

                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" onChange={this.handlePublicOrPrivate} />{' '}
                                    Private pin
                                </Label>
                            </FormGroup>

                        </Form>
                    </ModalBody>

                    <ModalFooter>
                        <Button form="createPin" onClick={this.handleSubmit}>Submit</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default CreatePin;
