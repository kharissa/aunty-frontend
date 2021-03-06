import React from "react";
import LoginModal from '../containers/LoginModal'
import aunty from '../images/aunty.png';
import {Row, Col, Button} from 'reactstrap';
import { Redirect } from "react-router-dom";

class Homepage extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          modal: false,
          login: false,
          register: false
      };
  }

    showModal = () => {
        this.setState(() => ({
            modal: true
        }));
    }
    
    hideModal = () => {
        // This is a hacky solution to apply slide-out animation to a specific motion (close out of a reactstrap modal). Although it works, it is not recommended. We can remove this if we only want slide-in motion.
        document.querySelector(".modal.right .modal-dialog").style.animation = "slide-out 1.5s forwards"
        setTimeout(() => {
            this.setState(() => ({
                modal: false,
                login: false,
                register: false,
            }));
        }, 1000);
        
    }

    showLogin = () => {
        this.setState({
          login: true,
          register: false
        });
        this.showModal();
    }

    showRegister = () => {
        this.setState({
            register: true,
            login: false
        })
        this.showModal();
    }

    handleRedirect() {
        if (localStorage.getItem('token')) {
            return <Redirect to="/" />
        }
    }

    render() {
        return (
                <div className='Login-page' style={{backgroundColor:'#FFA205', backgroundSize: 'Cover'}}>
                        <Row style={{justifyContent:'center', alignSelf:'center', padding: "10px"}}>
                                <img src={aunty} alt='AuntyKaiKai' className='AuntyKaiKai' style={{height:"250px"}}/>
                        </Row>
                    <div style={{padding:'40px', color:'#124e78', fontWeight:'bold'}}>
                        <span style={{fontSize:'40px'}}>GO GAI GAI </span> <br/>
                        <span style={{fontSize:'20px'}}> with Aunty</span>
                    </div>
                    <Col style={{padding:'10px', justifyContent:'center'}}>
                        <div>
                            <Button style={{backgroundColor:'#124e78', borderRadius:'25px', width:'40%', margin:'10px'}} onClick={this.showRegister}>Register</Button>
                        </div>
                        <div>
                            <Button style={{backgroundColor:'#124e78', borderRadius:'25px',width:'40%', margin:'10px', marginBottom:'300px'}} onClick={this.showLogin}>Login</Button>
                        </div>
                        <LoginModal isOpen={this.state.modal} show={this.showModal} login={this.state.login} hide={this.hideModal} register={this.state.register} showLogin={this.showLogin} showRegister={this.showRegister}/>
                    </Col>
                    { this.handleRedirect() }
                </div>
        )
    }
}

export default Homepage;

