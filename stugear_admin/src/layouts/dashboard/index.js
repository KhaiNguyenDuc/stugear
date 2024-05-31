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

function Dashboard() {
  const { size } = typography;
  const [mostReplyThread, setMostReplyThread] = useState({});
  const [mostRecentThread, setMostRecentThread] = useState({});
  const [topRecentThread, setTopRecentThread] = useState();
  const [generalStatus, setGeneralStatus] = useState({});
  const { chart, items } = reportsBarChartData;
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
  
  useEffect(() => {
    getMostRecentThread();
    getMostReplyThread();
    getGeneralStatus();
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
              <ReportsBarChart title="Thống kê bài đăng" chart={chart} items={items} />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Số sản phẩm được đăng"
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
