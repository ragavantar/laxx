import React, { Component } from 'react';

import PropTypes from 'prop-types';



import styles from "./categories.css";

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    clickHandler = (link)=>{
        const data = {
                eventName: "widgetClick",
                screenName: "Comiccon",
                screenUrl: "/growth/bfd19-homepage",
                widgetName: "header_anim",
                widgetType: "gif",
                redirect_url: link
        }

    }

    render() {
        const { data } = this.props;

        return (
            <div className={'categoryElem'}>
                {
                    data.map((ele, ind) =>
                            <img key={ind} className={'category'} src={ele.imgSrc} alt={"category_" + ind} onclick={()=>this.clickHandler(ele.link)} />
                    )
                }
            </div>
        );
    }
}

export default Categories;

Categories.propTypes = {
    data: PropTypes.array.isRequired
}


// sample

// const cat = [
//     {
//         "imgSrc":"https://assets.myntassets.com/assets/images/banners/2019/11/14/f3e0c8d2-5678-4da5-9782-3f565f69cbc31573677256390-categories-Tops.png",
//         "link":""
//     }
// ]

// <Categories data={cat}></Categories>