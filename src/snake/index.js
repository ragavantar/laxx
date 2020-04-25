import React, { Component } from 'react';

import styles from './styles.module.scss';


const Side = 30;
const Boundary = {
    top: 0,
    left: 0,
    // right: Math.floor(window.innerWidth/Side),
    right: 10,
    bottom: 10
}

const Food = [[1,1], [3,4], [2,8], [9,9]];

class Snake extends Component {
    constructor(props) {
        super(props);
        this.state = {
            snake: [
                [4, 5], [5, 5], [6, 5]
            ],
            direction: 'left', //up, down, left, right
            canMove: true,
            ate: 0
        }
    }

    componentDidMount() {
        let loopMe = setInterval(() => {
            if (this.state.canMove)
                this.checkMove();
            else
                clearInterval(loopMe)
        }, 1000);
    }

    checkMove = () => {
        let { snake } = this.state;
        if (this.isHittingBoundary(snake[0])) {
            console.log('hit'); 
            this.setState({ canMove: false });
            alert('You Got Hit')
        }
        else if (this.isOverlap()) {
            console.log('overlap'); 
            this.setState({ canMove: false });
            alert('You Ate Yourself')
        }
        else {
            if(this.state.ate === Food.length) 
            {
                this.setState({ canMove: false });
                alert('Level Completed');
            }
            else
            this.move()
        }
    }

    isHittingBoundary = (first) => {
        console.log(first)
        if (first[1] === Boundary.top)
            return true
        else if (first[0] === Boundary.left)
            return true
        else if (first[0] === Boundary.right)
            return true
        else if (first[1] === Boundary.bottom)
            return true
        return false
    }

    checkIsFood = (position) => {
        let { ate } = this.state;
        if(Food[ate][0]===position[0] && Food[ate][1]===position[1])
            return true
        else  
            return false
    }

    isOverlap = () => {
        const {snake} = this.state;
        for(let i=1; i < snake.length; i++)
            if(snake[i][0]===snake[0][0] && snake[i][1]===snake[0][1])
                return true
        return false
    }

    move = () => {
        let { snake, direction } = this.state;
        let first = snake[0];

        
        console.log(direction)
        if (direction === 'up')
        snake.unshift([first[0], first[1] - 1])
        else if (direction === 'down')
        snake.unshift([first[0], first[1] + 1])
        else if (direction === 'left')
        snake.unshift([first[0] - 1, first[1]])
        else if (direction === 'right')
        snake.unshift([first[0] + 1, first[1]])
        
        if(this.checkIsFood(first)){
            this.setState({ snake, ate: this.state.ate+1 });
        }else{
            snake.pop();
            this.setState({snake});
        }
    }

    getStyle = (i, j) => {
        let obj = {
            top: j * Side,
            left: i * Side,
            width: Side,
            height: Side
        }
        return obj
    }

    getBoundary = () => {
        const { top, left, right, bottom } = Boundary;
        let bounds = []
        //gen top box ele
        for (let i = left+1; i < right; i++) 
            bounds.push(<div className={[styles.box, styles.rocks].join(' ')} style={this.getStyle(i, top)} />)
        //gen bottom box ele
        for (let i = left+1; i < right; i++) 
            bounds.push(<div className={[styles.box, styles.rocks].join(' ')} style={this.getStyle(i, bottom)} />)
        //gen left box ele
        for (let i = top+1; i < bottom; i++) 
            bounds.push(<div className={[styles.box, styles.rocks].join(' ')} style={this.getStyle(left, i)} />)
        //gen top box ele
        for (let i = top+1; i < bottom; i++) 
            bounds.push(<div className={[styles.box, styles.rocks].join(' ')} style={this.getStyle(right, i)} />)

            console.log(bounds.length)
    return (
        <>
            {bounds}
        </>
        )
    }

    setDirection = (direction) => {
        this.setState({ direction })
    }

    render() {
        const { snake, direction, ate } = this.state;

        console.log(direction, snake)
        const bg = {
            backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/000/120/896/non_2x/beautiful-illustrations-of-tropical-jungle-and-liana-vector.jpg')`,
            backgroundSize: '100% 100%'
        }

        const score = {
            // position: 'fixed',
            // top: 0,
            // left: 0,
            // right: 0,
            textAlign : 'center',
            background: 'black',
            color: 'white',
            width: '150px',
            // margin: 'auto',
            marginBottom: '20px',
            padding: '5px'
        }

        const disabled = {
            pointerEvents: 'none',
            opacity: 0.6
        }
        return (
            <div className={styles.game} style={bg}>
                <div style={score}>Food : {ate} / {Food.length}</div>
                <div className={styles.board} style={{width: (Boundary.right+1)*Side, height: (Boundary.bottom+1)*Side}}>
                    {
                        snake.map(arr =>
                            <div className={[styles.box, styles.snake].join(' ')} style={this.getStyle(arr[0], arr[1])}>
                                s
                            </div>
                        )
                    }
                    {this.getBoundary()}
                    {
                        ate < Food.length &&
                        <div className={[styles.box, styles.food].join(' ')} style={this.getStyle(Food[ate][0], Food[ate][1])}>
                          f
                       </div>
                    }
                </div>
                <div className={styles.controls}>
                    <div className={styles.up} style={direction==='down'?disabled: {}} onClick={()=>this.setDirection('up')}>up</div>
                    <div className={styles.left} style={direction==='right'?disabled: {}} onClick={()=>this.setDirection('left')}>Left</div>
                    <div className={styles.right} style={direction==='left'?disabled: {}} onClick={()=>this.setDirection('right')}>right</div>
                    <div className={styles.down} style={direction==='up'?disabled: {}} onClick={()=>this.setDirection('down')}>down</div>
                </div>
            </div>
        );
    }
}

export default Snake;