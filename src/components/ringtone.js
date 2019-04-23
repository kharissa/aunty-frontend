import React from 'react';
import Sound from 'react-sound';
import OldPhoneTone from '../images/sounds/old_phone.mp3'
 
export default class Ringtone extends React.Component {
    state = {
        status: '',
    }

    componentDidMount = () => {
        this.setState({
            status: Sound.status.PLAYING
        })
    }

    componentWillUnmount = () => {
        this.setState({
            status: Sound.status.STOPPED
        })
    }

  render() {
    return (
        <Sound
            url={OldPhoneTone}
            loop={true}
            playStatus={this.state.status}
            playFromPosition={300}
        />
    ); 
  }
}