import React, { Component } from 'react';
import SwitchData from './switchdata.json';

import styles from './styles.module.scss';

import Textbox from './widgets/Textbox';
import SingleSelect from './widgets/SingleSelect';
import MultipleSelect from './widgets/MultipleSelect';

class Survey extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    onChangeHandler = (name, value) => {
        this.setState({[name]: value});
    }

    getWidget = (obj) => {
        const { type } = obj;

        if(type === "Textbox")
            return <Textbox {...obj} handler={this.onChangeHandler}/>
    }
    render() { 
        console.log(this)
        return ( 
            <div className={styles.container}>
                {
                    SwitchData.data.map(e=>{
                        return this.getWidget(e)
                    //    return <div>{e.type}</div>
                    })
                }
                <SingleSelect handler={this.onChangeHandler} />
                <MultipleSelect handler={this.onChangeHandler} />
            </div>
         );
    }
}
 
export default Survey;