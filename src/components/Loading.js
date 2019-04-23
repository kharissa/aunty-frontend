import React from 'react';
import dots from '../images/dots.gif';

const Loading = (props) => (
    <img style = {{width: props.width, height: props.height}}
        src = {dots}
        alt = "loading..." />
)

export default Loading;