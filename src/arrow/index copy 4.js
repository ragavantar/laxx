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

    slab1Position = {x:0, y: 100}
    slab2Position = {x:0, y: 300}

    initial = false;
    slab = null;
    slab1 = null;
    slab2 = null;

    componentDidMount() {

        this.myEngine = Engine.create();

        this.myRender = Render.create({
            element: document.body,
            engine: this.myEngine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: true
            }
        });


        Engine.run(this.myEngine);
        Render.run(this.myRender);

        this.createLevel()
    }

    createLevel = () => {
        this.initial = true;
        let boxA = Bodies.rectangle(window.innerWidth / 2, window.innerHeight - this.slab1Position.y - 100, 50, 140, {
            isSensor: false, inertia: Infinity, isStatic: false, frictionStatic: 1, restitution: 0,
            render: {
                sprite: {
                    texture: Image[imgIndex],
                    xScale: 0.16,
                    yScale: 0.32
                }
            }
        });

        this.myPlayer = boxA;
        let ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 60, { isStatic: true });

        World.add(this.myEngine.world, [boxA, ground]);

        document.addEventListener('keydown', this.jumpme);

        this.createSlab1()
        // this.createSlab2()

    }

    jumpme = (e) => {
        console.log(` ${e.code}`);
        let boxA = this.myPlayer
        let slab = this.slab
        boxA.render.sprite.texture = Image[1];
        setTimeout(() => {
            boxA.render.sprite.texture = Image[0];
        }, 1000);
        // Body.setVelocity(boxA, { x: 0, y: -13 });
        let dist = 1;
        let up = true;
        let _self = this;
        function move () {
            if(up && dist < 100) {
                Body.set(boxA, 'isSensor', true)
                dist++;
                Body.translate(boxA, {x: 0, y: -5 });
                requestAnimationFrame(move);
            }else {
                 Body.setVelocity(boxA, { x: 0, y: -1 });
                Body.set(boxA, 'isSensor', false)
                if (_self.isSlabColliding()) {
                    console.log('collided')
                    Body.setStatic(boxA, true)
                    Body.setStatic(slab, true)

                    if(boxA.position.y < slab.position.y && boxA.bounds.min.x > slab.bounds.min.x && boxA.bounds.max.x < slab.bounds.max.x)
                        console.log('center')
                } else {

                    up = false;
                    dist--;
                    Body.translate(boxA, {x: 0, y: 5 });
                    if(dist > 0)
                    requestAnimationFrame(move);   
                }
            }
            // else if (dist > 0) {
            //     dist--;
            //     Body.translate(boxA, {x: 0, y: boxA.position.y+dist})
            // }

            // requestAnimationFrame(move)
        }
        requestAnimationFrame(move)

    }


    isSlabColliding = () => {
        let boxA = this.myPlayer
        let slab = this.slab

        console.log('is', boxA, slab)
        let collision = Matter.SAT.collides(slab, boxA);

        return (collision.collided
            &&
            boxA.position.y < slab.position.y && boxA.bounds.min.x > slab.bounds.min.x && boxA.bounds.max.x < slab.bounds.max.x
            )
    }

    createSlab1 = () => {
        let boxA = this.myPlayer;
        let slab = Bodies.rectangle(window.innerWidth/2, window.innerHeight - this.slab1Position.y, 100, 20, { isStatic: true });
        World.add(this.myEngine.world, [slab]);
        this.slab1 = slab;
        let direction = 1;
        let _self = this;
        function moveSlab() {
            var collision = Matter.SAT.collides(slab, boxA);

            if (collision.collided
                &&
                boxA.position.y < slab.position.y && boxA.bounds.min.x > slab.bounds.min.x && boxA.bounds.max.x < slab.bounds.max.x
            ) {

                console.log('collided')
                // Body.setStatic(boxA, true)
                // Body.set(boxA, 'isSensor', false)
                Body.setStatic(slab, true)
                boxA.render.sprite.texture = Image[0];

                if (boxA.position.y < slab.position.y && boxA.bounds.min.x > slab.bounds.min.x && boxA.bounds.max.x < slab.bounds.max.x) {
                    console.log('center');
                    setTimeout(() => {
                        Body.translate(boxA, { x: 0, y: 50 })
                        Body.translate(slab, { x: 0, y: 50 })
                    }, 1000);
                    this.slab = this.slab2;
                    // setTimeout(() => {
                    //     _self.createSlab();
                    // }, 3000);
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
        if(this.initial){
            this.initial = false;
            this.slab = this.slab1;
        }
        else {
            requestAnimationFrame(moveSlab);
        }
    }

    createSlab2 = () => {
        let boxA = this.myPlayer;
        let slab = Bodies.rectangle(window.innerWidth/2, window.innerHeight - this.slab2Position.y, 100, 20, { isStatic: true });
        World.add(this.myEngine.world, [slab]);
        this.slab2 = slab;
        let direction = 1;
        let _self = this;
        function moveSlab() {
            var collision = Matter.SAT.collides(slab, boxA);

            if (collision.collided
                &&
                boxA.position.y < slab.position.y && boxA.bounds.min.x > slab.bounds.min.x && boxA.bounds.max.x < slab.bounds.max.x
            ) {

                console.log('collided')
                // Body.setStatic(boxA, true)
                // Body.set(boxA, 'isSensor', false)
                Body.setStatic(slab, true)
                boxA.render.sprite.texture = Image[0];

                if (boxA.position.y < slab.position.y && boxA.bounds.min.x > slab.bounds.min.x && boxA.bounds.max.x < slab.bounds.max.x) {
                    console.log('center');
                    setTimeout(() => {
                        Body.translate(boxA, { x: 0, y: 50 })
                        Body.translate(slab, { x: 0, y: 50 })
                    }, 1000);

                    this.slab = this.slab;
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