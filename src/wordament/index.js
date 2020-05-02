import React, { Component } from 'react';
import styles from './styles.module.scss';

const Width = 50;

class Wordament extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            board: [
                'A', 'B', 'C',
                'D', 'E', 'F', 
                'G', 'H', 'I'
            ],
            length: 3,
            words: ['BAD', 'BED', 'HI'],
            filled: '',
            active: [],
            touching: false,
            found: 0
         }
    }

    fillWords = (letter, i)=>{
        let { filled, active, touching } = this.state;
        if(!touching || active.includes(i) || i==="" || i===null || i<0) return;
        filled+=letter;
        if(!active.includes(i))
        active.push(i);
        this.setState({filled, active})
    }

    getElement = (e)=>{
        // console.log(e.touches[0]);
        // const {pageX, pageY} = e.touches[0];
        // let ele = document.elementFromPoint(pageX, pageY);
        const {clientX, clientY} = e.touches[0];
        let ele = document.elementFromPoint(clientX, clientY);
        if(ele)
        this.fillWords(ele.innerText, ele.id)
    }

    startTouch = ()=>{
        this.setState({touching: true})
    }

    endTouch = ()=>{
        this.setState({touching: false})
        this.checkWord()
    }

    checkWord = ()=>{
        let { words, active, filled, found } = this.state;
        if(words.includes(filled))
            found++;
        this.setState({filled: '', active: [], found})
        if(found === words.length)
            alert('completed')
    }

    render() { 
        const { board, length, words, filled, touching, active, found } = this.state;
        console.log(this.state)
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

        const bg = {
            backgroundImage: `url('https://img.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg')`,
            backgroundSize: '100% 100%'
        }

        return ( 
            <div style={bg} className={styles.game}>
                <div style={score}>Score : {found} / {words.length}</div>
                <div 
                className={styles.board} style={{width: Width*length}}
                onTouchStart={()=>this.startTouch()}
                onTouchEnd={()=>this.endTouch()}
                onTouchMove={(e)=>this.getElement(e)}
                >
                    {
                        board.map((e, i)=>
                            <div 
                            style={{width: Width, height: Width}} 
                            className={active.includes(i.toString())?styles.active: null}
                            onMouseEnter={()=>this.fillWords(e, i)}
                            onTouchMove={()=>this.fillWords(e, i)}
                            // onMouseMove={()=>this.fillWords(e, i)}
                            // onClick={()=>this.fillWords(e, i)}
                            key={i}
                            id={i}
                            >
                            {e}
                            </div>
                        )
                    }
                </div>
                {/* {touching}{active} */}
                {/* {filled} */}
                {/* {active.toString()} */}
                Find the words : 
                {
                    words.toString()
                }
            </div>
         );
    }
}
 
export default Wordament;