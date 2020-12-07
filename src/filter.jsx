import React from 'react';
import data from './query_results_full.json'

const Filter = () => {

    let set = [];
    let counter = [];
    const r = data.map(({ screen_url }) => {
        const [a, b, c, d, e] = screen_url.split('/');
        if (b === 'growth' || d === 'growth') {
            const v2 = d === 'growth' ? e : c;
            const [k] = v2 ? v2.split('?') : ['']
            const val = `/${b}/` + k;
            if (!set.includes(val)) {
                set.push(val)
                counter[set.length - 1] = 1;
            }
            else {
                const i = set.indexOf(val);
                counter[i] = counter[i] + 1;
            }
        }
    })

    return (
        <div>
            sum : {counter.reduce((a, b) => a + b, 0)}
            <ol>
                {
                    set.map((val, i) => counter[i] >= 0 && <li>{val} - {counter[i]}</li>)
                }
            </ol>
        </div>
    );
}

export default Filter;