import temp_data from "../assets/data_test.json"

let weight_1_1: number, weight_2_1: number, weight_1_2: number, weight_2_2: number;

export function classify(input_1: number, input_2: number) {
    let output_1 = input_1 * weight_1_1 + input_2 * weight_2_1;
    let output_2 = input_1 * weight_1_2 + input_2 * weight_2_2;
    return (output_1 > output_2) ? 0 : input_1;
}

