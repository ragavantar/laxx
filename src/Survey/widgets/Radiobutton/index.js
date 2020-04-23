import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const empty = <span dangerouslySetInnerHTML={{ __html: "&#9678;"}}></span>;
const filled = <span dangerouslySetInnerHTML={{ __html: "&#9673;"}}></span>;

class Radiobutton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: ''
        }
    }

    setActive = (active) => {
        this.setState({ active })
        this.props.handler(this.props.name, active);
    }

    render() {
        const { active } = this.state;
        const { title, options } = this.props;
        return (
            <div className={styles.radioWidget}>
                <div className={styles.title}>{title}</div>
                <div className={styles.options}>
                    {
                        options.map((e,i) => 
                            <div 
                            style={{animationDelay: `${i}s`}}
                            key={e} 
                            onClick={() => this.setActive(e)} 
                            className={active === e ? styles.active : undefined}>
                                {/* <input type="radio" name="gender" value={e} checked={active === e} /> */}
                                {active === e? filled : empty}
                                {e}
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default Radiobutton;

Radiobutton.propTypes = {
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
}
