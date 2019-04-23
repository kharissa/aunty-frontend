import React, { Component } from 'react';
import Camera, { IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import axios from 'axios';
import { Button, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { withToastManager } from 'react-toast-notifications';

class CameraCall extends Component {
  state = {
    onConfirm: false,
    image: '',
    redirect: false
  }

  onTakePhoto = (dataUri) => {
    this.setState({
      onConfirm: true,
      dataUri: dataUri
    })
  }

  handleSubmit = () => {
    const { toastManager } = this.props;
    const token = localStorage.getItem('token')
    axios({
      method: 'POST',
      url: 'https://gokaikai.herokuapp.com/api/v1/images/',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: {
        dataUri: this.state.dataUri
      }
    })
      .then(response => {
        console.log(response)
        toastManager.add('Aunty successfully analysed your photo. Redirecting to chat...', {
          appearance: 'success',
          autoDismiss: true
        });
        localStorage.setItem('update', true);
        localStorage.setItem('updateImageId', response.data.imageId);
        this.setState({
          redirect: true
        })
      })
      .catch(error => {
        console.log(error);
        toastManager.add('Unfortunately there was an error in uploading your photo. ', {
          appearance: 'error',
          autoDismiss: true,
        });
      })
  }

  handleReject = () => {
    this.setState({
      onConfirm: false
    })
  }

  handleRedirect() {
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
  }

  render() {
    const { onConfirm, dataUri } = this.state;
    return (
      <div>{
        onConfirm ?
          <div style={{ position: 'relative' }} >
            <img src={`${dataUri}`} height="650" />
            <Button color="success" onClick={this.handleSubmit} style={{ position: 'absolute', bottom: '20px', left: '80px' }} >Submit</Button>
            <Button color="danger" onClick={this.handleReject} style={{ position: 'absolute', bottom: '20px', right: '80px' }} >Retake</Button>
          </div>
          :
          <div>
            <Camera
              onTakePhoto={(dataUri) => { this.onTakePhoto(dataUri); }}
              idealResolution={{ width: 411, height: 650 }}
              isSilentMode={true}
              imageType={IMAGE_TYPES.JPG}
            />
          </div>
      }
        {this.handleRedirect()}
      </div>
    );
  }
}

export const CameraToasts = withToastManager(CameraCall);