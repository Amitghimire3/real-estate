import fs from 'fs';

const generateData = (numRecords) => {
  const locations = ['Urban', 'Suburban', 'Rural'];
  let data = [];

  for (let i = 0; i < numRecords; i++) {
    const area = Math.floor(Math.random() * (5000 - 500) + 500); // Area between 500 and 5000 sq ft
    const bedrooms = Math.floor(Math.random() * (5 - 1) + 1); // Bedrooms between 1 and 5
    const bathrooms = Math.floor(Math.random() * (4 - 1) + 1); // Bathrooms between 1 and 4
    const location = locations[Math.floor(Math.random() * locations.length)];
    const age = Math.floor(Math.random() * (50 - 1) + 1); // Age between 1 and 50 years

    // The price formula (rough estimate based on area, bedrooms, etc.)
    const price = area * 100 + bedrooms * 10000 + bathrooms * 5000 + (location === 'Urban' ? 50000 : location === 'Suburban' ? 20000 : 0) - age * 500;

    data.push({
      area,
      bedrooms,
      bathrooms,
      location,
      age,
      price
    });
  }

  return data;
};

// Generate 100 records and save to a file
const dataset = generateData(100);
fs.writeFileSync('real_estate_data.json', JSON.stringify(dataset, null, 2));
console.log('Synthetic real estate data generated!');
