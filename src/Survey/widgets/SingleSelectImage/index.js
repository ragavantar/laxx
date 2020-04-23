import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

class SingleSelectImage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            active: ''
         }
    }

    setActive = (active) => {
        this.setState({active})
        this.props.handler(this.props.name, active);
    }

    render() { 
        console.log(this.state)
        const { active } = this.state;
        const { title, options } = this.props;
        return ( 
            <div className={styles.radioWidget}>
                <div className={styles.title}>{title}</div>
                <div className={styles.options}>
                {
                    options.map((e,i)=>{
                        return <div 
                        style={{animationDelay: `${i}s`}}
                        onClick={()=>this.setActive(e.value)} className={active===e.value ? styles.active : undefined}>
                        <img src={e.img} alt={e.value} />
                        </div>
                    })
                }
                </div>
            </div>
         );
    }
}
 
export default SingleSelectImage;

SingleSelectImage.propTypes = {
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
}
