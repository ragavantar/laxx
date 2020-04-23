import React, { Component } from 'react';

import './intersection.css';

import IO from './intersectionComponent';
import Dialog from './intersectionDialog';


class App extends Component {
    state = { 

     }

    componentDidMount(){
        // const obs = new IntersectionObserver(entries=>{
        //     console.log(entries[0])
        //     if(entries[0].intersectionRatio > 0){
        //         console.log(entries[0].intersectionRatio)
        //         entries[0].target.style.opacity = entries[0].intersectionRatio
        //     }
        // }, {  threshold: [0.25, 0.5, 0.75, 1]})
        // obs.observe(this.ele)
    }

    render() { 
        console.log(this)
        return ( 
        <div>
            <section>
                <Dialog
                    height='100px'
                    width='200px'
                    color='blue'
                    // background='red'
                    text='hello world'
                />
                <Dialog
                    color='black'
                    text='asdfghjkl dfghjk fghjkl dfghjkl dfghjkl'
                />
            </section>
            {/* <section>
                <div>
                    <IO>
                    <h1>hellow</h1>
                    <h1>hellow</h1>
                    </IO>
                </div>
                <h1 ref={ref=>this.ele=ref}>world</h1>
            </section> */}
        </div> 
        );
    }
}
 
export default App;