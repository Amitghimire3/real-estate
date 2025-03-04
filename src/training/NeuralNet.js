import * as brain from "brain.js";
import dataSet from "../utils/real_estate_data.json";
import {normalizeData} from "../utils/Processor";

const net = new brain.NeuralNetwork();

export const trainModel = () => {
  debugger;
  const formattedData = dataSet.map((item) => ({
    input: normalizeData(item),
    output: { price: item.price / 1000000 },
  }));

  net.train(formattedData, { iterations: 2000 });

  localStorage.setItem("trainedModel", JSON.stringify(net.toJSON()));
};

export const predictPrice = (inputData) => {
  const savedModel = JSON.parse(localStorage.getItem("trainedModel"));
  if (savedModel) {
    net.fromJSON(savedModel);
  }
  else {
    trainModel();
  }

  const normalizedInput = normalizeData(inputData);

  const output = net.run(normalizedInput);
  return output.price * 1000000;
};
