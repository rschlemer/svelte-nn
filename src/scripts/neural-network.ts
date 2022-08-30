import { Layer } from './layer';
import type { DataPoint } from './data-point';

export class NeuralNetwork {
    layers: Array<Layer>;
    layerSizes: Array<number>;

    batchLearnData: Array<any>;

    constructor(layerSizes: Array<number>) {
        this.layerSizes = layerSizes;
        this.layers = Array(layerSizes.length - 1);
        for (let i = 0; i < this.layers.length; i++) {
            this.layers[i] = new Layer(this.layerSizes[i], this.layerSizes[i + 1]);
        }
    }

    calculateOutputs(inputs: Array<number>): Array<number> {
        this.layers.forEach(layer => {
            inputs = layer.calculateOutputs(inputs);
        });
        return inputs;
    }

    classify(inputs: Array<number>): number {
        let outputs = this.calculateOutputs(inputs);
        return outputs.indexOf(Math.max(...outputs));
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

    cost(data: Array<DataPoint>) {
        let totalCost = 0;

        data.forEach(dataPoint => {
            totalCost += this.lossFunction(dataPoint);
        });

        return totalCost / data.length;
    }

    learn(trainingData: Array<DataPoint>, learnRate: number, regularization: number = 0, momentum: number = 0): void {
        if (this.batchLearnData == null || this.batchLearnData.length != trainingData.length) {
            // need to update this
            this.batchLearnData = Array(trainingData.length);
            for (let i = 0; i < this.batchLearnData.length; i++) {
                // this is wrong
                this.batchLearnData[i] = this.layers;
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

    updateGradients(data: DataPoint, learnData: any): void {
        this.calculateOutputs(data.inputs);
        const outputLayer = this.layers[this.layers.length - 1];
        // should nodeValues be a part of the NN?
        let nodeValues = outputLayer.CalculateOutputLayerNodeValues(dataPoint.expectedOutputs);
        outputLayer.UpdateGradients(nodeValues);
    }


}