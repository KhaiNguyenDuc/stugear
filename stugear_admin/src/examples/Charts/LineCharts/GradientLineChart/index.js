import { useRef, useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import gradientChartLine from "assets/theme/functions/gradientChartLine";
import configs from "examples/Charts/LineCharts/GradientLineChart/configs";
import colors from "assets/theme/base/colors";
import { CircularProgress } from "@mui/material";

function GradientLineChart({ title, description, height, chart }) {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({});
  const { data, options } = chartData;
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const chartDatasets = chart.datasets
      ? chart.datasets.map((dataset) => ({
          ...dataset,
          tension: 0.4,
          pointRadius: 0,
          borderWidth: 3,
          borderColor: colors[dataset.color]
            ? colors[dataset.color || "dark"].main
            : colors.dark.main,
          fill: true,
          maxBarThickness: 6,
          // backgroundColor: gradientChartLine(
          //   chartRef.current,
          //   colors[dataset.color] ? colors[dataset.color || "dark"].main : colors.dark.main
          // ),
        }))
      : [];
    setChartData(configs(chart.labels || [], chartDatasets));
    setLoading(false);
  }, [chart]);

  const memoizedChart = useMemo(() => (
    <SoftBox ref={chartRef} sx={{ height }}>
      <Line data={data} options={options} />
    </SoftBox>
  ), [chartData, height]);

  return (
    <Card>
      <SoftBox p={2}>
        {title || description ? (
          <SoftBox px={description ? 1 : 0} pt={description ? 1 : 0}>
            {title && (
              <SoftBox mb={1}>
                <SoftTypography variant="h6">{title}</SoftTypography>
              </SoftBox>
            )}
            <SoftBox mb={2}>
              <SoftTypography component="div" variant="button" fontWeight="regular" color="text">
                {description}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        ) : null}
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
            <CircularProgress />
          </div>
        ) : (
          memoizedChart
        )}
      </SoftBox>
    </Card>
  );
}

// Setting default values for the props of GradientLineChart
GradientLineChart.defaultProps = {
  title: "",
  description: "",
  height: "19.125rem",
};


export default GradientLineChart;
