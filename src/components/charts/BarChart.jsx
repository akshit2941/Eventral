import React from "react";
import { defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "./chart.css"; // Assuming you meant to use a relative path

import sourceData from "./sourceData.json";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

export const BarChartInsight = () => {
  return (
    <div className="Chart-Main">
      <div className="dataCard customerCard">
        <Bar
          data={{
            labels: sourceData.map((data) => data.label),
            datasets: [
              {
                label: "Count",
                data: sourceData.map((data) => data.value),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                ],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Revenue Source",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BarChartInsight;
