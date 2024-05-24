// @mui material components
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftBadge from "components/SoftBadge";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import CustomPagination from "components/Pagination/Pagination";

// Data
import { useState } from "react";
import authorsTableData from "layouts/users/data/authorsTableData";
import { DataGrid } from "@mui/x-data-grid";
import { LOCALE_TEXT } from "utils/Constant";

function Users() {
  const [isLoading, setLoading] = useState(false);
  
  const [pageSize, setPageSize] = useState(10);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const { columns, rows, pageCount } = authorsTableData(currentPage, itemsPerPage, setLoading);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Người dùng</SoftTypography>
            </SoftBox>
            {isLoading ? (
              <SoftBox display="flex" justifyContent="center" alignItems="center" my={4}>
                <CircularProgress />
              </SoftBox>
            ) : (
              <div>
              <DataGrid
                rows={rows}
                columns={columns}
                localeText={LOCALE_TEXT}
                hideFooter={true}
              />
              <CustomPagination
                  currentPage={currentPage}
                  totalPage={pageCount}
                  setCurrentPage={setCurrentPage}
                />
            </div>
            )}
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Users;
