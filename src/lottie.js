import React, { Component } from 'react';
import lottie from "lottie-web";

class App extends Component {
    state = {  }

    componentDidMount(){
        const anim = lottie.loadAnimation({
            container: this.anim,

            loop: true,
            autoplay: false,
            path: "/pixel-burst.json"
          });      

          setTimeout(() => {
              anim.play()
          }, 2000);
    }

    render() { 
        console.log(this)
        return ( 
            <div ref={ref=>this.anim=ref}>

            </div>
         );
    }
}
 
export default App;