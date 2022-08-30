export class DataPoint {
    inputs: Array<number>;
    expectedOutputs: Array<number>;
    constructor(inputs: Array<number>, expectedOutputs: Array<number>) {
        this.inputs = inputs;
        this.expectedOutputs = expectedOutputs;
    }
}
