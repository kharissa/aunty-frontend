import React, { Component } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

// if you haven't already, install the SDK with "npm install sightengine --save"
const sightengine = require('sightengine')('1488674501', 'MNUAMHgQDk38P5FCTRRp');

export default class CameraCall extends Component {
  onTakePhoto(dataUri) {
    console.log(dataUri)

    // creates image tag with datauri
    // TODO: display screenshot
    // TODO: get user to confirm image
    var image = new Image();
    image.src = dataUri
    document.body.appendChild(image);

    // Send dataURI to backend
    axios({
      method: 'POST',
      url: 'https://gokaikai.herokuapp.com/api/v1/images/',
      data: {
        token: localStorage.getItem('token'),
        dataUri: dataUri
      }
    })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error);
        const message = error.data.message;
        toastManager.add(`Something went wrong: "${message}"`, {
          appearance: 'error',
        });
      })

  }

  // const binary_image = dataUri
  // sightengine.check(['nudity', 'wad', 'celebrities', 'offensive', 'faces', 'scam', 'face-attributes']).set_bytes(binary_image).then(function (result) {
  //   // The API response (result)
  //   console.log('sightengineresult: ' + result)
  //   console.log(result)
  // }).catch(function (err) {
  //   // Handle error
  //   console.log('sightengine error: ' + err)
  // });
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