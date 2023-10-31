import { useEffect } from "react";
import Chart from "chart.js/auto";

const UserVisitsChart = ({ userDataList, chartId }) => {
  useEffect(() => {
    const fetchDataAndRenderChart = async () => {
      // Tutaj umieść kod do pobierania danych asynchronicznie, np. z API
      const data = [];
      userDataList.forEach((userData) => {
        const date = new Date(userData.date);
        const month = date.toLocaleString("default", { month: "short" });
        const day = date.getDate();
        data.push({ monthAndDay: `${month} ${day}`, visits: 1 });
      });
      const consolidatedData = data.reduce((acc, entry) => {
        const existingEntry = acc.find(
          (item) => item.monthAndDay === entry.monthAndDay
        );
        if (existingEntry) {
          existingEntry.visits += 1;
        } else {
          acc.push(entry);
        }
        return acc;
      }, []);
      consolidatedData.sort((a, b) => {
        const dateA = new Date(a.monthAndDay);
        const dateB = new Date(b.monthAndDay);
        return dateA - dateB;
      });

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
            type: "line",
            data: {
              labels: consolidatedData.map((row) => row.monthAndDay),
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

export default UserVisitsChart;
