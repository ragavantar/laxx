import React, { Component } from 'react';
import Slider from "react-slick";


class Slick extends Component {
    state = {}

    render() {
        var settings = {
            className: "center",
            centerMode: true,
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 1,
            speed: 500
        };

        return (
            <div>
                <Slider {...settings}>
                    <div>
                        <h3>1</h3>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>

                    <div>
                        <h3>4</h3>
                    </div>

                    <div>
                        <h3>5</h3>
                    </div>
                    <div>
                        <h3>6</h3>
                    </div>
                </Slider>

            </div>
        );
    }
}

export default Slick;