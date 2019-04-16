import React from "react";
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import Modal from '../containers/Modal'

class Homepage extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          modal: false
      };
      this.showModal = this.showModal.bind(this);
  }

    showModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <div>
            <Link to="/chat">Chat with Aunty</Link> <br />
            <Link to="/geolocation">Geolocation</Link> <br />
            <Link to="/mapj">Jade's Map</Link> <br /> <br />
            <Button outline color="primary" onClick={this.showModal}>Register / Login</Button>
            <p>This is the home page. <br/>Wait ah, Aunty still building.</p>
            <Modal isOpen={this.state.modal} toggle={this.showModal}/>
            </div>
        )
    }
}

export default Homepage;