import React from "react";
import {  defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import "./chart.css"; // Assuming you meant to use a relative path

import revenueData from "./revenueData.json";

defaults.maintainAspectRatio = false;
defaults.responsive = true;


export const LineChartInsight = () => {
  return (
    <div className="Chart-Main">
      <div className="dataCard revenueCard">
        <Line
          data={{
            labels: revenueData.map((data) => data.label),
            datasets: [
              {
                label: "Ticket Sold",
                data: revenueData.map((data) => data.revenue),
                backgroundColor: "#064FF0",
                borderColor: "#064FF0",
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default LineChartInsight;
