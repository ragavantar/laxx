import React, { Component } from 'react';
import Matter, {
    Engine,
    Render,
    World,
    Bodies,
    Body,
    Constraint,
    Mouse,
    MouseConstraint,
    Events
} from "matter-js";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    myEngine = null;
    myRender = null;
    myWorld = null;


    componentDidMount() {
        this.myEngine = Engine.create();

        this.myRender = Render.create({
            element: document.body,
            engine: this.myEngine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                // background: 'transparent',
                wireframes: false
                // wireframes: true
            }
        });


        Engine.run(this.myEngine);
        Render.run(this.myRender);


        // add bodies
        let rockOptions = { density: 0.004 },
            rock = Bodies.polygon(170, 450, 8, 20, rockOptions),
            elastic1 = Constraint.create({
                pointA: { x: 170, y: 400 },
                bodyB: rock,
                stiffness: 0.05
            }),
            elastic2 = Constraint.create({
                pointA: { x: 170, y: 500 },
                bodyB: rock,
                stiffness: 0.05
            });

        World.add(this.myEngine.world, [rock, elastic1, elastic2]);


        // add mouse control
        var mouse = Mouse.create(this.myRender.canvas),
            mouseConstraint = MouseConstraint.create(this.myEngine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            });

        World.add(this.myEngine.world, mouseConstraint);

        // keep the mouse in sync with rendering
        this.myRender.mouse = mouse;

        let _self = this;
        Events.on(this.myEngine, 'afterUpdate', function () {
            if (mouseConstraint.mouse.button === -1 && (rock.position.x > 190 || rock.position.y < 430)) {
                rock = Bodies.polygon(170, 450, 7, 20, rockOptions);
                World.add(_self.myEngine.world, rock);
                elastic1.bodyB = rock;
                elastic2.bodyB = rock;
            }
        });


        // fit the render viewport to the scene
        // Render.lookAt(render, {
        //     min: { x: 0, y: 0 },
        //     max: { x: 800, y: 600 }
        // });

    }
    render() {
        return (
            <div>

            </div>
        );
    }
}

export default App;