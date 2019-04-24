import axios from 'axios'
import React from 'react';

export default class ImageReview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            properties: []
        };
    }

    componentWillMount = () => {
        const token = localStorage.getItem('token')
        const imageId = this.props.step.metadata.image_id

        axios({
            method: 'get',
            url: `https://gokaikai.herokuapp.com/api/v1/images/${imageId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const output = response.data.results;
                const imageUrl = response.data.imageURL;
                let properties = Object.entries(output)

                this.setState({
                    loading: false,
                    properties: properties,
                    imageUrl: imageUrl
                });
                localStorage.removeItem('update')
                localStorage.removeItem('updateImageId')
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    loading: false,
                })
            })
    }

    render() {
        const { loading, properties, imageUrl } = this.state;
        const loader = <div>Loading...</div>
        return (
            <div>
                <p>Wait ah... Aunty wear spec first...</p>
                <img src={imageUrl} width="100%" />
                {
                    loading ?
                        loader
                        :
                        properties.length > 0 ?
                            <div className="text-left">
                                My eye very sharp leh! See what I found:
                                <ul>
                                    {
                                        properties.filter(attribute => attribute[1] > 0.39).map((property, index) =>
                                            <li key={index}>
                                                {property[0]}:  {(property[1] * 100).toFixed(2)}%
                                            </li>

                                        )
                                    }
                                </ul>
                            </div>
                            :
                            <p>
                                Aunty didn't find anything, but I keep this photo just in case lah.
                            </p>
                }
            </div>
        );
    }
}
