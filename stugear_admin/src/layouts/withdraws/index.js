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
import { BASE_URL } from "utils/Constant";
import SoftBadge from "components/SoftBadge";
import UserModal from "components/UserModal/UserModal";
import { LOCALE_TEXT } from "utils/Constant";
import CustomPagination from "components/Pagination/Pagination";
import SoftButton from "components/SoftButton";

function Author({ id, name, email }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <UserModal userId={id} />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function Withdraws() {
  const [isLoading, setLoading] = useState(false);
  const [withdraws, setWithdraws] = useState([]);
  useEffect(() => {
    const fetchWithdraws = async () => {
      setLoading(true);
      const response = await AskService.getListWithdraws();
      if (response?.status !== 400) {
        setWithdraws(response.data);
      }
      setLoading(false);
    };
    fetchWithdraws();
  }, []);

  const updateStatus = async (selectedWithdraw, selectedStatus) => {
    const response = await AskService.updateWithdrawStatus(
      selectedWithdraw,
      parseInt(selectedStatus)
    );

    if (response?.status !== 400) {
      setWithdraws(
        withdraws.map((withdraw) => {
          if (withdraw?.id === selectedWithdraw) {
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

            return { ...withdraw, status: statusString };
          }
          return withdraw;
        })
      );
    } else {
      setError(response?.data?.message);
    }
  };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "owner",
      headerName: "Người yêu cầu",
      width: 300,
      renderCell: (params) => (
        <Author
          id={params.row.owner.id}
          name={params.row.owner.name}
          email={params.row.owner.email}
        />
      ),
      valueGetter: (params) => `${params.email || ""} ${params.name || ""}`,
    },
    { field: "amount", headerName: "Số tiền", width: 110 },
    { field: "description", headerName: "Nội dung", width: 400 },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 300,
      renderCell: (params) => (
        <>
          <StatusBadge status={params.row.status} />
          {params.row.status == "Mới tạo" && params.row.status !== "Đã hủy" && (
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
  ];

  const rows = withdraws.map((withdraw) => ({
    id: withdraw.id,
    owner: { id: withdraw.owner_id, email: withdraw.email, name: withdraw.name },
    amount: withdraw.amount,
    description: withdraw.description,
    status: withdraw.status,
  }));

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
              <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                <CircularProgress />
              </div>
            ) : (
              <div>
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
            )}
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

function StatusBadge({ status }) {
  return (
    <SoftBadge
      variant="gradient"
      badgeContent={status}
      color={status === "Mới tạo" ? "success" : "secondary"}
      size="xs"
      container
    />
  );
}

export default Withdraws;
