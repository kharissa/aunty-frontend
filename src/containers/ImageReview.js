import axios from 'axios'
import React from 'react';

export default class ImageReview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        weapon: false,
        alcohol: false,
        drugs: false,
        male: false,
        female: false,
        minor: false,
        sunglasses: false,
        scam: false,
        nudity: false,
        loading: true,
        properties: []
    };
  }

  componentWillMount() {
    const token = localStorage.getItem('token');

    axios({
        method: 'get',
        url: 'https://localhost:5000/api/v1/images/',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        console.log(response);
        const results = response.results;
        const properties = []
        for (let attribute in results) {
            if (results[attribute] > 0.70) {
                properties.push(attribute)
            }
        }
        this.setStatus({
            isLoading: false,
            properties: properties
        })
    })
    .catch(error => {
        console.log(error);
        this.setState({
            isLoading: false,
        })
    })
  }

  render() {
    const { loading, properties } = this.state;
    const loader = <div>Loading...</div>
    return (
      <div>
      <strong>UPDATE</strong>
      <p>Aunty took a look at the photo you sent...</p>
      {
        loading ?
        loader 
        :
        properties.length > 0 ?
        <div className="text-left">
            Based on Aunty's analysis, there is a high probability of the following in the photo:
            <ul>
            {
                properties.map((property, index) =>
                    <li key={index}>{property}</li>
                )
            }
            </ul>
        </div>
        :
        <p>
            Aunty was unable to detect anything.
            <br/>
            However, stay alert! We will save this photo for you.
        </p>
        }
      </div>
    );
  }
}