import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

class EndCard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const {title, button, url} = this.props;
        return (
            <div>
                <div className={styles.widget}>
                    <div className={styles.title} dangerouslySetInnerHTML={{ __html: title }}></div>
                    <div className={styles.button}
                    onClick={()=>window.location.href=url}
                    >
                        {button}
                    </div>
                </div>
            </div>
        );
    }
}

export default EndCard;