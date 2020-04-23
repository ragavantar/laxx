import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        console.log(this)
        return ( 
            <h1>Title</h1>
         );
    }
}
 
export default Title;

Title.contextType = {
    myContext: PropTypes.object
}