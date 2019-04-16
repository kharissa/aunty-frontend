import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CreatePinModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            autoFocus: true,
        };
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

export default CreatePinModal;
