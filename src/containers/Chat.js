import React from 'react'
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';

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

const steps = [
    {
        id: '1',
        message: 'Hallo hallo {{user}}! Aunty here. How are you?',
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
        options: [
            { value: "Tell Aunty where I'm going so she can check on me", label: "Aunty, I'm going out today!", trigger: '5' },
            { value: 'Get on a call with Aunty', label: 'Aunty, lai! We chit chat together gether.', trigger: '22' },
            { value: 'Ask Aunty where the nearest safe spot is', label: "Aunty, I don't feel safe here. Where's the nearest, safest place to go?", trigger: '23' },
            { value: 'Let Aunty scan your location for danger', label: "Aunty, I don't feel safe, can you look around for me?", trigger: '24' },
        ],
    }, {
        id: '5',
        message: 'Where are you going?',
        trigger: '6',
    }, {
        id: '6',
        user: true,
        trigger: '7',
    }, {
        id: '7',
        message: 'Is it this one ah? {previousValue}',
        trigger: '8',
    }, {
        id: '8',
        options: [
            { value: 'Ya, ya, correct.', label: 'Ya, ya, correct.', trigger: '9' },
            { value: "No, that's not the right location.", label: "No, that's not the right location.", trigger: '5' },
        ],
    }, {
        id: '9',
        message: 'When you going? What time?',
        trigger: '10',
    }, {
        id: '10',
        user: true,
        trigger: '11'
    }, {
        id: '11',
        message: 'You going with who?',
        trigger: '12',
    }, {
        id: '12',
        options: [
            { value: 'By myself', label: 'By myself', trigger: '13' },
            { value: "With people lah.", label: "With people lah.", trigger: '16' },
        ],
    }, {
        id: '13',
        message: 'Wah, you syok sendiri! Bojio Aunty ):',
        trigger: '14',
    }, {
        id: '14',
        user: true,
        trigger: '15'
    }, {
        id: '15',
        message: 'Joking only lah. Aunty will text you later at {{time}}. If anything you call Aunty. Enjoy!',
        end: true,
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
        message: 'Oh ya, I know the mother. You all enjoy and be safe!',
        trigger: '19',
    }, {
        id: '19',
        message: 'You got go anywhere else?',
        trigger: '20',
    }, {
        id: '20',
        options: [
            { value: 'Yes', label: 'Yes', trigger: '5' },
            { value: 'No', label: 'No', trigger: '21' },
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
    }
];

export default class Chat extends React.Component {

    render() {
        return (
            <ThemeProvider theme={theme}>
                <ChatBot
                    headerTitle="Chat with Aunty"
                    recognitionEnable={true}
                    speechSynthesis={{ enable: true, lang: 'en' }}
                    steps={steps}
                />
            </ThemeProvider>
        )
    }
}