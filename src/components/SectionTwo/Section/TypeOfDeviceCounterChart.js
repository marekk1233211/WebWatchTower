import { useEffect } from "react";
import Chart from "chart.js/auto";

const UserVisitsChart = ({ userDataList, chartId }) => {
  useEffect(() => {
    const fetchDataAndRenderChart = async () => {
      // Zlicz ilość wystąpień każdego typu urządzenia
      const deviceCounts = {};

      userDataList.forEach((userData) => {
        const deviceType = userData.deviceType;
        if (deviceCounts[deviceType]) {
          deviceCounts[deviceType]++;
        } else {
          deviceCounts[deviceType] = 1;
        }
      });

      const labels = Object.keys(deviceCounts);
      const data = Object.values(deviceCounts);

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
            type: "pie",
            data: {
              labels: labels,
              datasets: [
                {
                  label: "type of device quantity",
                  data: data,
                },
              ],
            },
            options: {
              maintainAspectRatio: false,
              elements: {
                arc: {
                  borderWidth: 1,
                },
              },
            },
          });
        }
      }

      createNewChart();
    };

    fetchDataAndRenderChart();
  }, [userDataList, chartId]);
  return <canvas id={`chart-${chartId}`}></canvas>;
};

export default UserVisitsChart;
