import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios'
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import { Redirect } from 'react-router-dom'
import GoogleMapsLoader from 'google-maps'

// Setting Google Maps library variables
GoogleMapsLoader.KEY = process.env.REACT_APP_GOOGLE_KEY;
GoogleMapsLoader.LIBRARIES = ['places'];
GoogleMapsLoader.LANGUAGE = 'en';

// Formatting date/time to be saved in local storage
const format = 'YYYY-MM-DD HH:mm';
const now = moment().hour(0).minute(0);

// Setting theme for react-simple-chatbot
const theme = {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#EF6C00',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#EF6C00',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
};

export default class Chat extends React.Component {
    state = {
        loggedIn: true,
        firstName: '',
        loading: true,
        itineraryTime: '',
    }

    componentDidMount = () => {
        this.setState({
            firstName: localStorage.getItem('firstName'),
            loading: false
        })
        if (!localStorage.getItem('token')) {
            this.setState({
                loggedIn: false,
            })
        }
    }

    // Save user's itinerary time input to state and local storage (so it can be retrieved from other component as passing state does not work with react-simple-chatbot custom components)
    handleTime = (value) => {
        this.setState({
            itineraryTime: value && value.format(format)
        })
        localStorage.setItem('itineraryTime', value.format(format));
    }

    // Redirect user to Home page if they are not logged in.
    handleRedirect() {
        if (this.state.loggedIn === false) {
            window.alert('Please login to access chat.')
            return <Redirect to="/" />
        }
    }

    render() {
        const loader = <div>Loading...</div>
        const steps = [{
            id: '1',
            message: `Hallo hallo ${this.state.firstName}! Aunty here. How are you?`,
            trigger: '2',
        }, {
            id: '2',
            user: true,
            trigger: '3',
        }, {
            id: '3',
            message: 'How can Aunty help you today?',
            trigger: '4',
        }, {
            id: '4',
            options: [{
                value: "Tell Aunty where I'm going so she can check on me",
                label: "Aunty, I'm going out today!",
                trigger: '5'
            },
            {
                value: 'Get on a call with Aunty',
                label: 'Aunty, lai! We chit chat together gether.',
                trigger: '22'
            },
            {
                value: 'Ask Aunty where the nearest safe spot is',
                label: "Aunty, I don't feel safe here. Where's the nearest, safest place to go?",
                trigger: '23'
            },
            {
                value: 'Let Aunty scan your location for danger',
                label: "Aunty, I don't feel safe, can you look around for me?",
                trigger: '24'
            },
            ],
        }, {
            id: '5',
            message: 'Where are you going?',
            trigger: 'itineraryLocation',
        }, {
            id: 'itineraryLocation',
            user: true,
            trigger: 'itineraryLocationSearch',
        }, {
            id: 'itineraryLocationSearch',
            component: (
                <SearchItineraryLocation />
            ),
            waitAction: true,
            asMessage: true,
        }, {
            id: '8',
            options: [{
                value: 'Ya, ya, correct.',
                label: 'Ya, ya, correct.',
                trigger: '9'
            },
            {
                value: "No, that's not the right location.",
                label: "No, that's not the right location.",
                trigger: '5'
            },
            ],
        }, {
            id: '9',
            component: (
                <div>
                    <p>When you going? What time?</p>
                    <TimePicker
                        showSecond={false}
                        defaultValue={now}
                        className="xxx"
                        onChange={this.handleTime}
                        format={format}
                        use12Hours
                        inputReadOnly
                    />
                </div>
            ),
            asMessage: true,
            trigger: 'itineraryTime',
        }, {
            id: 'itineraryTime',
            options: [{
                value: 'Time selected.',
                label: 'Time selected.',
                trigger: '11'
            }]
        }, {
            id: '11',
            message: 'You going with who?',
            trigger: 'itineraryDetails',
        }, {
            id: 'itineraryDetails',
            options: [{
                value: 'alone',
                label: 'By myself',
                trigger: '13'
            },
            {
                value: "With people lah.",
                label: "With people lah.",
                trigger: '16'
            },
            ],
        }, {
            id: '13',
            message: (({ previousValue }) => {
                localStorage.setItem('itineraryDetails', previousValue);
                return 'Wah, you syok sendiri! Bojio Aunty ):'
            }),
            trigger: '14',
        }, {
            id: '14',
            message: `Joking only lah. If anything you call Aunty. Enjoy!`,
            trigger: 'ConfirmItineraryPin'
        }, {
            id: '16',
            message: 'Who? Who? Go on a date ah? Aunty kepo...',
            trigger: '17',
        }, {
            id: '17',
            user: true,
            trigger: '18',
        }, {
            id: '18',
            message: (({ previousValue }) => {
                localStorage.setItem('itineraryDetails', 'with ' + previousValue);
                return 'Oh ya, I know the mother. You all enjoy and be safe!'
            }),
            trigger: 'ConfirmItineraryPin',
        }, {
            id: 'ConfirmItineraryPin',
            component: (
                <ConfirmItineraryPin />
            ),
            asMessage: true,
            trigger: '19'
        }, {
            id: '19',
            message: 'You got go anywhere else?',
            trigger: '20',
        }, {
            id: '20',
            options: [{
                value: 'Yes',
                label: 'Yes',
                trigger: '5'
            },
            {
                value: 'No',
                label: 'No',
                trigger: '21'
            },
            ],
        }, {
            id: '21',
            message: 'Ok ok. Come and spend time with Aunty lah.',
            end: true,
        }, {
            id: '22',
            message: '<Link this to a fake call>',
            end: true,
        }, {
            id: '23',
            message: 'Nah, this is the nearest I can find. Open the map and see <Link to map>',
            end: true,
        }, {
            id: '24',
            message: '<Link to "video call"/ camera scan>',
            end: true,
        }];

        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        {
                            this.state.loading || this.state.firstName.length === 0 ?
                                loader
                                :
                                <ThemeProvider theme={theme}>
                                    <ChatBot
                                        headerTitle="Chat with Aunty"
                                        recognitionEnable={true}
                                        speechSynthesis={{ enable: true, lang: 'en' }}
                                        steps={steps}
                                    />
                                </ThemeProvider>
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}

class ConfirmItineraryPin extends React.Component {
    state = {
        location: '',
        description: '',
        time: ''
    };

    componentWillMount() {
        const userId = localStorage.getItem('userId');
        const location = localStorage.getItem('itineraryLocation');
        const time = localStorage.getItem('itineraryTime');
        const description = localStorage.getItem('itineraryDetails');
        const latitude = localStorage.getItem('itineraryLatitude');
        const longitude = localStorage.getItem('itineraryLongitude');

        // Make axios POST request to create itinerary pin 
        axios({
            method: 'POST',
            url: 'https://gokaikai.herokuapp.com/api/v1/pins/itinerary/',
            data: {
                pinName: location,
                userId: userId,
                longitude: parseFloat(latitude),
                latitude: parseFloat(longitude),
                startTime: time,
                description: description
            }
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        this.setState({
            location: location,
            description: description,
            time: time
        })
    }
    render() {
        return (
            <div>
                <p>Ok so you are going to {this.state.location} {this.state.description} at {this.state.time}?</p>
                <p>Aunty will check in then, lah!</p>
            </div>
        );
    }
}

class SearchItineraryLocation extends React.Component {
    state = {
        error: false,
        name: '',
        address: '',
        loading: true
    };
    componentWillMount() {

        // Retrieving user's coords from local storage
        const userLat = parseFloat(localStorage.getItem('latitude'))
        const userLong = parseFloat(localStorage.getItem('longitude'))

        // Radius is set to 100 km / 60 miles around user's location
        const userLocation = { radius: 100000, center: { lat: userLat, lng: userLong } }

        // Request returns location name, coords, and address
        const request = {
            query: this.props.steps.itineraryLocation.value,
            fields: ['name', 'geometry', 'formatted_address'],
            locationBias: userLocation
        }

        GoogleMapsLoader.load((google) => {
            // Creating / attaching a node required to use API
            const map = new google.maps.Map(document.createElement('div'));
            const service = new google.maps.places.PlacesService(map);

            // Sending query text-based request to find place
            service.findPlaceFromQuery(request, (results, status) => {
                if (status === "OK") {
                    this.props.triggerNextStep({ trigger: '8' })
                    this.setState({
                        loading: false,
                        name: results[0]['name'],
                        address: results[0]['formatted_address']
                    })
                    // Must call functions to find lat/lng
                    const lat = results[0]['geometry']['location'].lat().toFixed(6)
                    const lng = results[0]['geometry']['location'].lng().toFixed(6)
                    localStorage.setItem('itineraryLatitude', lat)
                    localStorage.setItem('itineraryLongitude', lng)
                    localStorage.setItem('itineraryLocation', this.state.name);
                } else {
                    this.props.triggerNextStep({
                        trigger: '5'
                    })
                    this.setState({
                        error: true,
                        loading: false,
                    })
                }
            })
        });
    }

    render() {
        const { name, address, error, loading } = this.state;
        return (
            <div> {
                loading
                    ? <p>Searching my phonebook...</p>
                    : error
                        ? <p>
                            I don't know where that is! Please try again.
                    </p>
                        : <div id="result">
                            <p>Is it this one ah?</p>
                            <p><b>{name}</b></p>
                            <p>{address}</p>
                        </div>}
            </div>
        );
    }
}
