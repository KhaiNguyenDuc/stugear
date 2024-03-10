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

const reportsBarChartData = {
  chart: {
    labels: ["Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
    datasets: { label: "Bài đăng", data: [450, 200, 100, 220, 500, 100, 400, 230, 500] },
  },
  items: [
    {
      icon: { color: "primary", component: "library_books" },
      label: "Sách",
      progress: { content: "120", percentage: 60 },
    },
    {
      icon: { color: "info", component: "touch_app" },
      label: "Linh kiện",
      progress: { content: "200", percentage: 90 },
    },
    {
      icon: { color: "warning", component: "payment" },
      label: "Khác",
      progress: { content: "1000", percentage: 30 },
    }
  ],
};

export default reportsBarChartData;
