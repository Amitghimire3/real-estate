import dataset from '../utils/real_estate_data.json';
import * as brain from 'brain.js';

// Utility function to normalize the dataset
const normalizeData = (data) => {
  // Find min and max values for each feature
  let areaMin = Infinity, areaMax = -Infinity;
  let bedroomsMin = Infinity, bedroomsMax = -Infinity;
  let bathroomsMin = Infinity, bathroomsMax = -Infinity;
  let ageMin = Infinity, ageMax = -Infinity;

  data.forEach(item => {
    areaMin = Math.min(areaMin, item.area);
    areaMax = Math.max(areaMax, item.area);
    bedroomsMin = Math.min(bedroomsMin, item.bedrooms);
    bedroomsMax = Math.max(bedroomsMax, item.bedrooms);
    bathroomsMin = Math.min(bathroomsMin, item.bathrooms);
    bathroomsMax = Math.max(bathroomsMax, item.bathrooms);
    ageMin = Math.min(ageMin, item.age);
    ageMax = Math.max(ageMax, item.age);
  });

  // Normalize the dataset using min-max normalization
  return data.map(item => ({
    input: {
      area: (item.area - areaMin) / (areaMax - areaMin),
      bedrooms: (item.bedrooms - bedroomsMin) / (bedroomsMax - bedroomsMin),
      bathrooms: (item.bathrooms - bathroomsMin) / (bathroomsMax - bathroomsMin),
      location: item.location === 'Urban' ? 1 : item.location === 'Suburban' ? 0.5 : 0, // Encoding Location
      age: (item.age - ageMin) / (ageMax - ageMin)
    },
    output: {
      price: item.price // Output is the actual price (no need for normalization)
    }
  }));
};

// Save the trained model to LocalStorage
const saveModelToLocalStorage = (net) => {
    const modelJSON = net.toJSON();
    localStorage.setItem('real-estate-model', JSON.stringify(modelJSON));
};


// Normalize the raw data
const normalizedData = normalizeData(dataset);

// Create the neural network
const net = new brain.NeuralNetwork({
    hiddenLayers: [10, 10, 5], // Improves accuracy
});

// Train the neural network with the normalized data
net.train(normalizedData, {
  iterations: 20000, // Train for a sufficient number of iterations
  errorThresh: 0.005, // Acceptable error threshold
  log: true, // Log training progress
  logPeriod: 1000 // Log every 1000 iterations
});

// Save the trained model to LocalStorage
saveModelToLocalStorage(net);

console.log('Training completed!');

// Export the trained model
export default net;
