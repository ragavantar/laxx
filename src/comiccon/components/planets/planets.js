import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './planets.css';

class Planets extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        const { data, background } = this.props;

        return (
            <div style={{ position: 'relative', width: '100%' }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <div className={'planetsElem'} style={{background}}>
                        {
                            data.map((ele, ind) =>
                                <img key={ind} className={'planets'} src={ele.imgSrc} alt={"planets" + ind} />
                            )
                        }
                    </div>
                </div>
                <div className={'stars'}></div>
                <div className={'twinkling'}></div>
            </div>
        );
    }
}

export default Planets;

Planets.defaultProps = {
    background: 'none'
}

Planets.propTypes = {
    data: PropTypes.array.isRequired,
    background: PropTypes.string
}