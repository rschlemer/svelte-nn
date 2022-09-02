export interface IActivation {
    activate(inputs: number[], index: number): number;
    derivative(inputs: number[], index: number): number;
    getActivationType(): ActivationType;
}

enum ActivationType {
    Sigmoid, ReLU
}

export class Sigmoid implements IActivation {
    activate(inputs: number[], index: number): number {
        return 1 / (1 + Math.exp(-inputs[index]));
    }
    derivative(inputs: number[], index: number): number {
        let a = this.activate(inputs, index);
        return a * (1 - a);
    }
    getActivationType(): ActivationType {
        return ActivationType.Sigmoid;
    }
}

export class ReLU implements IActivation {
    activate(inputs: number[], index: number): number {
        return Math.max(0, inputs[index]);
    }
    derivative(inputs: number[], index: number): number {
        return inputs[index] > 0 ? 1 : 0;
    }
    getActivationType(): ActivationType {
        return ActivationType.ReLU;
    }
}