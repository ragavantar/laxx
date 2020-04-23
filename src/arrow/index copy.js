import React, { Component } from 'react';
import Matter from "matter-js";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        let Engine = Matter.Engine,
            Render = Matter.Render,
            World = Matter.World,
            Bodies = Matter.Bodies,
            Body = Matter.Body,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint;

        let engine = Engine.create();

        let render = Render.create({
            element: document.body,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: false
            }
        });

        let boxA = Bodies.rectangle(40, 20, 40, 40, { isStatic: false });
        let ballA = Bodies.circle(280, 100, 40, 10);
        let ballB = Bodies.circle(260, 10, 40, 10);
        let ground = Bodies.rectangle(0, window.innerHeight, 810, 60, { isStatic: true });

        let slab = Bodies.rectangle(80, window.innerHeight - 400, window.innerWidth, 20, { isStatic: true });

        World.add(engine.world, [boxA, ballA, ballB, ground]);

        Engine.run(engine);
        Render.run(render);


        // setInterval(() => {
        //     // Body.translate(boxA, {x: 0, y: -50})
        //     Body.setVelocity( boxA, {x: 0, y: -20});
        //     Body.translate(slab, {x:0, y: 20})
        // }, 2000);

        // setTimeout(() => {
        //     World.add(engine.world, slab)
        // }, 3000);

        // setInterval(() => {
        //     Body.translate(slab, {x:30, y: 0})
        // }, 1000);


    // add mouse control
    let mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

  this.mouseConstraint = mouseConstraint;

  World.add(engine.world, mouseConstraint);

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  document.addEventListener('keydown', jumpme);

function jumpme(e) {
  console.log(` ${e.code}`);
  Body.setVelocity( boxA, {x: 0, y: -10});
}


    }
    render() {
        return (
            <div>
                {/* Arrow */}
            </div>
        );
    }
}

export default App;