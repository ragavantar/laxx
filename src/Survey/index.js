import React, { Component } from 'react';
import SwitchData from './switchdata.json';

import styles from './styles.module.scss';

import Textbox from './widgets/Textbox';
import SingleSelect from './widgets/SingleSelect';
import MultipleSelect from './widgets/MultipleSelect';
import SingleSelectImage from './widgets/SingleSelectImage';
import MultipleSelectImage from './widgets/MultipleSelectImage';
import RangeSlider from './widgets/RangeSlider';
import Radiobutton from './widgets/Radiobutton';
import StarRating from './widgets/StarRating';
import EndCard from './widgets/EndCard';

class Survey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 0
        }
    }

    onChangeHandler = (name, value) => {
        this.setState({ [name]: value });
    }

    nextQue = () => {
        let { i } = this.state;
        i++;
        this.setState({ i })
    }

    submit = () => {
        this.nextQue()
    }

    getWidget = (obj) => {
        const { type } = obj;

        if (type === "Textbox")
            return <Textbox {...obj} handler={this.onChangeHandler} />
        if (type === "SingleSelect")
            return <SingleSelect {...obj} handler={this.onChangeHandler} />
        if (type === "MultipleSelect")
            return <MultipleSelect {...obj} handler={this.onChangeHandler} />
        if (type === "SingleSelectImage")
            return <SingleSelectImage {...obj} handler={this.onChangeHandler} />
        if (type === "MultipleSelectImage")
            return <MultipleSelectImage {...obj} handler={this.onChangeHandler} />
        if (type === "RangeSlider")
            return <RangeSlider {...obj} handler={this.onChangeHandler} />
        if (type === "Radiobutton")
            return <Radiobutton {...obj} handler={this.onChangeHandler} />
        if (type === "StarRating")
            return <StarRating {...obj} handler={this.onChangeHandler} />
        if (type === "EndCard")
            return <EndCard {...obj} handler={this.onChangeHandler} />

    }
    render() {
        console.log(this.state)
        const { i } = this.state;
        const { data, backgroundImage, backgroundColor } = SwitchData;
        const length = data.length;
        const filled = this.state[data[i].name];
        const active = filled !== undefined && filled !== "";
        const appStyle = {
            backgroundImage: `url('${backgroundImage}')`,
            backgroundColor
        }
        return (
            <div className={styles.App} style={appStyle}>
                <div className={styles.container}>
                    <div className={styles.counter}>
                        {(i < (length - 1)) && ((i + 1) + '/' + (length - 1))}</div>
                    <div className={styles.fade} key={i}>
                        {
                            this.getWidget(data[i])
                        }
                    </div>

                    <div>

                        {(i < (length - 1)) &&
                            <div className={active ? styles.button : [styles.button, styles.disabled].join(' ')}>
                                {
                                    i < length - 2 ?
                                        <div onClick={() => this.nextQue()}>Next</div> :
                                        <div onClick={() => this.submit()}>Submit</div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Survey;