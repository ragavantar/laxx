import React, { Component } from 'react';

import "./styles.css";

class Universe extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    landOn(e) {
        document.getElementById("planets").classList.add(e)
        document.getElementById("univ").classList.remove('screenOut')
        document.getElementById("univ").classList.add('screenZoom')
    }

    back() {
        document.getElementById("univ").classList.remove('screenZoom')
        document.getElementById("univ").classList.add('screenOut')

        setTimeout(() => {
            document.getElementById("univ").classList.remove('screenOut')
            document.getElementById("planets").classList.remove('moveToEarth')
            document.getElementById("planets").classList.remove('moveToMoon')
            document.getElementById("planets").classList.remove('moveToSaturn')
        }, 2000);
    }

    render() {
        return (
            <div className="universe" id="univ">
                <div className="planets" id="planets">
                    <div onClick={() => this.landOn('moveToEarth')} className="planet earth"></div>
                    <div onClick={() => this.landOn('moveToMoon')} className="planet moon"></div>
                    <div onClick={() => this.landOn('moveToSaturn')} className="planet saturn"></div>
                </div>
                <div className="screen">
                    Welcome

                    <div 
                    onClick={()=>this.back()}
                    >Back</div>
                </div>
            </div>
        );
    }
}

export default Universe;