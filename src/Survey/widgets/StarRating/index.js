import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const empty = <span dangerouslySetInnerHTML={{ __html: "&#9734"}}></span>;
const filled = <span dangerouslySetInnerHTML={{ __html: "&#9733"}}></span>;

class StarRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: -1
        }
    }

    clickHandler = (value) => {
        this.setState({value});
        this.props.handler(this.props.name, value+1);
    }


    render() {
        const { value } = this.state;
        const { title } = this.props;
        return (
            <div className={styles.radioWidget}>
                <div className={styles.title}>{title}</div>
                <div className={styles.stars}>
                        {
                            new Array(5).fill().map((e, i)=>
                            <div 
                            className={styles.star}
                            onClick={()=>this.clickHandler(i)}
                            >
                                {
                                    i<=value?
                                    filled:
                                    empty
                                }
                            </div>
                            )
                        }
                </div>
            </div>
        );
    }
}

export default StarRating;

StarRating.propTypes = {
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
}
