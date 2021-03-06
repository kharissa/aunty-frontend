import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import LoginModal from '../containers/LoginModal'

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            loggedIn: true,
        };
        this.showModal = this.showModal.bind(this);
    }

    componentDidMount = () => {
        const token = localStorage.getItem('token')
        if (!token) {
            this.setState({
                loggedIn: false
            }) 
        }
    }

    showModal = () => {
        // This is a hacky solution to apply slide-out animation to a specific motion (close out of a reactstrap modal). Although it works, it is not recommended. We can remove this if we only want slide-in motion.
        if (this.state.modal) {
            document.querySelector(".modal.right .modal-dialog").style.animation = "slide-out 1.5s forwards"
            setTimeout(() => {
                this.setState(prevState => ({
                    modal: !prevState.modal
                }));
            }, 1000);
        } else {
            this.setState(prevState => ({
                modal: !prevState.modal
            }));
        }
    }

    handleRedirect = () => {
        if (this.state.loggedIn === false) {
            return <Redirect to="/login" />
        }
    }

    render() {
        return (
            <div>
                <Link to="/chat">Chat with Aunty</Link> <br />
                <Link to="/geolocation">Geolocation</Link> <br />
                <Link to="/map">Map</Link> <br /> <br />
                <Link to="/setting">Setting</Link> <br /> <br />
                <Button outline color="primary" onClick={this.showModal}>Register / Login</Button>
                <p>This is the home page. <br />Wait ah, Aunty still building.</p>
                <LoginModal isOpen={this.state.modal} toggle={this.showModal} />
                { this.handleRedirect() }
            </div>
        )
    }
}

export default Homepage;