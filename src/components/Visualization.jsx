import React from "react";
import { LineChart, ScatterChart, RadarChart, PolarGrid, PolarAngleAxis, Radar, Scatter, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";

const Visualization = ({ data }) => {
  const bedroomsData = {};
  data.forEach((item) => {
    if (!bedroomsData[item.bedrooms]) bedroomsData[item.bedrooms] = { bedrooms: item.bedrooms, price: 0, count: 0 };
    bedroomsData[item.bedrooms].price += item.price;
    bedroomsData[item.bedrooms].count += 1;
  });

  const bedroomsAvgPrice = Object.values(bedroomsData).map(item => ({
    bedrooms: item.bedrooms,
    avgPrice: item.price / item.count
  }));

  return (
    <div className="chart-container">
      <div className="row">
        <div className="col-md-6">
          <h4>📊 Historical Price Trends</h4>
          <LineChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="property" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#8884d8" name="Historical Prices" />
          </LineChart>
        </div>

        <div className="col-md-6">
          <h4>🌍 Location-based Price Comparison</h4>
          <RadarChart width={500} height={400} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="location" />
            <Radar name="Price" dataKey="price" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Tooltip />
          </RadarChart>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h4>📈 Price vs. Area</h4>
          <ScatterChart width={600} height={300}>
            <CartesianGrid />
            <XAxis type="number" dataKey="area" name="Area (sq ft)" />
            <YAxis type="number" dataKey="price" name="Price ($)" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="Price vs. Area" data={data} fill="#8884d8" />
          </ScatterChart>
        </div>
        <div className="col-md-6">
          <h4>🏠 Average Price per Bedroom Count</h4>
          <BarChart width={600} height={300} data={bedroomsAvgPrice}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="bedrooms" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="avgPrice" fill="#82ca9d" name="Avg Price per Bedroom" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Visualization;
