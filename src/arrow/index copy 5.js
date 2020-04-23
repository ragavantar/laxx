import React, { Component } from 'react';
import Matter, {
    Engine,
    Render,
    World,
    Bodies,
    Body
} from "matter-js";
import { conditionalExpression } from '@babel/types';

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
    myPlayer = null;

    isJumping = false;

    slab1Position = { x: 0, y: 100 }
    slab2Position = { x: 0, y: 300 }

    slab = null;
    slab1 = null;
    slab2 = null;
    slab1Move = false;
    slab2Move = false;

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


        Engine.run(this.myEngine);
        Render.run(this.myRender);

        this.createLevel()
    }

    createLevel = () => {
        let boxA = Bodies.rectangle(window.innerWidth / 2, window.innerHeight - this.slab1Position.y - 100, 50, 70, {
            // isSensor: false, 
            inertia: Infinity, 
            // isStatic: false, frictionStatic: 0, restitution: 0,
            render: {
                sprite: {
                    texture: Image[imgIndex],
                    xScale: 0.16,
                    yScale: 0.16
                }
            }
        });

        this.myPlayer = boxA;
        let ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 60, { isStatic: true });

        World.add(this.myEngine.world, [boxA, ground]);

        document.addEventListener('keydown', this.jumpme);

        this.slab1Move = false
        this.slab2Move = true
        this.createSlab1()
        this.createSlab2()
        this.slab = this.slab2;
}

    jumpme = (e) => {
        console.log(` ${e.code}`);
        if(this.isJumping) return;
        this.isJumping = true;
        let boxA = this.myPlayer
        let slab = this.slab
        boxA.render.sprite.texture = Image[1];
        setTimeout(() => {
            resetPlayer()
        }, 1000);
        Body.setVelocity(boxA, { x: 0, y: -14 });

        let resetPlayer = () => {
            boxA.render.sprite.texture = Image[0];
            this.isJumping=false;
            Body.set(boxA, 'isSensor', false)
        }

        Body.set(boxA, 'isSensor', true)
        let checkDirection = () => {
            // console.log(boxA.velocity.y)
            if(boxA.velocity.y>0){
                if (this.isSlabColliding()) {
                    Body.set(boxA, 'isSensor', false)
                    // Body.set(boxA, 'isStatic', true)
                    console.log('collided')
                    resetPlayer()
                        this.slab1Move = !this.slab1Move;
                        this.slab2Move = !this.slab2Move;
                        this.isJumping = false;

                    let pos = {
                        x: boxA.position.x,
                        // y: this.slab.bounds.min.y - ((boxA.bounds.max.y - boxA.bounds.min.y)/2) - 15 
                        y: this.slab.bounds.min.y - 75 
                    }
                    console.log(pos)
                    Body.setPosition(boxA, pos)
                    setTimeout(() => {
                        Body.setPosition(boxA, pos)
                        
                    }, 1000);
                }
            }
            if(this.isJumping)
            requestAnimationFrame(checkDirection);
        }
        requestAnimationFrame(checkDirection);


        let dist = 1;
        let up = true;
        let _self = this;
        // let move = () => {
        //     if (up && dist < 40) {
        //         Body.set(boxA, 'isStatic', true)
        //         dist++;
        //         Body.translate(boxA, { x: 0, y: -5 });
        //         requestAnimationFrame(move);
        //     } else {
        //         //  Body.setVelocity(boxA, { x: 0, y: -1 });
        //         // Body.set(boxA, 'isSensor', false)
        //         Body.set(boxA, 'isStatic', true)
        //         if (_self.isSlabColliding()) {
        //             console.log('collided')
        //             // Body.setStatic(boxA, true)
        //             // Body.setStatic(_self.slab, true)

        //             //     if(boxA.position.y < slab.position.y && boxA.bounds.min.x > slab.bounds.min.x && boxA.bounds.max.x < slab.bounds.max.x)
        //             //         console.log('center')

        //             this.slab1Move = !this.slab1Move; 
        //             this.slab2Move = !this.slab2Move; 
        //         } else {
        //             up = false;
        //             dist--;
        //             Body.translate(boxA, { x: 0, y: 5 });
        //             if (dist > 0)
        //                 requestAnimationFrame(move);
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


    isSlabColliding = () => {
        let boxA = this.myPlayer
        let slab = this.slab

        // console.log('is', boxA, slab)
        let collision = Matter.SAT.collides(slab, boxA);

        console.log('coll', collision.collided,
        boxA.position.y < slab.position.y && boxA.bounds.min.x > slab.bounds.min.x && boxA.bounds.max.x < slab.bounds.max.x
        );
        return (collision.collided
            ||
            boxA.position.y < slab.position.y && boxA.bounds.min.x > slab.bounds.min.x && boxA.bounds.max.x < slab.bounds.max.x
        )
    }

    createSlab1 = () => {
        let slab = Bodies.rectangle(window.innerWidth / 2, window.innerHeight - this.slab1Position.y, 100, 20, { isStatic: true });
        World.add(this.myEngine.world, [slab]);
        this.slab1 = slab;
        let direction = 1;
        let moveSlab = () => {
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
            if(this.slab1Move)
            requestAnimationFrame(moveSlab)
        }
        requestAnimationFrame(moveSlab);
    }

    createSlab2 = () => {
        let slab = Bodies.rectangle(window.innerWidth / 2, window.innerHeight - this.slab2Position.y, 100, 30, { isStatic: true });
        World.add(this.myEngine.world, [slab]);
        this.slab2 = slab;
        let direction = 1;
        let moveSlab = () => {
            if (direction == 1) {
                Body.translate(slab, { x: 3, y: 0 })
                if (slab.position.x > window.innerWidth)
                    direction = -1;
            }
            else {
                Body.translate(slab, { x: -3, y: 0 })
                if (slab.position.x < 0)
                    direction = 1;
            }
            if(this.slab2Move)
            requestAnimationFrame(moveSlab);
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