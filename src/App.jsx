import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import PredictionResult from "./components/PredictionResult";
import Visualization from "./components/Visualization";
import { predictPrice, trainModel } from "./Training/NeuralNet";
import "bootstrap/dist/css/bootstrap.min.css";
import dataSet from "./utils/real_estate_data.json";

const App = () => {
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [chartData, setChartData] = useState(dataSet);
  const [formData, setFormData] = useState({
    area: "",
    bedrooms: "",
    bathrooms: "",
    location: "Downtown", // Default location
    age: "",
  });

  const handlePrediction = (formData) => {
    const price = predictPrice(formData);
    setPredictedPrice(price);

    setChartData([
      ...chartData,
      {
        area: formData.area,
        bedrooms: formData.bedrooms,
        bathrooms: formData.App,
        location: formData.location,
        age: formData.age,
        price: price
      },
    ]);
  };

  return (
    <div className="app-container">
      <Sidebar onPredict={handlePrediction} formData={formData} setFormData={setFormData} />
      <div className="main">
        <PredictionResult predictedPrice={predictedPrice} />
        {chartData.length > 0 && <Visualization data={chartData} />}
      </div>
    </div>
  );
};

export default App;
