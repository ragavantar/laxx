import React, { Component } from 'react';

import Block from './Block';
import Flex from './Flex';

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <h1>Block</h1>
                <Block />
                <h1>Flex</h1>
                <Flex />
            </div>
         );
    }
}
 
export default Carousel;