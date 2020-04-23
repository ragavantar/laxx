import React, { Component } from 'react';

import Title from './title';


const myContext = React.createContext('light');

class App extends Component {
    constructor(props, context) {
        super(props);
        this.state = {  }
    }

    getChildContext(){
        return{
            val: {
                txt: "hell"
            }
        }
    }
    render() { 
        const val = {title: "hello my world"}
        return ( 
            <myContext.Provider value={val}>
            <div>
                hello world
                <Title/>
            </div>
            </myContext.Provider>
         );
    }
}
 
export default App;