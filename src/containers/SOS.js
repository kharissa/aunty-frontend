import React from 'react'
import { Button, Form } from 'reactstrap';

class Sos extends React.Component {
    state = {
        latitude: this.props.my_lat,
        longtitude: "",
    }


    handleSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        console.log(this.props.my_lat)

        return (
            <Form onSubmit={this.handleSubmit}>
                <p>{this.props.my_lat}</p>
                <Button type="submit" color="danger" className="button" size="lg">SOS</Button>
            </Form >
        )
    }
}

export default Sos;