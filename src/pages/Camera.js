import React, { Component } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import axios from 'axios';

export default class CameraCall extends Component {
  onTakePhoto(dataUri) {
    // creates image tag with datauri
    var image = new Image();
    image.src = dataUri + '=='
    console.log(image.src)
    document.body.appendChild(image);

    // TODO: display screenshot
    // TODO: get user to confirm image

    // Send dataURI to backend
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
      })
      .catch(error => {
        console.log(error);
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