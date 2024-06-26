import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import productsTableData from "layouts/products/data/productsTableData";
import CustomPagination from "components/Pagination/Pagination";
import { LOCALE_TEXT } from "utils/Constant";

function Products() {
  const [isLoading, setLoading] = useState(false);
  const { columns, rows } = productsTableData(setLoading);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Sản phẩm</SoftTypography>
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

export default Products;
