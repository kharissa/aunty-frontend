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
        message: 'Welcome lah! What your name?',
        trigger: '2',
    }, {
        id: '2',
        user: true,
        trigger: '3',
    }, {
        id: '3',
        message: 'Hi {previousValue}, nice to meet you!',
        end: true,
    },
];

export default class Chat extends React.Component {

  render(){
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