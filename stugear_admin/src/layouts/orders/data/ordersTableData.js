/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";

// Images
import { useEffect, useState } from "react";
import { BASE_URL } from "utils/Constant";
import OrderService from "services/OrderService/OrderService";
import UserModal from "components/UserModal/UserModal";
import SoftButton from "components/SoftButton";

function Order({ id, name, email }) {
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

const ordersTableData = (currentPage, setLoading) => {
  const [orders, setOrders] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const getOrders = async () => {
    setLoading(true);
    const response = await OrderService.getAllOrders(currentPage);
    if (response?.status !== 400) {
      setPageCount(response?.total_page);
      setOrders(response?.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getOrders();
  }, [currentPage]);
  
  const updateStatus = async (selectedorder) => {
    const response = await OrderService.updateStatusByAdmin(
      selectedorder,
      7 // hoàn tiền
    );

    if (response?.status !== 400) {
      setOrders(
        orders.map((order) => {
          if (order?.id === selectedorder) {
           
            return { ...order, status: "Hoàn tiền" };
          }
          return order;
        })
      );
    } 
  };
  const rows = orders.map((order) => ({
    id: order.id,
    buyer: order.buyer_id,
    seller: order.seller_id,
    product: { product_image: order.product_image, product_name: order.product_name },
    price: order.price,
    quantity: order.quantity,
    total: order.total,
    status: order.status,
    created_date: order.created_date,
  }));

  const columns = [
    { field: "id", align: "center", headerName: "ID" },
    {
      field: "buyer",
      align: "left",
      headerName: "Người mua",
      renderCell: (params) => (
        <SoftBox mr={2}>
          <UserModal userId={params.row.buyer} />
        </SoftBox>
      ),
    },
    {
      field: "seller",
      align: "left",
      headerName: "Người bán",
      renderCell: (params) => (
        <SoftBox mr={2}>
          <UserModal userId={params.row.seller} />
        </SoftBox>
      ),
    },
    {
      field: "product",
      align: "left",
      headerName: "Sản phẩm",
      width: 500,
      renderCell: (params) => (
        <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
          <SoftBox mr={2}>
            <SoftAvatar
              src={params.row.product.product_image}
              alt={params.row.product.product_name}
              size="sm"
              variant="rounded"
            />
          </SoftBox>
          <SoftBox display="flex" flexDirection="column">
            <SoftTypography variant="button" fontWeight="medium">
              {params.row.product.product_name}
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      ),
    },
    {
      field: "price",
      align: "left",
      headerName: "Giá",
      renderCell: (params) => (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {params.row.price}
        </SoftTypography>
      ),
    },
    {
      field: "quantity",
      align: "center",
      headerName: "Số lượng",
      renderCell: (params) => (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {params.row.quantity}
        </SoftTypography>
      ),
    },
    {
      field: "total",
      align: "center",
      headerName: "Tổng tiền",
      renderCell: (params) => (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {params.row.total}
        </SoftTypography>
      ),
    },
    {
      field: "status",
      align: "left",
      width: 280,
      headerName: "Tình trạng",
      renderCell: (params) => (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {params.row.status === "Đã nhận được hàng hoàn" ? (
            <>
              {params.row.status}
              <SoftButton
                ml={2}
                variant="text"
                color={"success"}
                onClick={() => updateStatus(params.row.id)}
              >
                {"Hoàn tiền?"}
              </SoftButton>
            </>
          ) : (
            params.row.status
          )}
        </SoftTypography>
      ),
    },
    {
      field: "created_date",
      align: "center",
      headerName: "Ngày tạo",
      renderCell: (params) => (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {params.row.created_date}
        </SoftTypography>
      ),
    },
  ];
  return {
    columns: columns,
    rows: rows,
    pageCount: pageCount,
  };
};

export default ordersTableData;
