import React from "react";

const PredictionResult = ({ predictedPrice }) => {
  return (
    <div className="result">
      <h2>Predicted Price: {predictedPrice && <span>${predictedPrice.toLocaleString()}</span>}</h2>
    </div>
  );
};

export default PredictionResult;
