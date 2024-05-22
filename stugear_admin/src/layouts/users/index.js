// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import { useState } from "react";
import authorsTableData from "layouts/users/data/authorsTableData";
import CustomPagination from "components/Pagination/Pagination";
import { CircularProgress } from "@mui/material";

function Users() {
  const [isLoading, setLoading] = useState(false);
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
              <div className="mx-auto my-4" style={{marginLeft: 'auto', marginRight: 'auto'}}>
              <CircularProgress /></div>
            ): (
              <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} />
              <SoftBox display="flex" justifyContent="center" p={2}>

            
              <CustomPagination 
          currentPage={currentPage}
          totalPage={pageCount}
          setCurrentPage = {setCurrentPage}
        />
              </SoftBox>
            </SoftBox>
            )}
         
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Users;
