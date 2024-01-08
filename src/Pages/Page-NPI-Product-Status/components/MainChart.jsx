import React from "react";
import ReactApexChart from "react-apexcharts";

const MainChart = ({
  isDarkMode,
  rowsDataChart,
  countStatusLqN,
  countStatusLqY,
}) => {
  //   console.log("rowsDataChart in MainChart: ", rowsDataChart);

  const categoriesUniqueYear = Array.from(
    new Set(rowsDataChart.map((row) => row.flpm_year))
  ).filter((year) => year !== null);

  //   console.log("categoriesUniqueYear: ", categoriesUniqueYear);

  // const countStatusLqN = rowsDataChart.map((row) => row.status_lq_n);

  // const countStatusLqY = rowsDataChart.map((row) => row.status_lq_y);

  //   console.log("status_lq_n: ", countStatusLqN);
  //   console.log("status_lq_y", countStatusLqY);

  const chartOptions = {
    chart: {
      type: "bar",
      stacked: true,
      height: 350,
      stackType: "100%",
      foreColor: isDarkMode ? "#fff" : "#000",
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: isDarkMode ? ["#fff"] : ["#000"],
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    series: [
      {
        name: "Y",
        data: countStatusLqY,
      },
      {
        name: "N",
        data: countStatusLqN,
      },
    ],
    xaxis: {
      categories: categoriesUniqueYear,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetX: 40,
    },
    fill: {
      opacity: 0.75,
    },
    colors: ["#00E396", "#ef4444"],
  };

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={chartOptions.series}
        type="bar"
        height={320}
      />
    </div>
  );
};

export default MainChart;
