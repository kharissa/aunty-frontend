import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import * as serviceWorker from './serviceWorker';

import { geolocated } from 'react-geolocated';

import Geoloc from './containers/Geoloc'

class Main extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello world!</h1>
                <p>{this.props.coords && this.props.coords.latitude}</p>
                <Geoloc {...this.props} />
            </div>
        );
    }
}

const MainWithGeoloc = geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Main);

ReactDOM.render(<MainWithGeoloc />, document.getElementById('root'));

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
