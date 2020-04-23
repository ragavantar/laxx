import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';


const Textbox = ({title, name, handler}) => {
    return(
        <div className={styles.textWidget}>
            <div className={styles.title} dangerouslySetInnerHTML={{__html: title }}></div>
            <div>
                <input onChange={e=>handler(name, e.target.value)}></input>
            </div>
        </div>
    )
}

export default Textbox;

Textbox.propTypes = {
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}
