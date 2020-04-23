import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

class MultipleSelectImage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            active: []
         }
    }

    setActive = (val) => {
        let { active } = this.state;
        if(active.includes(val)){
            active.splice( active.indexOf(val), 1 );
        }else{
            active.push(val);
            this.props.handler(this.props.name, active);
        }
        this.setState({active})
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
                        return (
                        <div 
                        style={{animationDelay: `${i}s`}}
                        onClick={()=>this.setActive(e.value)} className={active.includes(e.value) ? styles.active : undefined}>
                        <img src={e.img} alt={e.value} />
                        </div>
                        )
                    })
                }
                </div>
            </div>
         );
    }
}
 
export default MultipleSelectImage;

MultipleSelectImage.propTypes = {
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
}
