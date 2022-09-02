export interface ICost {
    costFunction(predictedOuputs: number[], expectedOutputs: number[]): number;
    costDerivative(predictedOuput: number, expectedOutput: number): number;
    costFunctionType(): CostType;
}

enum CostType {
    MeanSquareError,
    CrossEntropy
}

export class MeanSquareError implements ICost {
    costFunction(predictedOuputs: number[], expectedOutputs: number[]): number {
        let cost = 0;
        for (let i = 0; i < predictedOuputs.length; i++) {
            let error = predictedOuputs[i] - expectedOutputs[i];
            cost += error * error;
        }
        return 0.5 * cost;
    }
    costDerivative(predictedOuput: number, expectedOutput: number): number {
        return predictedOuput - expectedOutput;
    }
    costFunctionType(): CostType {
        return CostType.MeanSquareError;
    }
}

export class CrossEntropy implements ICost {
    costFunction(predictedOuputs: number[], expectedOutputs: number[]): number {
        let cost = 0;
        for (let i = 0; i < predictedOuputs.length; i++) {
            let x = predictedOuputs[i];
            let y = expectedOutputs[i];
            let v = y == 1 ? -Math.log(x) : -Math.log(1 - x);
            cost += isNaN(v) ? 0 : v;
        }
        return cost;
    }
    costDerivative(predictedOuput: number, expectedOutput: number): number {
        let x = predictedOuput;
        let y = expectedOutput;
        if (x == 0 || x == 1) {
            return 0;
        }
        return (-x + y) / (x * (x - 1));
    }
    costFunctionType(): CostType {
        return CostType.CrossEntropy;
    }
}