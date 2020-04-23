import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: "https://assets.myntassets.com/assets/images/retaillabs/2019/12/24/44333438-01e2-45f3-87b8-7d7fef5d46771577203174176-67868104.png",
            loaded: false,
            width: 200,
            backgroundColors: ['red', 'green', 'blue'],
            img: ''
        }
    }

    componentDidMount() {
        let { src, width } = this.state;
        let imgSrc = src.split('.com/');
        imgSrc = `${imgSrc[0]}.com/w_${width}/${imgSrc[1]}`;
        
        this.setState({img : imgSrc}); 

        let img = new Image();
        img.onload =  () => {
            this.setState({loaded: true});
        };
        img.src = imgSrc;
    }

    render() {
        const { src, img, width, backgroundColors, loaded } = this.state;

        let placeholder = src.split('.com/');
        let placeholderImg = `${placeholder[0]}.com/w_${width},o_0,q_1,e_blur:2000/${placeholder[1]}`;

        const background = {
            background: backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
        }

        return (
            <div>
            <img src={loaded ? img : placeholderImg} style={background} />
            image
            </div>
        );
    }
}

export default App;