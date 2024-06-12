/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import { useEffect, useState } from "react";
import ThreadService from "services/ThreadService/ThreadService";
import ProductService from "services/ProductService/ProductService";
import ChartService from "services/ChartService/ChartService";
import { CircularProgress } from "@mui/material";


function Dashboard() {
  const { size } = typography;
  const [isLoading, setLoading] = useState(true);
  const [mostReplyThread, setMostReplyThread] = useState({});
  const [mostRecentThread, setMostRecentThread] = useState({});
  const [topRecentThread, setTopRecentThread] = useState();
  const [reportData, setReportData] = useState();
  const [linearData, setLinearData] = useState();
  const [recentEvent, setRecentEvent] = useState();
  const [generalStatus, setGeneralStatus] = useState({});
  
  const getMostReplyThread = async () => {
    const response = await ThreadService.getAllThreads(1, {
      status: "reply",
      tags: [],
      key: "",
      categories: [],
    });
    if(response?.status != 400){
      setMostReplyThread(response?.data[0]);
    }
  };
  const getMostRecentThread = async () => {
    const response = await ThreadService.getAllThreads(1, {
      status: "new",
      tags: [],
      key: "",
      categories: [],
    });
    if(response?.status != 400){
      setMostRecentThread(response?.data[0]);
      setTopRecentThread(response?.data);
    }
  };

  const getGeneralStatus = async () => {
    const response = await ProductService.getGeneralStatus();
    if(response?.status != 400){
      setGeneralStatus(response);
    }
  };
  
  const getChart = async () => {
    setLoading(true);

    // Get current month (1-indexed)
    const currentMonth = new Date().getMonth() + 1;

    const responseLinear = await ChartService.getLinearData();
    const responseReport = await ChartService.getReportData();

    if (responseLinear?.status !== 400 && responseReport?.status !== 400) {
        const linearData = responseLinear.data;
        const reportData = responseReport.data;

        let filteredLinearData, filteredReportData;

        if (currentMonth >= 6) {
            // Filter linear data from month 6 to month 12
            filteredLinearData = {
                labels: linearData.labels.slice(5),
                datasets: linearData.datasets.map(dataset => ({
                    ...dataset,
                    data: dataset.data.slice(5)
                }))
            };

            // Filter report data from month 6 to month 12
            filteredReportData = {
                chart: {
                    labels: reportData.chart.labels.slice(5),
                    datasets: {
                        label: reportData.chart.datasets.label,
                        data: reportData.chart.datasets.data.slice(5)
                    }
                },
                items: reportData.items
            };
        } else {
            // Filter linear data from month 1 to current month
            filteredLinearData = {
                labels: linearData.labels.slice(0, currentMonth),
                datasets: linearData.datasets.map(dataset => ({
                    ...dataset,
                    data: dataset.data.slice(0, currentMonth)
                }))
            };

            // Filter report data from month 1 to current month
            filteredReportData = {
                chart: {
                    labels: reportData.chart.labels.slice(0, currentMonth),
                    datasets: {
                        label: reportData.chart.datasets.label,
                        data: reportData.chart.datasets.data.slice(0, currentMonth)
                    }
                },
                items: reportData.items
            };
        }

        setLinearData(filteredLinearData);
        setReportData(filteredReportData);
    }

    setLoading(false);
}


  const getRecentEvent = async () => {
    const response = await ChartService.getRecentEvent();
    if(response?.status != 400){
      setRecentEvent(response?.data);
    }
  }
  useEffect(() => {
    getMostRecentThread();
    getMostReplyThread();
    getGeneralStatus();
    getChart();
    getRecentEvent();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Tổng sản phẩm" }}
                count={generalStatus?.total_products}
                // percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: "book" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Tổng người dùng" }}
                count={generalStatus?.total_users}
                // percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: "people" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Tổng bài đăng" }}
                count={generalStatus?.total_threads}
                // percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: "emoji_events" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Tổng giao dịch" }}
                count={generalStatus?.total_orders}
                // percentage={{ color: "success", text: "+5%" }}
                icon={{
                  color: "info",
                  component: "shopping_cart",
                }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <BuildByDevelopers mostReplyThread={mostReplyThread}/>
            </Grid>
            <Grid item xs={12} lg={5}>
              <WorkWithTheRockets mostRecentThread={mostRecentThread}/>
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              {isLoading ? (
                <>
                              <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
                <CircularProgress />
              </div>
                </>
              ): (
                <ReportsBarChart title="Thống kê bài đăng" chart={reportData?.chart} items={reportData?.items} />
              )}
            
            </Grid>
            <Grid item xs={12} lg={7}>
            {isLoading ? (
                <>
                              <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
                <CircularProgress />
              </div>
                </>
              ): (
                <GradientLineChart
                title="Số sản phẩm được đăng"
                height="20.25rem"
                chart={linearData}
              />
              )}
            
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
          {isLoading ? (
                <>
                              <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
                <CircularProgress />
              </div>
                </>
              ): (
                <OrderOverview overview={recentEvent}/>
              )}
            
      
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
