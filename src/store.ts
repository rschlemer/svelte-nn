import { writable, derived, type Writable } from 'svelte/store';
import { DataPoint } from './scripts/layer';
import temp_data from './assets/data_test.json';

export const weight1 = writable(0);
export const weight2 = writable(0);
export let weight_1_1 = writable(0.1), weight_2_1 = writable(0.1), weight_1_2 = writable(0), weight_2_2 = writable(0);

export let lineData = derived([weight_1_1, weight_2_1], ([$weight_1_1, $weight_2_1]) => {
    function f(x) {
        const b = 0.00001;
        return (-(b / $weight_2_1) / (b / $weight_1_1)) * x + -b / $weight_2_1;
    }
    let arr = [];
    for (let i = 0; i < 26; i++) {
        arr.push({ x: i, y: f(i) })
    }
    return arr
})


/*
function lineFunction(x: number): number {
    return (225 - x * x) ** (1 / 2);
}

let temp_data = [];
for (let i = 0; i < 75; i++) {
    const x = Math.random() * 25
    const y = Math.random() * 25
    let check = lineFunction(x)
    let output = [0, 0]
    if (y < check) {
        output[0] = 1
    } else {
        output[1] = 1
    }
    temp_data.push(new DataPoint([x, y], output));
}
console.log(temp_data)
*/
export const data = writable(temp_data)