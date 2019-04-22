import React, { Component } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import axios from 'axios';
import { withToastManager } from 'react-toast-notifications';

class CameraCall extends Component {
  onTakePhoto(dataUri) {
    // creates image tag with datauri
    var image = new Image();
    image.src = dataUri + '=='
    console.log(image.src)
    document.body.appendChild(image);

    // TODO: display screenshot
    // TODO: get user to confirm image

    // Send dataURI to backend
    const { toastManager } = this.props;
    const token = localStorage.getItem('token')
    axios({
      method: 'POST',
      url: 'https://gokaikai.herokuapp.com/api/v1/images/',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: {
        dataUri: dataUri
      }
    })
      .then(response => {
        console.log(response)
        toastManager.add('Aunty successfully analysed your photo.', {
          appearance: 'success',
          autoDismiss: true
        });
        localStorage.setItem('update', true);
        localStorage.setItem('updateImageId', response.data.imageId);
      })
      .catch(error => {
        console.log(error);

        toastManager.add('Unfortunately there was an error in uploading your photo. ', {
          appearance: 'error',
          autoDismiss: true,
        });
      })

  }

  render() {
    return (
      <div className="CameraCall">
        <Camera
          onTakePhoto={(dataUri) => { this.onTakePhoto(dataUri); }}
          idealResolution={{ width: 480, height: 800 }}
        />
      </div>
    );
  }
}

export const CameraToasts = withToastManager(CameraCall);