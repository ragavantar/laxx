import React, { Component } from 'react';

import './styles.css';

const getDate = () => {
    const date = new Date()
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
}

class LC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: +new Date(),
            pl: true,
            script: [
                {
                    name: "Crude Oil",
                    hit: [],
                    value: 1000,
                    background: 'dimgrey'
                },
                {
                    name: "Natural Gas",
                    hit: [],
                    value: 1250,
                    background: 'peachpuff'
                },
                {
                    name: "Copper",
                    hit: [],
                    value: 2500,
                    background: 'sandybrown'
                },
                {
                    name: "Nickel",
                    hit: [],
                    value: 1500,
                    background: 'whitesmoke'
                },
                {
                    name: "Zinc",
                    hit: [],
                    value: 5000,
                    background: 'tan'
                },
                {
                    name: "Lead",
                    hit: [],
                    value: 5000,
                    background: 'slategrey'
                },
                {
                    name: "Aluminium",
                    hit: [],
                    value: 5000,
                    background: 'steelblue'
                }
            ]
        }
    }

    updateValue = (index, name, value) => {
        let { script } = this.state;
        script[index][name] = value;
        this.setState({
            script
        })
    }

    onHit = (index, name, type) => {
        let { script } = this.state;

        let points = 0;

        if (name === 'sl') {
            points = type === 'buy' ? script[index][name] - script[index]['ba'] : script[index]['sb'] - script[index][name]
        }
        else {
            points = type === 'buy' ? script[index][name] - script[index]['ba'] : script[index]['sb'] - script[index][name]
        }
        const value = points * script[index]['value'];

        if (script[index]['hit'].includes(name)) {
            // remove from array
            script[index]['hit'] = script[index]['hit'].filter(e => e !== name)
            // update the pl
            if (type === 'buy')
                script[index]['pl'] -= value
            else
                script[index]['pl'] += value
        } else {
            // add to array
            script[index]['hit'].push(name);
            // update the pl
            script[index]['pl'] = script[index]['pl'] || 0;
            if (type === 'buy')
                script[index]['pl'] += value
            else
                script[index]['pl'] -= value
        }

        this.setState({ script })
    }

    handleSL = (index, name, type) => {
        let { script } = this.state;

        const points = type === 'buy' ? script[index]['ba'] - script[index]['sl'] : script[index]['sl'] - script[index]['sb']
        const value = points * script[index]['value'];

        if (script[index]['hit'].includes(name)) {
            // remove from array
            script[index]['hit'] = script[index]['hit'].filter(e => e !== name)

            script[index]['pl'] += value
        }
        else {
            // add to array
            script[index]['hit'].push(name);
            script[index]['pl'] = script[index]['pl'] || 0;
            script[index]['pl'] -= value
        }

        this.setState({ script })
    }

    render() {
        const { script, pl } = this.state;
        console.log(script)
        return (
            <div className="container">
                level chart
                <div className="chart">
                    <div className="col" style={{ background: 'seashell' }}>
                        <div className="target">{getDate()}</div>
                        <div className="target">Target 3</div>
                        <div className="target">Target 2</div>
                        <div className="target">Target 1</div>
                        <div className="target">Buy Above</div>
                        <div className="target">Stop Loss</div>
                        <div className="target">Sell Below</div>
                        <div className="target">Target 1</div>
                        <div className="target">Target 2</div>
                        <div className="target">Target 3</div>
                        {pl && <div className="target">P / L</div>}
                    </div>
                    {
                        script.map((val, index) =>
                            <div className="col" style={{ background: val.background }}>
                                <div>{val.name}</div>
                                <div><input className={val.hit.includes('bt3') ? 'hit' : undefined} onDoubleClick={() => this.onHit(index, 'bt3', 'buy')} type={'number'} value={val.bt3} onChange={(e) => this.updateValue(index, 'bt3', e.target.value)} /></div>
                                <div><input className={val.hit.includes('bt2') ? 'hit' : undefined} onDoubleClick={() => this.onHit(index, 'bt2', 'buy')} type={'number'} value={val.bt2} onChange={(e) => this.updateValue(index, 'bt2', e.target.value)} /></div>
                                <div><input className={val.hit.includes('bt1') ? 'hit' : undefined} onDoubleClick={() => this.onHit(index, 'bt1', 'buy')} type={'number'} value={val.bt1} onChange={(e) => this.updateValue(index, 'bt1', e.target.value)} /></div>
                                <div><input onDoubleClick={() => this.handleSL(index, 'ba', 'buy')} type={'number'} value={val.ba} onChange={(e) => this.updateValue(index, 'ba', e.target.value)} /></div>

                                <div><input className={val.hit.includes('ba') || val.hit.includes('sb') ? 'sl' : undefined} type={'number'} value={val.sl} onChange={(e) => this.updateValue(index, 'sl', e.target.value)} /></div>

                                <div><input onDoubleClick={() => this.handleSL(index, 'sb', 'sell')} type={'number'} value={val.sb} onChange={(e) => this.updateValue(index, 'sb', e.target.value)} /></div>
                                <div><input className={val.hit.includes('st1') ? 'hit' : undefined} onDoubleClick={() => this.onHit(index, 'st1', 'sell')} type={'number'} value={val.st1} onChange={(e) => this.updateValue(index, 'st1', e.target.value)} /></div>
                                <div><input className={val.hit.includes('st2') ? 'hit' : undefined} onDoubleClick={() => this.onHit(index, 'st2', 'sell')} type={'number'} value={val.st2} onChange={(e) => this.updateValue(index, 'st2', e.target.value)} /></div>
                                <div><input className={val.hit.includes('st3') ? 'hit' : undefined} onDoubleClick={() => this.onHit(index, 'st3', 'sell')} type={'number'} value={val.st3} onChange={(e) => this.updateValue(index, 'st3', e.target.value)} /></div>
                                {pl && <div><input className="pl" value={val.pl} onChange={(e) => this.updateValue(index, 'pl', e.target.value)} /></div>}
                            </div>
                        )
                    }
                    {pl && <div className="total">
                        Total : &nbsp;
                        {
                            script.reduce((sum, comm) => sum + (comm.pl || 0), 0)
                        }
                    </div>
                    }
                    <div className="contact">
                        Contact : Rakesh 9265279666
                    </div>
                </div>

                <button onClick={() => this.setState({ pl: !pl })}>
                    Toggle pl
                </button>
                <div>
                    targets - double click - target hit
                    <br />
                    ba - double click - buy side sl hit
                    <br />
                    sb - double click - sell side sl hit
                </div>
            </div>
        );
    }
}

export default LC;