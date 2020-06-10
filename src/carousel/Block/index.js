import React, { Component } from 'react';
import "./styles.css"

const Data =
    [
        {img : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRim4n1U2yfA6StR_2wTP4qGT7fL0XGVtDi9_m14fnCvMSVAJRV&usqp=CAU", name : "Batman"},
        {img : "https://i.redd.it/ouc4orbi5pk21.jpg", name : "Superman"},
        {img : "https://static-koimoi.akamaized.net/wp-content/new-galleries/2020/04/thor-love-and-thunder-chris-hemsworth-starrer-to-bring-back-this-dead-character-its-not-loki-1.jpg", name : "Thor"},
        {img : "https://i.pinimg.com/736x/89/d0/a6/89d0a6cbdf365c6a68479aafcd281d75.jpg", name:  "Superman"}
    ]
class Block extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="carousel">
                {
                    Data.map(e=>
                        <div className="element">
                            <img src={e.img} />
                            <div className="name">{e.name}</div>
                        </div>
                        )
                }
            </div>
        );
    }
}

export default Block;