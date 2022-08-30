export class Layer {
    numNodesIn: number;
    numNodesOut: number;
    weights: Array<number>;
    biases: Array<number>;

    costGradientWeights: Array<number>;
    costGradientBiases: Array<number>;

    weightVelocities: Array<number>;
    biasVelocities: Array<number>;

    constructor(numNodesIn: number, numNodesOut: number) {
        this.numNodesIn = numNodesIn;
        this.numNodesOut = numNodesOut;
        this.initializeRandomWeights();

        // create starting weights and biases between -1 and 1
        // weights is a 2d array with number of input nodes as rows and 
        // number of output nodes as columns
        // biases is a 1d array with length equal to the number of output nodes
        // this.weights = [...Array(numNodesIn)].map(
        //     () => Array.from(
        //         { length: numNodesOut },
        //         () => Math.random() * 2 - 1)
        // );
        // this.biases = Array.from(
        //     { length: numNodesOut },
        //     () => Math.random() * 2 - 1
        // );
    }

    calculateOutputs(inputs: Array<number>): Array<number> {
        let activations = [this.numNodesOut];
        for (let nodeOut = 0; nodeOut < this.numNodesOut; nodeOut++) {
            let weightedInput = this.biases[nodeOut];
            for (let nodeIn = 0; nodeIn < this.numNodesIn; nodeIn++) {
                weightedInput += inputs[nodeIn] * this.weights[nodeIn][nodeOut];
            }
            activations[nodeOut] = this.activationFunction(weightedInput);
        }
        return activations;
    }

    // CalculateOutputLayerNodeValues(expectedOutputs: Array<number>): Array<number> {
    //     const nodeValues = Array(expectedOutputs.length);

    //     for (let i = 0; i < nodeValues.length; i++) {
    //         const costDerivative = this.NodeCostDerivative(this.activations[i], expectedOutputs[i]);
    //         const activationDerivatitve = this.ActivationDerivative(this.weightedInputs[i]);
    //         nodeValues[i] = costDerivative * activationDerivatitve;
    //     }
    //     return nodeValues;
    // }

    // CalculateHiddenLayerNodeValues() {

    // }

    applyGradients(learnRate: number, regularization: number, momentum: number): void {
        const weightDecay: number = (1 - regularization * learnRate);

        // update weights based on cost gradients, then reset gradients to zero
        for (let i = 0; i < this.weights.length; i++) {
            const weight = this.weights[i];
            const velocity = this.weightVelocities[i] * momentum - this.costGradientWeights[i] * learnRate;
            this.weightVelocities[i] = weight * weightDecay + velocity;
            this.costGradientWeights[i] = 0;
        }

        // update biases based on cost gradients, then reset biases to zero
        for (let i = 0; i < this.biases.length; i++) {
            const velocity = this.biasVelocities[i] * momentum - this.costGradientBiases[i] * learnRate;
            this.biasVelocities[i] = velocity;
            this.biases[i] += velocity;
            this.costGradientBiases[i] = 0;
        }
    }

    // UpdateGradients(nodeValues: Array<number>): void {
    //     for (let nodeOut = 0; nodeOut < this.numNodesOut; nodeOut++) {
    //         for (let nodeIn = 0; nodeIn < this.numNodesIn; nodeIn++) {
    //             const derivativeCostWeight = this.inputs[nodeIn] * nodeValues[nodeOut];
    //             this.costGradientWeights[nodeIn][nodeOut] += derivativeCostWeight;
    //         }
    //         const derivativeCostBias = 1 * nodeValues[nodeOut];
    //         this.costGradientBiases[nodeOut] = derivativeCostBias;
    //     }
    // }

    activationFunction(weightedInput: number): number {
        return 1 / (1 + Math.exp(weightedInput));
    }

    activationDerivative(weightedInput: number): number {
        const activation = this.activationFunction(weightedInput);
        return activation * (1 - activation);
    }

    nodeCost(outputActivation: number, expectedOutput: number): number {
        const error = outputActivation - expectedOutput;
        return error * error;
    }

    nodeCostDerivative(outputActivation: number, expectedOutput: number): number {
        return 2 * (outputActivation - expectedOutput);
    }

    initializeRandomWeights() {
        this.weights = Array.from({ length: this.numNodesIn * this.numNodesOut }, () => Math.random() * 2 - 1);
    }
}
