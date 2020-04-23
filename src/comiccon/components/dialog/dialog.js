import React, { Component } from 'react';

import PropTypes from 'prop-types';


class Dialog extends Component {
    constructor(props){
        super(props);

    }

    componentDidMount(){
        const obs = new IntersectionObserver(entries=>{

            if(entries[0].intersectionRatio > 0.9){
                entries[0].target.style.opacity = 1
                entries[0].target.style.transform = 'scale(1)'
            }
            if(entries[0].intersectionRatio < 0.9){
                entries[0].target.style.opacity = 0
                entries[0].target.style.transform = 'scale(0.5)'
            }

        }, {  threshold: [0.25, 0.5, 0.75, 1]})
        obs.observe(this.ele)
    }

    render() { 
        let { height, width, background, text, color } = this.props;

        const dialgStyle = {
            height,
            width,
            color,
            background,
            opacity: 0,
            transform: 'scale(0.5)',
            transition: 'opacity 2s, transform 2s',
            padding: '20px 30px 40px 30px',
            display: 'inline-block',
            backgroundSize: '100% 100%'
        }
        return ( 
            <div ref={ref=>this.ele=ref} style={dialgStyle}>
                {text}
            </div>
         );
    }
}
 
export default Dialog;

Dialog.defaultProps = {
    height: 'auto',
    width: 'auto',
    background: 'url(https://assets.myntassets.com/assets/images/retaillabs/2019/11/13/a09b0c19-391e-4f78-ad48-a4e627e2f9391573648940674-speech-bubble.png)',
    color: 'black',
}

Dialog.propTypes = {
    text: PropTypes.string.isRequired,
    height: PropTypes.string,
    width: PropTypes.string,
    background: PropTypes.string,
    color: PropTypes.string
}
