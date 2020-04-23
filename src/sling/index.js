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


const Height = window.innerHeight;
const Width = window.innerWidth;
const isSmall = Height < 660;

class ScoreOject {
    constructor(myEngine, myRender) {
        this.myEngine = myEngine;
        this.myRender = myRender;

        this.posY = 
        isSmall? 
        Math.floor((Math.random() * 100) + 20):
        Math.floor((Math.random() * 200) + 100);

        this.body = Bodies.circle(30, this.posY, 20, 
            { 
                isStatic: true, 
                label: 'score',
                render: {
                    fillStyle: "#"+((1<<24)*Math.random()|0).toString(16)
                }
            });
        World.add(this.myEngine.world, [this.body]);
        this.move();
    }

    move = () => {
        let diff = Width;
        let move = () => {
            diff--;
            Body.translate(this.body, { x: 2, y: 0 })
            if (diff < 0) {
                diff = Width;
                if(!this.body.isStatic) Body.set(this.body, 'isStatic', true)
                if(this.body.isSensor) Body.set(this.body, 'isSensor', false)
                Body.setPosition(this.body, { x: 30, y: this.posY })
            }
            requestAnimationFrame(move)
        }
        requestAnimationFrame(move)
    }
}
class Sling extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0
        }
    }

    myEngine = null;
    myRender = null;
    myWorld = null;


    componentDidMount() {
        this.myEngine = Engine.create();

        this.myRender = Render.create({
            element: this.ele,
            engine: this.myEngine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                background: 'transparent',
                wireframes: false
                // wireframes: true
            }
        });


        Engine.run(this.myEngine);
        Render.run(this.myRender);

        // add bodies
        let 
            rockPosY = isSmall ? Height-200 : Height-200,
            rockOptions = { density: 0.004, label: 'rock' },
            rock = Bodies.polygon(200, rockPosY, 8, 20, rockOptions),
            elastic1 = Constraint.create({
                pointA: { x: 100, y: rockPosY },
                bodyB: rock,
                stiffness: 0.05,
                render: { type: 'line', strokeStyle: '#304251' }
            }),
            elastic2 = Constraint.create({
                pointA: { x: 300, y: rockPosY },
                bodyB: rock,
                stiffness: 0.05,
                render: { type: 'line', strokeStyle: '#304251' }
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
            if (mouseConstraint.mouse.button === -1 && (rock.position.y < rockPosY)) {
                rock = Bodies.polygon(200, rockPosY, 8, 20, rockOptions);
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


        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                new ScoreOject(this.myEngine, this.myRender);
            }, i * 1000);
        }

        Events.on(this.myEngine, "collisionStart", (e)=>{
            let pairs = e.pairs;
            let {bodyA, bodyB} = pairs[0];
            if(
            bodyA.isSensor || bodyB.isSensor
            ) return;
            // console.log(e);
            // console.log("Pair no visible: ", pairs)
            // console.log("Pair visible: ", pairs[0]);
            // console.log("colision between " + pairs[0].bodyA.label + " - " + pairs[0].bodyB.label);       

            Body.set(pairs[0].bodyA, "isStatic", false);
            Body.set(pairs[0].bodyB, "isStatic", false);
            Body.set(pairs[0].bodyA, "isSensor", true);
            Body.set(pairs[0].bodyB, "isSensor", true);
            Body.setVelocity(bodyA, { x: 0, y: 2 });
            Body.setVelocity(bodyB, { x: 0, y: 2 });
            
            this.setState({score: this.state.score+10 })
        })

    }

    render() {
        const bg = {
            backgroundImage: `url('https://cdn.dribbble.com/users/375867/screenshots/3200773/shady-forest-game-background.png')`,
            backgroundSize: '100% 100%'
        }
        const score = {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            textAlign : 'center',
            background: 'black',
            color: 'white',
            width: '150px',
            margin: 'auto',
            padding: '5px'
        }
        return (
            <div style={bg}>
                <div style={score}>
                    Score : {this.state.score}
                </div>
                <div ref={ref=>this.ele=ref}></div>
            </div>
        );
    }
}

export default Sling;