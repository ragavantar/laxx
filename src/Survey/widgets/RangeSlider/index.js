import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const RangeSlider = ({title, name, handler, min, max, initialValue}) => {
    const [count, setCount] = useState(initialValue);

    const handleChange = (value) => {
        setCount(value);
        handler(name, value);
    }

    return(
        <div className={styles.Widget}>
            <div className={styles.title}>{title}</div>
            <div>
                <input 
                className={styles.slider} type="range" onChange={e=>handleChange(e.target.value)}
                min={min} max={max} value={count}
                ></input>
                &nbsp;{count}
            </div>
        </div>
    )
}

export default RangeSlider;

RangeSlider.propTypes = {
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    initialValue: PropTypes.number.isRequired
}
