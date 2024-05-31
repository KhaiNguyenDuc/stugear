import React, { useState, useEffect } from "react";
import { Card, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftButton from "components/SoftButton";
import { LOCALE_TEXT } from "utils/Constant";
import ValidationService from "services/ValidationService/ValidationService";
import SoftAvatar from "components/SoftAvatar";
import { BASE_URL } from "utils/Constant";
import SoftBadge from "components/SoftBadge";
import ProductService from "services/ProductService/ProductService";
import ThreadService from "services/ThreadService/ThreadService";

function Product({ id, name }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar
          src={`${BASE_URL}/products/${id}/images`}
          alt={name}
          size="sm"
          variant="rounded"
        />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function BotAI() {
  const [isLoading, setLoading] = useState(true);
  const [validations, setValidations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await ValidationService.getAllValidations();
        setValidations(response.data);
      } catch (error) {
        console.error("Error fetching validations:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const updateStatus = async (validationId, id, status, type) => {
    try {
      
      const updatedValidation = validations.map((validation) => {
        if (validation.id === validationId) {
          return {
            ...validation,
            status: status
          };
        }
        return validation;
      });
      setValidations(updatedValidation);
      if(type == "thread"){
          await ThreadService.updateStatus(id, status);
      }else{
        await ProductService.adminUpdateStatus(id, status);
      }
      
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "thread", headerName: "Bài đăng", width: 150, renderCell: (params) => (
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
      <SoftTypography variant="h6">{params.row.thread.title}</SoftTypography>
    </SoftBox>
    ) },
    {
      field: "product",
      headerName: "Tên sản phẩm",
      width: 500,
      renderCell: (params) => <Product id={params.row.product.id} name={params.row.product.title} />,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      align: "center",
      width: 100,
      renderCell: (params) => (
        <>
        <SoftBadge
          variant="gradient"
          badgeContent={
            params.row.status.status == 1 ? "Đã duyệt" : params.row.status.status == 3 ? "Chờ duyệt" : "Chặn"
          }
          color={
            params.row.status.status == 1 ? "success" : params.row.status.status == 3 ? "secondary" : "error"
          }
          size="xs"
          container
        />
        </>
      )
    },
    {
      field: "action",
      headerName: "Cập nhật",
      width: 150,
      renderCell: (params) => (
        <>
          {params.row.status.status == 3 && (
            <SoftButton
              ml={2}
              variant="text"
              color={"success"}
              onClick={() => updateStatus(params.row.id, params.row.product.id ? params.row.product.id : params.row.thread.id, 1, params.row.product.id ? "product" : "thread")}
            >
              {"Duyệt"}
            </SoftButton>
          )}
          {(params.row.status.status == 1 || params.row.status.status == 3) && (
            <SoftButton
              ml={2}
              variant="text"
              color={"error"}
              onClick={() => updateStatus(params.row.id, params.row.product.id ? params.row.product.id : params.row.thread.id, 0, params.row.product.id ? "product" : "thread")}
            >
              {"Chặn"}
            </SoftButton>
          )}
          {params.row.status.status == 0 && (
            <SoftButton
              ml={2}
              variant="text"
              color={"error"}
              onClick={() => updateStatus(params.row.id, params.row.product.id ? params.row.product.id : params.row.thread.id, 3, params.row.product.id ? "product" : "thread")}
            >
              {"Mở chặn"}
            </SoftButton>
          )}
        </>
      ),
    },
    { field: "description", headerName: "Lý do", width: 200 },
    { field: "created_at", headerName: "Ngày tạo", width: 200 },
  
  ];
  const rows = validations.map((validation) => ({
    id: validation.id,
    thread: {id: validation?.thread?.id, title: validation?.thread?.title},
    product: {id: validation?.product?.id, title: validation?.product?.name},
    status: {status: validation.status},
    description: validation.description == undefined ? "Không có" : validation.description,
    created_at: validation.created_at,
    updated_at: validation.updated_at,
  }));
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Trạng thái tự động duyệt</SoftTypography>
            </SoftBox>
            {isLoading ? (
              <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
                <CircularProgress />
              </div>
            ) : (
              <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  localeText={LOCALE_TEXT}
                  pageSizeOptions={[25, 50, 100]}
                  initialState={{
                    pagination: { paginationModel: { pageSize: 50 } },
                  }}
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

export default BotAI;
