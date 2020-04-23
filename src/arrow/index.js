import React, { Component } from 'react';
import Matter, {
    Engine,
    Render,
    World,
    Bodies,
    Body
} from "matter-js";

// const Image = [
//     "https://assets.myntassets.com/assets/images/retaillabs/2020/4/20/5e2845e9-4852-4e71-b1eb-17bdf0bdc9641587378733744-stand.png",
//     "https://assets.myntassets.com/assets/images/retaillabs/2020/4/20/882d0ad7-43b2-4ac0-a021-42b5884c35861587378732565-jump.png"
// ]
const Image = [
    "https://assets.myntassets.com/assets/images/retaillabs/2020/4/21/a670f7e5-7dbd-45b6-a3e7-7ed87d61aef21587488311633-stand1.png",
    "https://assets.myntassets.com/assets/images/retaillabs/2020/4/21/595f5b66-c34a-4b33-842c-c76eea598e511587488312734-jump1.png"
]

let imgIndex = 0;
const slab1Position = { x: 0, y: 100 }
const slab2Position = { x: 0, y: 280 }


class Slab {
    constructor(engine, position, positionIndex){
        this.myEngine = engine;
        this.body = Bodies.rectangle(window.innerWidth / 2, window.innerHeight - position.y, 120, 25, { isStatic: true });
        World.add(this.myEngine.world, [this.body]);
        this.position = positionIndex;
    }

    movement = true;

    moveSlab(){
        let slab = this.body;
        let direction = 1;
        let move = () => {
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
            if (this.movement)
                requestAnimationFrame(move)
        }
        requestAnimationFrame(move);
    }

    position = 0;

    changePosition = () => {
        this.position++;
        let pos = (this.position)%3;
        // console.log(pos);

        if(pos == 0) {
            // position bottom
            this.movement = false;
            let diff = slab2Position.y - slab1Position.y;
            this.moveTo(diff)
        }
        else if(pos == 1) {
            // position hide
        this.movement = false;
        let diff = slab1Position.y + 10;
        this.moveTo(diff)

        setTimeout(() => {
            this.changePosition()
        }, 1200);
        }
        else if(pos == 2) {
            // position top
            this.movement = true;
            this.moveSlab()
            Body.setPosition(this.body, {x: 0, y: 0})
            let diff = window.innerHeight - slab2Position.y;
            this.moveTo(diff)
        }
    }

    moveTo (diff) {
        let slab = this.body;
        let moveDown = () => {
            diff--;
            Body.translate(slab, { x: 0, y: 1 })
            if (diff > 0)
                requestAnimationFrame(moveDown)
            // else
            //     this.bringFromTopSlab1()
            // console.log(diff)
        }
        requestAnimationFrame(moveDown)
    }
}

class Jump extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            intro: true
        }
    }

    myEngine = null;
    myRender = null;
    myWorld = null;
    myPlayer = null;

    isJumping = false;



    slab = null;
    slab1 = null;
    slab2 = null;

    componentDidMount() {

        setTimeout(() => {
            this.setState({intro: false})
        }, 5000);

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

        this.createLevel()
    }

    createLevel = () => {
        // this.createCompound()
        let boxA = Bodies.rectangle(window.innerWidth / 2, window.innerHeight - slab1Position.y - 100, 50, 70, {
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
        World.add(this.myEngine.world, [boxA]);

        document.addEventListener('keydown', this.jumpme);
        document.addEventListener('click', this.jumpme);
        
        this.slab1 = new Slab(this.myEngine, slab1Position, 0);
        
        this.slab2 = new Slab(this.myEngine, slab2Position, 2);
        this.slab2.moveSlab()
        
        this.slab = this.slab2;

        let checkDead = () => {
            if(this.isDead())
            alert('dead')
            else
            requestAnimationFrame(checkDead)
        }
        requestAnimationFrame(checkDead)

        // setTimeout(() => {
        //     Body.setVelocity(boxA, { x: 9, y: 13 });
        // }, 2000);
    }

    createCompound = () => {
        let wallTop = Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 60, { isStatic: true });
        let wallBottom = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 60, { isStatic: true });
        let wallLeft = Bodies.rectangle(0, window.innerHeight/2, 60, window.innerHeight, { isStatic: true });
        let wallRight = Bodies.rectangle(window.innerWidth, window.innerHeight/2, 60, window.innerHeight, { isStatic: true });

        World.add(this.myEngine.world, [wallBottom, wallLeft, wallRight, wallTop]);
    }

    jumpme = (e) => {
        // console.log(` ${e.code}`);
        if (this.isJumping) return;
        this.isJumping = true;
        let boxA = this.myPlayer
        let slab = this.slab.body
        boxA.render.sprite.texture = Image[1];
        setTimeout(() => {
            resetPlayer()
        }, 1000);
        Body.setVelocity(boxA, { x: 0, y: -13 });

        let resetPlayer = () => {
            Body.set(boxA, 'isSensor', false)
            boxA.render.sprite.texture = Image[0];
            this.isJumping = false;
        }

        // Body.set(boxA, 'isSensor', true)
        let checkDirection = () => {
            if (boxA.velocity.y > 0) {
                if (this.isSlabColliding()) {
                    Body.set(boxA, 'isSensor', false)
                    // Body.set(boxA, 'isStatic', true)
                    // console.log('collided')
                    this.setState({score : this.state.score+10})
                    this.slabCollided()
                    resetPlayer()
                    // this.isJumping = false;

                    let pos = {
                        x: boxA.position.x,
                        // y: this.slab.bounds.min.y - ((boxA.bounds.max.y - boxA.bounds.min.y)/2) - 15 
                        y: slab.bounds.min.y - 75
                    }
                    // Body.setPosition(boxA, pos)

                }
            }
            if (this.isJumping)
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
        let slab = this.slab.body

        // console.log('is', boxA, slab)
        let collision = Matter.SAT.collides(slab, boxA);

        // console.log('coll', collision.collided,
        //     boxA.position.y < slab.position.y && boxA.bounds.min.x > slab.bounds.min.x && boxA.bounds.max.x < slab.bounds.max.x
        // );

        // console.log(
        //     (boxA.bounds.max.y-4) < slab.bounds.min.y
        //     , boxA.position.y < slab.position.y
        //     ,boxA.position.x >= slab.bounds.min.x 
        //     ,boxA.position.x <= slab.bounds.max.x
        // )
        return (
            // collision.collided
            // ||
            (boxA.bounds.max.y-4) < slab.bounds.min.y
            &&  boxA.position.y < slab.position.y
            && boxA.position.x >= slab.bounds.min.x 
            && boxA.position.x <= slab.bounds.max.x
        )
    }

    isDead = () => {
        let boxA = this.myPlayer
        let { x, y } = boxA.position 
        // console.log(
        //     x < 0  //left
        //     ,x > window.innerWidth //right
        //     ,y > window.innerHeight //bottom
        // )
        return (
            x < 0  //left
            || x > window.innerWidth //right
            || y > window.innerHeight //bottom
            // && boxA.position.x <= slab.bounds.max.x
        )
    }

    slabCollided = () => {
        //collided
        this.slab.movement = false;
        setTimeout(() => {
            this.slab1.changePosition()
            this.slab2.changePosition()
        }, 1000);

        if(this.slab === this.slab1)
            this.slab = this.slab2;
        else
            this.slab = this.slab1
    }

    render() {
        if(this.state.score >= 50) {
            alert('win')
        }


        const bg = {
            backgroundImage: `url('https://assets.myntassets.com/assets/images/retaillabs/2020/4/21/0a883011-5808-44b5-9ef3-ab4395af3c881587491196565-Untitled.jpg')`,
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
                {/* Arrow */}
                <div ref={ref=>this.ele=ref}></div>

                
                {
                this.state.intro &&
                <div
                style={{...score, top: '30%', width: '80%', padding: '20px', background: 'grey', border: '2px solid black', color: 'white'}}
                >
                    Jump 5 slabs to get 50 points to complete the game.
                    <br></br>
                    If you get to the spikes, you are dead and game over
                </div>
                }
            </div>
        );
    }
}

export default Jump;