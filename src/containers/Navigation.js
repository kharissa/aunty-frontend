import React from 'react';
import { Navbar, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import aunty from '../images/aunty.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class Navigation extends React.Component {
    render() {
        return (
            <div>
                <Navbar fixed="bottom" style={{ backgroundColor: 'White' }}>
                    <Col xs="2" md={{ span: 1, offset: 1 }} style={{ textAlign: 'center' }}>
                        <NavLink to="/call" activeClassName='activeIcon'>
                            <FontAwesomeIcon icon="phone-volume" color='black' size="2x" />
                        </NavLink>
                    </Col>
                    <Col xs="2" md="1" style={{ textAlign: 'center' }}>
                        <NavLink to="/map" activeClassName='activeIcon'>
                            <FontAwesomeIcon icon="map-marked-alt" color='black' size="2x" />
                        </NavLink>
                    </Col>
                    <Col>
                        <NavLink xs="2" md="2" to="/" >
                            <img className='auntyIcon' src={aunty} alt='aunty' height={100} />
                        </NavLink>
                    </Col>
                    <Col xs="2" md="1" style={{ textAlign: 'center' }}>
                        <NavLink to="/setting" activeClassName='activeIcon' >
                            <FontAwesomeIcon icon="sliders-h" color='black' size="2x" />
                        </NavLink>
                    </Col>
                    <Col xs="2" md="1" style={{ textAlign: 'center' }}>
                        <NavLink to="/sos" activeClassName='activeIcon' >
                            <FontAwesomeIcon icon="bell" color='black' size="3x" />
                        </NavLink>
                    </Col>
                </Navbar>
            </div>
        );
    }
}
