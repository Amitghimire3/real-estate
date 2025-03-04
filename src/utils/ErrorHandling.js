export const validateFormData = (data) => {
    let errors = {};
  
    if (!data.area || data.area <= 0) errors.area = "Area must be greater than 0.";
    if (!data.bedrooms || data.bedrooms < 1) errors.bedrooms = "Must have at least 1 bedroom.";
    if (!data.bathrooms || data.bathrooms < 1) errors.bathrooms = "Must have at least 1 bathroom.";
    if (!data.age || data.age < 0) errors.age = "Age must be a positive number.";
  
    return errors;
  };
  