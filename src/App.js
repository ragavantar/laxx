import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import lax from 'lax.js'


class App extends Component {
  constructor(props) {
    super(props);

    // lax.setup()

    // document.addEventListener('scroll', function(x) {
    //   lax.update(window.scrollY)
    // }, false)

    // lax.update(window.scrollY)
    lax.setup() // init

	const updateLax = () => {
		lax.update(window.scrollY)
		window.requestAnimationFrame(updateLax)
	}

	window.requestAnimationFrame(updateLax)
 
  }

  componentDidMount(){
    lax.addElement(document.getElementById('a'))
    lax.addElement(document.getElementById('b'))
    lax.addElement(document.getElementById('c'))


    setInterval(() => {
      fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))
    }, 2000);
  }
  render() { 
    return ( 
      <div id='bg'>

        <div><img id='a' data-lax-translate-y='0 0, 400 -200' src='/wolf.png' /></div>
        <div><img id='b' data-lax-translate-y='0 0, 400 -400' src='/wolf.png' /></div>
        <div id='c' data-lax-translate-y='0 0, 400 -800'>
        <div><img data-lax-preset="spin" src='/leaf.png' class='leaf'/></div>
        </div>
      </div>
     );
  }
}

export default App;