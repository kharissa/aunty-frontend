import React from 'react';
import { Navbar, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import aunty from '../images/aunty.png';
import siren from '../images/police.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class Navigation extends React.Component {
    render() {
        return (
            <div>
                <Navbar fixed="bottom" style={{ backgroundColor: 'orange',}}>
                    <Col xs='2' md="1" style={{ textAlign: 'center' }}>
                        <NavLink to="/call">
                            <FontAwesomeIcon icon="phone-volume" color='black' size="2x" />
                        </NavLink>
                    </Col>
                    <Col xs='2' md="1" style={{ textAlign:'center' }}>
                        <NavLink to="/map">
                            <FontAwesomeIcon icon="map-marked-alt" color='black' size="2x" />
                        </NavLink>
                    </Col>
                    <Col xs='2' md="1" >
                        <NavLink to="/chat" >
                            <div style={{justifyContent:'left'}}>
                            <img className='auntyIcon' src={aunty} alt='aunty' height={65} />
                            </div>
                        </NavLink>
                    </Col>
                    <Col xs='3' md="1" style={{ textAlign:'center'}}>
                        <NavLink to="/setting" >
                            <FontAwesomeIcon icon="sliders-h" color='black' size="2x" />
                        </NavLink>
                    </Col>
                    <Col xs='2' md="1" style={{justifyContent:'left'}}>
                        <NavLink to="/sos" >
                        <div style={{justifyContent:'left'}}>
                            <img className='sirenIcon' src={siren} alt='siren' height={40}/>
                        </div>
                        </NavLink>
                    </Col>
                </Navbar>
            </div>
        );
    }
}
