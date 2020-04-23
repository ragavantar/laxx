import React, { Component } from 'react';
import Matter, {
    Engine,
    Render,
    World,
    Bodies,
    Body
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
                wireframes: false
            }
        });

        let boxA = Bodies.rectangle(window.innerWidth / 2, window.innerHeight-50, 40, 40, { isSensor: false, inertia: Infinity, isStatic: false });
        let ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 60, { isStatic: true });

        World.add(this.myEngine.world, [boxA, ground]);

        Engine.run(this.myEngine);
        Render.run(this.myRender);

        document.addEventListener('keydown', jumpme);

        function jumpme(e) {
            console.log(` ${e.code}`);
            Body.setVelocity(boxA, { x: 0, y: -15 });
            // let dist = 1;
            // let up = true;
            // function move () {
            //     if(up && dist < 50) {
            //         dist++;
            //         Body.translate(boxA, {x: 0, y: -5 });
            //         requestAnimationFrame(move);
            //     }else {

            //         var collision = Matter.SAT.collides(slab, boxA);

            //         if (collision.collided
            //             &&
            //             boxA.position.y < slab.position.y && boxA.bounds.min.x > slab.bounds.min.x && boxA.bounds.max.x < slab.bounds.max.x
            //             ) {
            //             // do something
            //             console.log('collided')
            //             // Body.setStatic(boxA, true)
            //             // Body.set(boxA, 'isSensor', false)
            //             Body.setStatic(slab, true)
            //             // if(boxA.position.y < slab.position.y)
            //             //     console.log('top')
            //             // else 
            //             //     console.log('bottom')
            //             // if(boxA.position.x < slab.position.x)
            //             //     console.log('left')
            //             // else
            //             //     console.log('right')
        
            //             if(boxA.position.y < slab.position.y && boxA.bounds.min.x > slab.bounds.min.x && boxA.bounds.max.x < slab.bounds.max.x)
            //                 console.log('center')
            //         } else {

            //             up = false;
            //             dist--;
            //             Body.translate(boxA, {x: 0, y: 5 });
            //             if(dist > 0)
            //             requestAnimationFrame(move);   
            //         }
            //     }
            //     // else if (dist > 0) {
            //     //     dist--;
            //     //     Body.translate(boxA, {x: 0, y: boxA.position.y+dist})
            //     // }
                
            //     // requestAnimationFrame(move)
            // }
            // requestAnimationFrame(move)

        }


        let slab = Bodies.rectangle(200, window.innerHeight - 220, 100, 20, { isStatic: true });
        World.add(this.myEngine.world, [slab]);
        let direction = 1;
        function moveSlab() {


            var collision = Matter.SAT.collides(slab, boxA);

            if (collision.collided
                &&
                boxA.position.y < slab.position.y && boxA.bounds.min.x > slab.bounds.min.x && boxA.bounds.max.x < slab.bounds.max.x
                ) {
                // do something
                console.log('collided')
                // Body.setStatic(boxA, true)
                // Body.set(boxA, 'isSensor', false)
                Body.setStatic(slab, true)
                // if(boxA.position.y < slab.position.y)
                //     console.log('top')
                // else 
                //     console.log('bottom')
                // if(boxA.position.x < slab.position.x)
                //     console.log('left')
                // else
                //     console.log('right')

                if(boxA.position.y < slab.position.y && boxA.bounds.min.x > slab.bounds.min.x && boxA.bounds.max.x < slab.bounds.max.x)
                    {
                        console.log('center');
                        setTimeout(() => {
                            Body.translate(boxA, {x:0, y: 50})
                            Body.translate(slab, {x:0, y: 50})
                        }, 1000);
                    }
            }
            else {
                if (direction == 1) {
                    Body.translate(slab, { x: 5, y: 0 })
                    if (slab.position.x > window.innerWidth)
                        direction = -1;
                }
                else {
                    Body.translate(slab, { x: -5, y: 0 })
                    if (slab.position.x < 0)
                        direction = 1;
                }
                requestAnimationFrame(moveSlab)
            }


        }
        requestAnimationFrame(moveSlab);

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