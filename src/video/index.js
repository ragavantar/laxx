import React, { Component } from 'react';
import ReactPlayer from 'react-player'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            Range : 0,
            playedSeconds: 0,
            played: 0
         }
    }

    checkPlayed = ({playedSeconds, played})=>{
        const start = 0;
        const end = 10;
        if(playedSeconds < end && playedSeconds > start){
            // this.setState({Range : 1})
        }
        const interval = 10;
        const Range = (playedSeconds / interval);
        this.setState({Range, playedSeconds, played})
    }
    render() { 
        return ( 
            <div>
                <ReactPlayer url='https://www.youtube.com/watch?v=9mdJV5-eias'
                playing={true}
                progressInterval={1000}
                onProgress={(e)=>this.checkPlayed(e)}
                />
                <div>{Math.round(this.state.Range)} set</div>
                <div>{Math.round(this.state.played * 100)} %</div>
                <div>{Math.round(this.state.playedSeconds)} sec</div>
            </div>
         );
    }
}
 
export default App;