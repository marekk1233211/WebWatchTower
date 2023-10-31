import { useEffect } from "react";
import Chart from "chart.js/auto";

const WhatCountryChartType = ({ userDataList, chartId }) => {
  useEffect(() => {
    const fetchDataAndRenderChart = async () => {
      // Tutaj umieść kod do pobierania danych asynchronicznie, np. z API
      const data = [];
      userDataList.forEach((userData) => {
        const location = userData.location;
        data.push({ country: `${location}`, visits: 1 });
      });
      const consolidatedData = data.reduce((acc, entry) => {
        const existingEntry = acc.find(
          (item) => item.country === entry.country
        );
        if (existingEntry) {
          existingEntry.visits += 1;
        } else {
          acc.push(entry);
        }
        return acc;
      }, []);

      function createNewChart() {
        const ctx = document
          .getElementById(`chart-${chartId}`)
          .getContext("2d");
        if (ctx) {
          const existingChart = Chart.getChart(`chart-${chartId}`);
          if (existingChart) {
            existingChart.destroy();
          }
          new Chart(ctx, {
            type: "bar",
            data: {
              labels: consolidatedData.map((row) => row.country),
              datasets: [
                {
                  label: "visits per day",
                  data: consolidatedData.map((column) => column.visits),
                },
              ],
            },
            options: {
              maintainAspectRatio: false,
              scales: {
                x: {
                  ticks: { color: "rgba(255, 255, 255, 0.55)" },
                  grid: { color: "rgba(255, 255, 255, 0.15)" },
                  color: "rgba(255, 255, 255, 0.15)",
                },
                y: {
                  ticks: { color: "rgba(255, 255, 255, 0.55)" },
                  grid: { color: "rgba(255, 255, 255, 0.15)" },
                  beginAtZero: true,
                },
              },
              color: "rgba(255, 255, 255, 0.55)",
            },
            plugins: { fontColor: "rgba(255, 255, 255, 0.55)" },
          });
        }
      }
      createNewChart();
    };

    fetchDataAndRenderChart();
  }, [userDataList, chartId]);

  return (
    <canvas
      id={`chart-${chartId}`}
      style={{
        boxSizing: "border-box",
        display: "block",
        height: "300px",
        width: "300px",
      }}
    ></canvas>
  );
};

export default WhatCountryChartType;
