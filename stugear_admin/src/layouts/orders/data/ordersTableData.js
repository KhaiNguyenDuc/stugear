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

function Order({ id, name, email }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
      <UserModal userId={id}/>
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

  const rows = orders?.map(order => ({
    "Id": (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
      {order?.id}
    </SoftTypography>
    ),
    "Người mua": <Order id={order?.buyer_id} name={order.name} email={order?.email} />,
    "Người bán": <Order id={order?.seller_id} name={order.name} email={order?.email} />,
    "Sản phẩm": (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={order?.product_image} alt={order?.product_name} size="sm" variant="rounded" />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {order?.product_name}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
    ),
    "Giá sản phẩm": (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {order?.price}
      </SoftTypography>
    ),
    "Số lượng": (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {order?.quantity}
      </SoftTypography>
    ),
    "Tổng tiền": (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {order?.total}
      </SoftTypography>
    ),
    "Trạng thái": (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {order?.status}
      </SoftTypography>
    ),
    "Ngày tạo": (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {order?.created_date}
      </SoftTypography>
    ),
    "Chặn": (
      <SoftTypography
        component="a"
        href="#"
        variant="caption"
        color="secondary"
        fontWeight="medium"
      >
        Chặn
      </SoftTypography>
    ),
  }));

  return {
    columns: [
      { name: "Id", align: "center" },
      { name: "Người mua", align: "left" },
      { name: "Người bán", align: "left" },
      { name: "Sản phẩm", align: "left" },
      { name: "Giá sản phẩm", align: "left" },
      { name: "Số lượng", align: "center" },
      { name: "Tổng tiền", align: "center" },
      { name: "Trạng thái", align: "left" },
      { name: "Ngày tạo", align: "center" },
      { name: "Chặn", align: "center" },
    ],
    rows: rows,
    pageCount: pageCount,
  };
};

export default ordersTableData;
