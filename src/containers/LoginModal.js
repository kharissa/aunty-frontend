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
    this.switch = this.switch.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  // Change state of active tab in order to switch between tabs
  switch(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} modalClassName="right" fade={false} style={{color:'#000080'}}>
        <ModalHeader toggle={this.props.toggle}>
          <Nav tabs>
            <NavItem>
              <NavLink
                className='Register'
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.switch('1'); }}
              >
                Register
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.switch('2'); }}
              >
                Login
              </NavLink>
            </NavItem>
          </Nav>
        </ModalHeader>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <RegisterToasts toggle={this.props.toggle}/>
          </TabPane>
          <TabPane tabId="2">
            <LoginToasts toggle={this.props.toggle}/>
          </TabPane>
        </TabContent>
      </Modal>
    );
  }
}