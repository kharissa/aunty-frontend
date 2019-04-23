import React from 'react';
import Sound from 'react-sound';
import AuntyCall from '../images/sounds/phonecall.mpeg'
 
export default class PhoneCall extends React.Component {
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
            url={AuntyCall}
            playStatus={this.state.status}
        />
    ); 
  }
}