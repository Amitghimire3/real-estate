export const normalizeData = (data) => {
  return {
    area: data.area / 1000, // Normalize area
    bedrooms: data.bedrooms / 10, // Normalize bedrooms
    bathrooms: data.bathrooms / 10, // Normalize bathrooms
    age: data.age / 100, // Normalize age
  };
};

export const denormalizePrice = (price) => {
  return price * 1000000; // Convert back to actual price
};
