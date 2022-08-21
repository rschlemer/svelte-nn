import { writable } from 'svelte/store';
import { DataPoint } from './scripts/layer';
import temp_data from './assets/data_test.json';

export const weight1 = writable(0);
export const weight2 = writable(0);
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