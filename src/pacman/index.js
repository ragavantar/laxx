import React, { Component } from 'react';

import styles from './styles.module.scss';


const Len = 10;
const Side = 30;
const Boundary = {
    top: 0,
    left: 0,
    // right: Math.floor(window.innerWidth/Side),
    right: 9,
    bottom: 9
}


class Pacman extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: Array.from(Array(Len).fill('0'), () => new Array(Len).fill('0')),
            direction: 'left',
            player: [5, 5],
            canMove: true,
            blocks: [
                [2, 2], [2, 3], [2, 4], [2, 5],
                [2, 7], [3, 7], [4, 7],
                [4, 4], [5, 4], [7, 4],
                [7, 2], [6, 2], [5, 2], [4, 2], [5, 1],
                [6, 6], [6, 7], [7, 6], [7, 7]
            ],
            enemy: 
                {
                index: 0,
                path: [
                    [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8]
                ]
            }, // lets make it as array for more
            count: 0
        }
    }

    componentDidMount() {
        this.constructBoundary();
        this.fillBlocks()

        let loopMe = setInterval(() => {
            if (this.state.canMove) {
                this.enemy();
                this.move();
            }
            // else
            //     clearInterval(loopMe)
        }, 500);
    }

    constructBoundary = () => {
        const { top, left, right, bottom } = Boundary;
        let { board } = this.state;

        //gen top box ele
        for (let i = left + 1; i < right; i++)
            board[i][top] = 'B'
        //gen bottom box ele
        for (let i = left + 1; i < right; i++)
            board[i][bottom] = 'B'
        //gen left box ele
        for (let i = top + 1; i < bottom; i++)
            board[left][i] = 'B'
        //gen right box ele
        for (let i = top + 1; i < bottom; i++)
            board[right][i] = 'B'

        this.setState({ board })
    }

    fillBlocks = () => {
        let { board, blocks } = this.state;

        blocks.map(e => board[e[0]][e[1]] = 'B');

        this.setState({ board });
    }

    enemy = () => {
        let player = this.state.player;
        let enemy = {...this.state.enemy};
        let { index, path } = enemy;

        index = (index + 1) % path.length;

        if (enemy.path[enemy.index][0]===player[0] && enemy.path[enemy.index][1]===player[1]) {
            this.setState({canMove: false})
            console.log('Enemy')
            alert('died')
        }else
        this.setState({ enemy: { index, path } })
    }

    move = () => {
        let { direction } = this.state;
        let player = [...this.state.player]

        // upadte player position
        if (direction === 'up')
            player[1]--
        else if (direction === 'down')
            player[1]++
        else if (direction === 'left')
            player[0]--
        else if (direction === 'right')
            player[0]++

        this.updateMove(player)
    }

    updateMove = (player) => {
        let { board, count } = this.state;

        let val = board[player[0]][player[1]];

        if (val === '0') {
            board[player[0]][player[1]] = ' ';
            count++;
            this.setState({ player, board, count });
        }
        else if(val ===' '){
            this.setState({ player, board });
        }
        else if (val === 'B') {
            console.log('Block')
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

    isPlayer = (i, j) => {
        const { player } = this.state;

        if (i === player[0] && j === player[1])
            return true;
        return false;
    }

    isPlayer = (i, j) => {
        const { player } = this.state;

        if (i === player[0] && j === player[1])
            return true;
        return false;
    }
    isEnemy = (i, j) => {
        const { index, path } = this.state.enemy;

        if (i === path[index][0] && j === path[index][1])
            return true;
        return false;
    }


    setDirection = (direction) => {
        this.setState({ direction, canMove: true })
    }

    getBlock = (val, i, j) => {
        if (this.isPlayer(i, j))
        return <div className={[styles.box, styles.player].join(' ')} style={this.getStyle(i, j)}>P</div>
        if (this.isEnemy(i, j))
        return <div className={[styles.box, styles.enemy].join(' ')} style={this.getStyle(i, j)}>E</div>
        if (val === '0')
            return <div className={[styles.box, styles.food].join(' ')} style={this.getStyle(i, j)}>0</div>
        if (val === 'B')
            return <div className={[styles.box, styles.rocks].join(' ')} style={this.getStyle(i, j)}>B</div>
    }

    render() {
        const { board, count } = this.state;
        const bg = {
            backgroundImage: `url('https://s3.envato.com/files/234687569/Halloween%20Game%20Background/Halloween%20BG%2001/Halloween%20Background%2001.png')`,
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

        return (
            <div className={styles.game} style={bg}>
                <div style={score}>Count : {count}</div>
                <div className={styles.board} style={{ width: Len * Side, height: Len * Side }}>
                    {
                        board.map((rows, i) =>
                            rows.map((cols, j) =>
                                this.getBlock(cols, i, j)
                            )
                        )
                    }
                </div>
                <div className={styles.controls}>
                    <div className={styles.up} onClick={() => this.setDirection('up')}>up</div>
                    <div className={styles.left} onClick={() => this.setDirection('left')}>Left</div>
                    <div className={styles.right} onClick={() => this.setDirection('right')}>right</div>
                    <div className={styles.down} onClick={() => this.setDirection('down')}>down</div>
                </div>
            </div>
        );
    }
}

export default Pacman;