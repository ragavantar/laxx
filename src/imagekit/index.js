import React, { Component } from 'react';
import {IKContext, IKUpload} from 'imagekitio-react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                imagekity

                <IKContext
                    publicKey="your_public_api_key"
                    urlEndpoint="<https://ik.imagekit.io/your_imagekit_id>"
                    authenticationEndpoint="<http://www.yourserver.com/auth">
                    <IKUpload fileName="my-upload" />
                </IKContext>

            </div>
        );
    }
}

export default App;