export class DataPoint {
    inputs: number[];
    expectedOutputs: number[];
    constructor(inputs: number[], expectedOutputs: number[]) {
        this.inputs = inputs;
        this.expectedOutputs = expectedOutputs;
    }
}
