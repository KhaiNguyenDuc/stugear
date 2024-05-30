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
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data
import ordersTableData from "layouts/orders/data/ordersTableData";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { LOCALE_TEXT } from "utils/Constant";

function Orders() {
  const [isLoading, setLoading] = useState(false);
  const { columns, rows } = ordersTableData(setLoading);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Đơn hàng</SoftTypography>
            </SoftBox>
            {isLoading ? (
              <div className="mx-auto my-4" style={{ marginLeft: "auto", marginRight: "auto" }}>
                <CircularProgress />
              </div>
            ) : (
              <>
                <div className="mb-3">
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    localeText={LOCALE_TEXT}
                    initialState={{
                      pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    slotProps={{
                      pagination: {
                        labelRowsPerPage: "Số dòng 1 trang",
                        labelDisplayedRows: (page) =>
                          `${page.from}-
                    ${page.to} trên ${page.count}`,
                      },
                    }}
                  />
                </div>
              </>
            )}
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Orders;
