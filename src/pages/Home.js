import React from "react";
import { Link } from 'react-router-dom';

class Homepage extends React.Component {
    render() {
        return (
            <div>
            <Link to="/chat">Chat with Aunty</Link> <br />
            <Link to="/mapy">Yong's Map</Link> <br />
            <Link to="/mapj">Jade's Map</Link> <br /> <br />
            <p>This is the home page. <br/>Wait ah, Aunty still building.</p>
            </div>
        )
    }
}

export default Homepage;