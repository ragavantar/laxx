import React, { Component } from 'react';
import Matter, {
    Engine,
    Render,
    World,
    Bodies,
    Body
} from "matter-js";

const Image = [
    "https://assets.myntassets.com/assets/images/retaillabs/2020/4/20/5e2845e9-4852-4e71-b1eb-17bdf0bdc9641587378733744-stand.png",
    "https://assets.myntassets.com/assets/images/retaillabs/2020/4/20/882d0ad7-43b2-4ac0-a021-42b5884c35861587378732565-jump.png"
]

let imgIndex = 0;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgIndex: 0
        }
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

        let boxA = Bodies.rectangle(window.innerWidth / 2, window.innerHeight-50, 50, 140, { isSensor: false, inertia: Infinity, isStatic: false,
            render: {
                sprite: {
                  texture: Image[imgIndex],
                  xScale: 0.16,
                  yScale: 0.32
                }
              }
        });
        let ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 60, { isStatic: true });

        World.add(this.myEngine.world, [boxA, ground]);

        Engine.run(this.myEngine);
        Render.run(this.myRender);

        document.addEventListener('keydown', jumpme);
let _self = this;
        function jumpme(e) {
            console.log(` ${e.code}`);
            boxA.render.sprite.texture = Image[1];
            setTimeout(() => {
                boxA.render.sprite.texture = Image[0];
            }, 1500);
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
                boxA.render.sprite.texture = Image[0];
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