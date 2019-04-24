import React from 'react';
import { Modal, ModalHeader, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import Register from './Register'
import Login from './Login'
import { withToastManager } from 'react-toast-notifications';

const RegisterToasts = withToastManager(Register);
const LoginToasts = withToastManager(Login);

export default class LoginModal extends React.Component {
  constructor(props) {
    super(props);
  }

  // Change state of active tab in order to switch between tabs
  switch(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  // handleLogin = () => {
  //   if (this.props.login == true) {
  //     this.switch('2')
  //   }
  // }

  // handleRegister = () => {
  //   if (this.props.register == true) {
  //     this.switch('1')
  //   }
  // }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        modalClassName="right"
        fade={false}
        style={{ color: "#000080" }}
      >
        <ModalHeader toggle={this.props.hide}>
          <Nav tabs>
            <NavItem>
              <NavLink
                className="Register"
                className={classnames({
                  active: this.props.register
                })}
                onClick={() => {
                  this.props.showRegister();
                }}
              >
                Register
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.props.login
                })}
                onClick={() => {
                  this.props.showLogin();
                }}
              >
                Login
              </NavLink>
            </NavItem>
          </Nav>
        </ModalHeader>
        <TabContent activeTab={this.props.login ? "2" : "1"}>
          <TabPane tabId="1">
            <RegisterToasts toggle={this.props.showRegister} />
          </TabPane>
          <TabPane tabId="2">
            <LoginToasts toggle={this.props.showLogin} />
          </TabPane>
        </TabContent>
        {/* { this.handleLogin() }
        { this.handleRegister() } */}
      </Modal>
    );
  }
}