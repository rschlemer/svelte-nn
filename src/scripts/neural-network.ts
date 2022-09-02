import { Layer } from './layer';
import type { DataPoint } from './data-point';

export class NeuralNetwork {
    layers: Layer[];
    layerSizes: number[];

    cost: any;

    batchLearnData: NetworkLearnData[];

    constructor(layerSizes: number[]) {
        this.layerSizes = layerSizes;
        this.layers = Array(layerSizes.length - 1);
        for (let i = 0; i < this.layers.length; i++) {
            this.layers[i] = new Layer(this.layerSizes[i], this.layerSizes[i + 1]);
        }
    }

    calculateOutputs(inputs: number[]): number[] {
        this.layers.forEach(layer => {
            inputs = layer.calculateOutputs(inputs);
        });
        return inputs;
    }

    classify(inputs: number[]): [number, number[]] {
        let outputs = this.calculateOutputs(inputs);
        let predictedClass = outputs.indexOf(Math.max(...outputs));
        return [predictedClass, outputs];
    }

    lossFunction(dataPoint: DataPoint): number {
        const outputs = this.calculateOutputs(dataPoint.inputs);
        const outputLayer = this.layers[this.layers.length - 1];
        let loss = 0;
        for (let nodeOut = 0; nodeOut < outputs.length; nodeOut++) {
            loss += outputLayer.nodeCost(outputs[nodeOut], dataPoint.expectedOutputs[nodeOut]);
        }
        return loss;
    }

    // cost(data: DataPoint[]) {
    //     let totalCost = 0;

    //     data.forEach(dataPoint => {
    //         totalCost += this.lossFunction(dataPoint);
    //     });

    //     return totalCost / data.length;
    // }

    learn(trainingData: DataPoint[], learnRate: number, regularization: number = 0, momentum: number = 0): void {
        if (this.batchLearnData == null || this.batchLearnData.length != trainingData.length) {

            // he is using batchlearndata.length but i think it should be training data
            for (let i = 0; i < trainingData.length; i++) {
                this.batchLearnData[i] = new NetworkLearnData(this.layers);
            }
        }
        for (let i = 0; i < trainingData.length; i++) {
            this.updateGradients(trainingData[i], this.batchLearnData[i]);
        }
        for (let i = 0; i < this.layers.length; i++) {
            // apply gradients
            //this.layers[i].ApplyGradients(learnRate / trainingData.Length, regularization, momentum);
        }
    }

    updateGradients(data: DataPoint, learnData: NetworkLearnData): void {
        let inputsToNextLayer: number[] = data.inputs;

        for (let i = 0; i < this.layers.length; i++) {
            inputsToNextLayer = this.layers[i].calculateOutputsLearn(inputsToNextLayer, learnData.layerData[i]);
        }

        let outputLayerIndex = this.layers.length - 1;
        let outputLayer = this.layers[outputLayerIndex];
        let outputLearnData = learnData.layerData[outputLayerIndex];

        outputLayer.calculateOutputLayerNodeValues(outputLearnData, data.expectedOutputs, this.cost);
        outputLayer.updateGradients(outputLearnData);

        for (let i = outputLayerIndex - 1; i >= 0; i--) {
            const layerLearnData = learnData.layerData[i];
            const hiddenLayer = this.layers[i];

            hiddenLayer.calculateHiddenLayerNodeValues(layerLearnData, this.layers[i + 1], learnData.layerData[i + 1].nodeValues);
            hiddenLayer.updateGradients(layerLearnData);
        }
    }
}

export class NetworkLearnData {
    layerData: LayerLearnData[];

    constructor(layers: Layer[]) {
        layers.forEach((i) => { this.layerData.push(new LayerLearnData(i)); });
    }
}

export class LayerLearnData {
    inputs: number[];
    weightedInputs: number[];
    activations: number[];
    nodeValues: number[];

    constructor(layer: Layer) {
        this.weightedInputs = Array(layer.numNodesOut);
        this.activations = Array(layer.numNodesOut);
        this.nodeValues = Array(layer.numNodesOut);
    }
}