import React, { Component } from 'react';

class IO extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount(){
        const obs = new IntersectionObserver(entries=>{

            if(entries[0].intersectionRatio > 0){
                entries[0].target.style.opacity = entries[0].intersectionRatio
            }

        }, {  threshold: [0.25, 0.5, 0.75, 1]})
        obs.observe(this.ele)
    }

    render() { 
        return ( 
            <div ref={ref=>this.ele=ref}>
                {this.props.children}
            </div>
         );
    }
}
 
export default IO;