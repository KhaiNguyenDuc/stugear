import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data
import AskService from "services/AskService/AskService";
import { LOCALE_TEXT } from "utils/Constant";
import CustomPagination from "components/Pagination/Pagination";
import SoftButton from "components/SoftButton";
import UserModal from "components/UserModal/UserModal";
import SoftAvatar from "components/SoftAvatar";
import { Link } from "react-router-dom";
import SoftBadge from "components/SoftBadge";

function Reports() {
  const [isLoading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [pageCount, setPageCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      const response = await AskService.getListReports(currentPage);
      if (response?.status !== 400) {
        setPageCount(response?.data?.total_page);
        setReports(response.data);
      }
      setLoading(false);
    };
    fetchReports();
  }, [currentPage]);

  const updateStatus = async (selectedReport, selectedStatus) => {
    const response = await AskService.updateReportStatus(selectedReport, parseInt(selectedStatus));

    if (response?.status !== 400) {
      setReports((prevReports) =>
        prevReports.map((report) => {
          if (report.id === selectedReport) {
            let statusString;
            switch (selectedStatus) {
              case "3":
                statusString = "Đã hủy";
                break;
              case "2":
                statusString = "Đã xử lý hoàn tất";
                break;
              default:
                statusString = "Mới tạo"; // Default status
                break;
            }
            return { ...report, status: statusString };
          }
          return report;
        })
      );
    } else {
      console.error(response?.data?.message);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "owner",
      headerName: "Người báo cáo",
      width: 150,
      renderCell: (params) => <UserModal userId={params.row.owner} />,
    },
    {
      field: "denounced",
      headerName: "Đối tượng",
      width: 150,
      renderCell: (params) => <UserModal userId={params.row.denounced} />,
    },
    { field: "description", headerName: "Nội dung", width: 400 },
    {
      field: "image",
      headerName: "Minh chứng",
      width: 200,
      renderCell: (params) => (
        <Link to={params.row.image} target="_blank" rel="noopener noreferrer">
          <SoftBox mr={2}>
            <SoftAvatar src={params.row.image} alt={"Minh chứng"} size="sm" variant="rounded" />
          </SoftBox>
        </Link>
      ),
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 200,
      renderCell: (params) => (
        <>
          <SoftBadge
            variant="gradient"
            badgeContent={params.row.status}
            color={params.row.status === "Mới tạo" ? "success" : "secondary"}
            size="xs"
            container
          />
          {params.row.status === "Mới tạo" && params.row.status !== "Đã hủy" && (
            <>
              <SoftButton
                ml={2}
                variant="text"
                color={"success"}
                onClick={() => updateStatus(params.row.id, "2")}
              >
                {"Đã xử lý?"}
              </SoftButton>
            </>
          )}
          {params.row.status !== "Đã xử lý hoàn tất" && params.row.status !== "Đã hủy" && (
            <SoftButton
              ml={2}
              variant="text"
              color={"error"}
              onClick={() => updateStatus(params.row.id, "3")}
            >
              {"Hủy?"}
            </SoftButton>
          )}
        </>
      ),
    },
    { field: "date", headerName: "Ngày", width: 150 },
  ];

  const rows = reports.map((report) => ({
    id: report.id,
    owner: report.owner_id,
    denounced: report.denounced_id,
    description: report.description,
    image: report.image,
    status: report.status,
    date: report.date,
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Đơn tố cáo</SoftTypography>
            </SoftBox>
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "20px 0",
                }}
              >
                <CircularProgress />
              </div>
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

export default Reports;
