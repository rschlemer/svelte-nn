import { Sigmoid, type IActivation } from "./activation";
import type { LayerLearnData } from "./neural-network";

export class Layer {
    numNodesIn: number;
    numNodesOut: number;
    weights: number[];
    biases: number[];

    costGradientWeights: number[];
    costGradientBiases: number[];

    weightVelocities: number[];
    biasVelocities: number[];

    activation: IActivation;

    constructor(numNodesIn: number, numNodesOut: number) {
        this.numNodesIn = numNodesIn;
        this.numNodesOut = numNodesOut;
        this.activation = new Sigmoid();

        this.weights = Array(numNodesIn * numNodesOut);
        this.costGradientWeights = Array(this.weights.length);
        this.biases = Array(numNodesOut);
        this.costGradientBiases = Array(this.biases.length);

        this.weightVelocities = Array(this.weights.length);
        this.biasVelocities = Array(this.biases.length);

        this.initializeRandomWeights();
    }

    calculateOutputs(inputs: number[]): number[] {
        let weightedInputs = Array(this.numNodesOut);


        for (let nodeOut = 0; nodeOut < this.numNodesOut; nodeOut++) {
            let weightedInput = this.biases[nodeOut];

            for (let nodeIn = 0; nodeIn < this.numNodesIn; nodeIn++) {
                weightedInput += inputs[nodeIn] * this.getWeight(nodeIn, nodeOut);
            }
            weightedInputs[nodeOut] = weightedInput;
        }

        let activations = Array(this.numNodesOut);

        for (let outputNode = 0; outputNode < this.numNodesOut; outputNode++) {
            activations[outputNode] = this.activation.activate(weightedInputs, outputNode);
        }

        return activations;
    }

    calculateOutputsLearn(inputs: number[], learnData: LayerLearnData) {
        learnData.inputs = inputs;

        for (let nodeOut = 0; nodeOut < this.numNodesOut; nodeOut++) {
            let weightedInput = this.biases[nodeOut];
            for (let nodeIn = 0; nodeIn < this.numNodesIn; nodeIn++) {
                weightedInput += inputs[nodeIn] * this.getWeight(nodeIn, nodeOut);
            }
            learnData.weightedInputs[nodeOut] = weightedInput;
        }

        for (let i = 0; i < learnData.activations.length; i++) {
            learnData.activations[i] = this.activation.activate(learnData.weightedInputs, i);
        }
        return learnData.activations;
    }

    calculateOutputLayerNodeValues(layerLearnData: LayerLearnData, expectedOutputs: number[], cost: any): void {
        for (let i = 0; i < layerLearnData.nodeValues.length; i++) {
            const costDerivative = cost.CostDerivative(layerLearnData.activations[i], expectedOutputs[i]);
            const activationDerivatitve = this.activation.derivative(layerLearnData.weightedInputs, i);
            layerLearnData.nodeValues[i] = costDerivative * activationDerivatitve;
        }

    }

    calculateHiddenLayerNodeValues(layerLearnData: LayerLearnData, oldLayer: Layer, oldNodeValues: number[]) {
        for (let newNodeIndex = 0; newNodeIndex < this.numNodesOut; newNodeIndex++) {
            let newNodeValue = 0;
            for (let oldNodeIndex = 0; oldNodeIndex < oldNodeValues.length; oldNodeIndex++) {
                let weightedInputDerivative = oldLayer.getWeight(newNodeIndex, oldNodeIndex);
                newNodeValue += weightedInputDerivative * oldNodeValues[oldNodeIndex];
            }
            newNodeValue *= this.activation.derivative(layerLearnData.weightedInputs, newNodeIndex);
            layerLearnData.nodeValues[newNodeIndex] = newNodeValue;
        }
    }

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

    updateGradients(layerLearnData: LayerLearnData): void {
        for (let nodeOut = 0; nodeOut < this.numNodesOut; nodeOut++) {
            let nodeValue = layerLearnData.nodeValues[nodeOut];

            for (let nodeIn = 0; nodeIn < this.numNodesIn; nodeIn++) {
                const derivativeCostWeight = layerLearnData.inputs[nodeIn] * nodeValue;
                this.costGradientWeights[this.getFlatWeightIndex(nodeIn, nodeOut)] += derivativeCostWeight;
            }

            const derivativeCostBias = 1 * layerLearnData.nodeValues[nodeOut];
            this.costGradientBiases[nodeOut] += derivativeCostBias;
        }
    }


    getWeight(nodeIn: number, nodeOut: number) {
        let flatIndex = nodeOut * this.numNodesIn + nodeIn;
        return this.weights[flatIndex];
    }

    getFlatWeightIndex(inputNeuronIndex: number, outputNeuronIndex: number) {
        return outputNeuronIndex * this.numNodesIn + inputNeuronIndex;
    }

    initializeRandomWeights() {
        this.weights = Array.from({ length: this.numNodesIn * this.numNodesOut }, () => Math.random() * 2 - 1);
    }
}
