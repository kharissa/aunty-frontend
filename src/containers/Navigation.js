import React from 'react';
import {Navbar,Col} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import aunty from '../images/aunty.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class Navigation extends React.Component {


    render() {
        return (
            <div>
                <Navbar fixed="bottom" style={{backgroundColor:'White'}}>
                        <Col xs="2" md={{ span: 1, offset: 1 }} style={{textAlign:'center'}}>
                            <NavLink to="/call" activeClassName='activeIcon'>
                                <FontAwesomeIcon icon="phone-volume" color='black' size="2x" />
                            </NavLink>
                        </Col>
                        <Col xs="2" md="1" style={{textAlign:'center'}}>
                            <NavLink to="/map" activeClassName='activeIcon'>
                                <FontAwesomeIcon icon="map-marked-alt" color='black' size="2x" />
                            </NavLink>
                        </Col>
                        <Col>
                            <NavLink xs="2" md="2" to="/chat" >
                                <img className='auntyIcon' src={aunty} alt='aunty' height={100}/>
                            </NavLink>  
                        </Col>
                        <Col xs="2" md="1" style={{textAlign:'center'}}>
                            <NavLink to="/settings" activeClassName='activeIcon' >
                                <FontAwesomeIcon icon="sliders-h" color='black' size="2x"/>
                            </NavLink>
                        </Col>
                        <Col xs="2" md="1" style={{textAlign:'center'}}>
                                <FontAwesomeIcon icon="bell" color='black' size="3x" />
                        </Col>
                </Navbar>             
            </div>
        );
    }
}



// I need to write code to hide navbar on home page, once user logs in, they should land at the chat page!
// May also need to hide naviation bar while in fake call