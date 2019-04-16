import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios'
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import { Redirect } from 'react-router-dom'

const format = 'YYYY-MM-DD HH:mm';
const now = moment().hour(0).minute(0);

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

    handleTime = (value) => {
        this.setState({
            itineraryTime: value && value.format(format)
        })
        localStorage.setItem('itineraryTime', value.format(format));
    }

    handleRedirect() {
        if (this.state.loggedIn === false) {
            window.alert('Please login to access chat.')
            return <Redirect to = "/" />
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
            message: (({previousValue}) => {
                localStorage.setItem('itineraryDetails', previousValue); 
                return 'Wah, you syok sendiri! Bojio Aunty ):'}),
            trigger: '14',
        }, {
            id: '14',
            message: `Joking only lah. If anything you call Aunty. Enjoy!`,
            trigger: 'reviewItineraryPin'
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
            message: (({previousValue}) => {
                localStorage.setItem('itineraryDetails', 'with ' + previousValue); 
                return 'Oh ya, I know the mother. You all enjoy and be safe!'}),
            trigger: 'reviewItineraryPin',
        }, {
            id: 'reviewItineraryPin',
            component: (
                <ReviewItineraryPin />
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

class ReviewItineraryPin extends React.Component {
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
        
        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/v1/pins/itinerary/',
            data: {
                pinName: location,
                userId: userId,
                longitude: latitude,
                latitude: longitude,
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
        Ok so you are going to {this.state.location} {this.state.description} at {this.state.time}? 
        <br />
        Aunty will check in then, lah!
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
        const googleKey = process.env.REACT_APP_GOOGLE_KEY;
        const input = encodeURIComponent(this.props.steps.itineraryLocation.value.trim())
        const radius = 200000
        const userLat = localStorage.getItem('latitude')
        const userLong = localStorage.getItem('longitude')
        const userLocation = `circle:${radius}@${userLat},${userLong}`
        
        axios({
            method: 'GET',
            url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${input}&inputtype=textquery&fields=formatted_address,name,geometry&locationbias=${userLocation}&key=${googleKey}`,
            withCredentials: false,
            headers: {'Access-Control-Allow-Origin': '*'}
        })
        .then(response => {
            console.log(response)
            if (response.data.candidates) {
                // this.setState({
                //     name: response.data.candidates[0].name,
                //     address: response.data.candidates[0]['formatted_address'],
                //     loading: false
                // })
                // const lat = response.data.candidates[0]['geometry']['location']['lat']
                // const lng = response.data.candidates[0]['geometry']['location']['lng']
                // localStorage.setItem('itineraryLatitude', lat)
                // localStorage.setItem('itineraryLongitude', lng)
                // localStorage.setItem('itineraryLocation', this.state.name);
                this.props.triggerNextStep({ trigger: '8' })
            } else {
                this.setState({
                    error: true,
                    loading: false,
                })
                this.props.triggerNextStep({ trigger: '5' })
            }
        })
        .catch(error => {
            console.log(error);
            this.setState({
                error: true,
                loading: false
            })
            this.props.triggerNextStep({ trigger: '5' })
        }) 
  }

  render() {
    const { name, address, error, loading } = this.state;
    return (
      <div>
          {
            loading 
            ? <p>Searching my phonebook...</p>
            : error 
                ? <p>
                    I don't know where that is! Please try again.
                  </p>
                : <>
                    <p>Is it this one ah?</p>
                    <p><b>{ name }</b></p>
                    <p>{ address }</p>
                  </>
          }
      </div>
    );
  }
}
