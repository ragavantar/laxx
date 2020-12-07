import React, { Component } from 'react';

class LC extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            holding: false,
            i: 0
         }
    }

    holdStart = () => {
        console.log('start')
        this.setState({holding: true}, ()=>{

        
        let i = this.state.i //0;
        const t = setInterval(() => {
            if(this.state.holding) {
                console.log(i++)
                document.getElementById('t').innerHTML = i;
            }else 
            clearInterval(t)
        }, 100);
    })
    }

    holdEnd = () => {
        console.log('end')
        this.setState({holding: false})
    }

    render() { 
        return ( 
            <div>
                hold
                <div>{this.state.i}</div>
                <div id='t'>jj</div>
                <div>{this.state.holding ? 1 : 0}</div>
                <button onDoubleClick={()=>console.log('dbc')}>click me</button>
                <button onMouseDown={()=>this.holdStart()} onMouseUp={()=>this.holdEnd()}>Hold Me</button>
                <button style={{ padding: 200}} onTouchStart={()=>this.holdStart()} onTouchEnd={()=>this.holdEnd()}></button>
            </div>
         );
    }
}
 
export default LC;