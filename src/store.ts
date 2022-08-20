import { writable } from 'svelte/store';
import { DataPoint } from './scripts/layer';
import temp_data from './assets/data_test.json';

export const weight1 = writable(0);
export const weight2 = writable(0);

/*let temp_data = [];
for (let i = 0; i < 50; i++) {
    const x = Math.random() * 25
    const y = Math.random() * 25
    let output = [0, 0]
    if (y < 8 && x < 11) {
        output[0] = 1
    } else {
        output[1] = 1
    }
    temp_data.push(new DataPoint([x, y], output));
}*/

export const data = writable(temp_data)