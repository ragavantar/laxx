import React, { Component } from 'react';
import Slider from "react-slick";

import PropTypes from 'prop-types';

import './carousel.css'



class Carousel extends Component {
    constructor(props) {
        super(props);
      
    }

    me = () =>{
        alert('s')
    }

    render() {
        const { data } = this.props;

        const settings = {
            autoplay: false,
            className: "center",
            centerMode: true,
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 1,
            speed: 500
        };

        return (
            <div className='cover-flow'>
                <Slider {...settings}>
                    {
                        data.map((ele, ind) => 
                            <div>

                                <img src={ele.imgSrc} onClick={this.me} alt={`slide ${ind}`} />

                            </div>
                        )
                    }
                </Slider>
            </div>
        );
    }
}

export default Carousel;

Carousel.propTypes = {
    data: PropTypes.array.isRequired
}