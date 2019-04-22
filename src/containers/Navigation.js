import React from 'react';
import {
    Navbar,
    Nav,
    NavItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Navigation extends React.Component {

    render() {
        return (
            <div>
                <Navbar light color="light" fixed="bottom" className="nav-fill justify-content-around">
                    <Nav>
                        <NavItem>
                            <Link className="nav-link" to="/chat"><i className="fa fa-comment-dots" /></Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/map"><i className="fa fa-map-marker-alt" /></Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/"><i className="fa fa-calendar-alt" /></Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/"><i className="fa fa-sliders-h" /></Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/sos"><i className="fa fa-bell" /></Link>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}