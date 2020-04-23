import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

class MultipleSelect extends Component {
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
        }
        this.setState({active})
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
                    options.map((e,i)=>{
                        return (
                        <div 
                        style={{animationDelay: `${i}s`}}
                        onClick={()=>this.setActive(e)} className={active.includes(e) ? styles.active : undefined}>
                        {e}
                        </div>
                        )
                    })
                }
                </div>
            </div>
         );
    }
}
 
export default MultipleSelect;

MultipleSelect.propTypes = {
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
}
