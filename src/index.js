import React from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";


import './index.css';
// import App from './App';
// import App from './intersectionApp';
// import App from './lottie';
// import App from './comiccon/App';
// import App from './context';
// import App from './video';
// import App from './lazyimg';
// import App from './summernote';
// import App from './imagekit';
import Jump from './arrow';
import Sling from './sling';
// import Slick from './slick';
import Snake from './snake';
import Pacman from './pacman';
import wordament from './wordament';
import Universe from './universe';

// import Survey from './Survey';

import * as serviceWorker from './serviceWorker';
import Wordament from './wordament';
import Carousel from './carousel';
import Filter from './filter';

import LC from './lc';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            page: 'lc'
         }
    }

    Intro = () => {
        return(
            <div>
                <button onClick={()=>this.setState({page: 'carousel'})}>Carousel</button>
                <button onClick={()=>this.setState({page: 'jump'})}>Jump Game</button>
                <button onClick={()=>this.setState({page: 'sling'})}>Slingshot Game</button>
                <button onClick={()=>this.setState({page: 'snake'})}>Snake Game</button>
                <button onClick={()=>this.setState({page: 'pac'})}>Pac man Game</button>
                <button onClick={()=>this.setState({page: 'word'})}>Wordament</button>
                <button onClick={()=>this.setState({page: 'universe'})}>Comiccon Universe</button>
                <b>
                    From Game <br></br>
                    to come back to this menu <br></br>
                    refresh the page
                </b>
                <button onClick={()=>this.setState({page: 'filter'})}>filter</button>
                <button onClick={()=>this.setState({page: 'lc'})}>level chart</button>
            </div>
        )
    }
    render() { 
        const { page } = this.state;
        return ( 
            <div>
                { page=='filter' && <Filter />}
                { page=='lc' && <LC />}
                { page=='intro' && this.Intro()}
                { page=='jump' && <Jump />}
                { page=='snake' && <Snake />}
                { page=='sling' && <Sling />}
                { page=='pac' && <Pacman />}
                { page=='word' && <Wordament />}
                { page=='universe' && <Universe />}
                { page=='carousel' && <Carousel />}
            </div>
         );
    }
}
 
export default App;
ReactDOM.render(
    <App />
    // <Carousel />
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
