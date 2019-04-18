import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CreatePin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            autoFocus: true,
            name: '',
            description: '',
            longitude: '',
            latitude: '',
            is_safe: false,
            category: '',
            radius: '',
            is_public: true,
        };
    }

    handleInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        // axios({
        //     // POST to API with Pin Da
        // })
        console.log(this.state);
    }
    render() {

        const closeBtn = <button className="close" onClick={this.props.toggleModal}>
            &times;
            </button>;

        return (
            <div>
                <Modal isOpen={this.props.modal} toggle={this.props.toggleModal} className={this.props.className}>
                    <ModalHeader className="modal-head" toggle={this.toggleModal} close={closeBtn}>

                    </ModalHeader>
                    <ModalBody>
                        {this.props.position.join(", ")}
                    </ModalBody>
                    <ModalFooter>

                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default CreatePin;
