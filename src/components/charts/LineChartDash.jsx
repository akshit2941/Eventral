import React from "react";
import {  defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import "./chart.css"; // Assuming you meant to use a relative path

import revenueData from "./revenueDataDash.json";

defaults.maintainAspectRatio = false;
defaults.responsive = true;


export const LineChartInsightDash = () => {
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
                backgroundColor: "#E2F4C5",
                borderColor: "#496989",
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

export default LineChartInsightDash;
