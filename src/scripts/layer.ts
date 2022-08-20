//#!/usr/bin/env node

//import { matrix } from 'mathjs';

//import { exp } from "mathjs";

export class Layer {
    numNodesIn: number;
    numNodesOut: number;
    weights: Array<Array<number>>;
    biases: Array<number>;

    constructor(numNodesIn: number, numNodesOut: number) {
        this.numNodesIn = numNodesIn;
        this.numNodesOut = numNodesOut;

        // create starting weights and biases between -1 and 1
        // weights is a 2d array with number of input nodes as rows and 
        // number of output nodes as columns
        // biases is a 1d array with length equal to the number of output nodes
        this.weights = [...Array(numNodesIn)].map(
            () => Array.from(
                { length: numNodesOut },
                () => Math.random() * 2 - 1)
        );
        this.biases = Array.from(
            { length: numNodesOut },
            () => Math.random() * 2 - 1
        );
    }

    CalculateOutputs(inputs: Array<number>): Array<number> {
        let activations = [this.numNodesOut]
        for (let nodeOut = 0; nodeOut < this.numNodesOut; nodeOut++) {
            let weightedInput = this.biases[nodeOut];
            for (let nodeIn = 0; nodeIn < this.numNodesIn; nodeIn++) {
                weightedInput += inputs[nodeIn] * this.weights[nodeIn][nodeOut];
            }
            activations[nodeOut] = this.ActivationFunction(weightedInput);
        }
        return activations;
    }

    CalculateOutputLayerNodeValues(expectedOutputs: Array<number>): Array<number> {
        const nodeValues = Array(expectedOutputs.length);

        for (let i = 0; i < nodeValues.length; i++) {
            const costDerivative = this.NodeCostDerivative(this.activations[i], expectedOutputs[i]);
            const activationDerivatitve = this.ActivationDerivative(this.weightedInputs[i]);
            nodeValues[i] = costDerivative * activationDerivatitve;
        }
        return nodeValues;
    }

    CalculateHiddenLayerNodeValues() {

    }

    UpdateGradients(nodeValues: Array<number>): void {
        for (let nodeOut = 0; nodeOut < this.numNodesOut; nodeOut++) {
            for (let nodeIn = 0; nodeIn < this.numNodesIn; nodeIn++) {
                const derivativeCostWeight = this.inputs[nodeIn] * nodeValues[nodeOut];
                this.costGradientWeights[nodeIn][nodeOut] += derivativeCostWeight;
            }
            const derivativeCostBias = 1 * nodeValues[nodeOut];
            this.costGradientBiases[nodeOut] = derivativeCostBias;
        }
    }

    ActivationFunction(weightedInput: number): number {
        return 1 / (1 + Math.exp(weightedInput));
    }

    ActivationDerivative(weightedInput: number): number {
        const activation = this.ActivationFunction(weightedInput);
        return activation * (1 - activation);
    }

    NodeCost(outputActivation: number, expectedOutput: number): number {
        const error = outputActivation - expectedOutput;
        return error * error;
    }

    NodeCostDerivative(outputActivation: number, expectedOutput: number): number {
        return 2 * (outputActivation - expectedOutput);
    }
}

export class DataPoint {
    inputs: Array<number>;
    expectedOutputs: Array<number>;
    constructor(inputs: Array<number>, expectedOutputs: Array<number>) {
        this.inputs = inputs;
        this.expectedOutputs = expectedOutputs;
    }
}

export class NeuralNetwork {
    layers: Array<Layer>;

    constructor(layerSizes: Array<number>) {
        this.layers = Array(layerSizes.length - 1)
        for (let i = 0; i < this.layers.length; i++) {
            this.layers[i] = new Layer(layerSizes[i], layerSizes[i + 1]);
        }
    }

    CalculateOutputs(inputs: Array<number>): Array<number> {
        this.layers.forEach(layer => {
            inputs = layer.CalculateOutputs(inputs);
        });
        return inputs;
    }

    Classify(inputs: Array<number>): number {
        let outputs = this.CalculateOutputs(inputs);
        return outputs.indexOf(Math.max(...outputs));
    }

    LossFunction(dataPoint: DataPoint): number {
        const outputs = this.CalculateOutputs(dataPoint.inputs);
        const outputLayer = this.layers[this.layers.length - 1];
        let loss = 0;
        for (let nodeOut = 0; nodeOut < outputs.length; nodeOut++) {
            loss += outputLayer.NodeCost(outputs[nodeOut], dataPoint.expectedOutputs[nodeOut])
        }
        return loss;
    }

    Cost(data: Array<DataPoint>) {
        let totalCost = 0;

        data.forEach(dataPoint => {
            totalCost += this.LossFunction(dataPoint);
        })

        return totalCost / data.length;
    }

    Learn(trainingData: Array<DataPoint>, learnRate: number): void {
        const h = 0.000001;
        //let originalCost = Cost
    }

    UpdateAllGradients(dataPoint: DataPoint): void {
        this.CalculateOutputs(dataPoint.inputs);
        const outputLayer = this.layers[this.layers.length - 1];
        // should nodeValues be a part of the NN?
        let nodeValues = outputLayer.CalculateOutputLayerNodeValues(dataPoint.expectedOutputs);
        outputLayer.UpdateGradients(nodeValues);
    }


}



//const nn = new NeuralNetwork([2, 3, 2]);
//console.log(nn.Classify([0.25, 0.16]));