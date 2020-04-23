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

// import Survey from './Survey';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/sling">
                <Sling />
            </Route>
            <Route path="/jump">
                <Jump />
            </Route>
            <Route path="/">
                /jump :  matter js jump
                <br></br>
                /sling :  matter js sling shooter
            </Route>
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
