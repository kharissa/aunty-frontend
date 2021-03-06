import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import { Container } from 'reactstrap';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import { Redirect } from 'react-router-dom';
import ItinerarySearch from '../containers/ItinerarySearch';
import ImageReview from '../containers/ImageReview';
import ItineraryConfirm from '../containers/ItineraryConfirm';
import { Link } from 'react-router-dom';

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
    botBubbleColor: '#FFA205',
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
        call: false,
        update: false,
    }

    componentDidMount = () => {

        if (!localStorage.getItem('token')) {
            this.setState({
                loggedIn: false,
            })
        } else if (localStorage.getItem('update')) {
            this.setState({
                firstName: localStorage.getItem('firstName'),
                loading: false,
                update: true,
            })
        } else {
            this.setState({
                firstName: localStorage.getItem('firstName'),
                loading: false
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
            return <Redirect to="/login" />
        } else if (this.state.call === true) {
            return <Redirect to="/call" />
        }
    }

    render() {
        const loader = <div>Loading...</div>
        const steps = [{
            id: 'welcome',
            message: `Hallo ${this.state.firstName}! How can Aunty help you?`,
            trigger: () => this.state.update ? 'update' : 'menu'
        }, {
            id: 'update',
            component: (
                <ImageReview />
            ),
            metadata: {
                image_id: localStorage.getItem('updateImageId')
            },
            asMessage: true,
            trigger: 'need more help'
        }, {
            id: 'need more help',
            message: 'Need anything else?',
            trigger: 'need more help options'

        }, {
            id: 'need more help options',
            options: [
                { value: 'Yes', label: 'Yes', trigger: 'menu' },
                { value: 'No', label: 'No', trigger: '21' },
            ],
        }, {
            id: 'menu',
            options: [{
                value: "Set itinerary for check ins",
                label: "Set itinerary for check ins",
                trigger: '5'
            },
            {
                value: 'Call Aunty',
                label: 'Call Aunty',
                trigger: '22'
            },
            {
                value: 'Find safe locations',
                label: "Find safe locations",
                trigger: '23'
            },
            {
                value: 'Scan my area',
                label: "Scan my area",
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
                <ItinerarySearch />
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
                value: 'Confirm lah',
                label: 'Confirm lah',
                trigger: '11'
            }]
        }, {
            id: '11',
            message: 'You going with who?',
            trigger: 'itineraryDetails',
        }, {
            id: 'itineraryDetails',
            options: [{
                value: 'By myself',
                label: 'By myself',
                trigger: '13'
            },
            {
                value: "With people lah",
                label: "With people lah",
                trigger: '16'
            },
            ],
        }, {
            id: '13',
            message: (({ previousValue }) => {
                localStorage.setItem('itineraryDetails', previousValue);
                return 'Wah, you syok sendiri! Never call Aunty ):'
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
                <ItineraryConfirm />
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
            message: 'Ok ok. Then come see Aunty lah!',
            end: true,
        }, {
            id: '22',
            message: (() => {
                this.setState({
                    call: true,
                });
                return 'Aunty will call you now!'
            }),
            end: true,
        }, {
            id: '23',
            component: (
                <Link to="/map">View on the map</Link>
            ),
            end: true,
        }, {
            id: '24',
            component: (
                <Link to="/call">Video call with Aunty</Link>
            ),
            end: true,
        }];
        return (
            <Container>
                {
                    this.state.loading || this.state.firstName.length === 0 ?
                        loader
                        :
                        <ThemeProvider theme={theme}>
                            <ChatBot
                                hideHeader={true}
                                headerTitle="Chat with Aunty"
                                recognitionEnable={true}
                                // speechSynthesis={{ enable: true, lang: 'en' }}
                                steps={steps}
                            />
                        </ThemeProvider>
                }
                {this.handleRedirect()}
            </Container>
        )
    }
}
