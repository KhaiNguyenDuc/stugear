/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useEffect, useState } from "react";
import { BASE_URL } from "utils/Constant";
import OrderService from "services/OrderService/OrderService";

function Order({ id, name, email }) {

  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={`${BASE_URL}/api/users/${id}/images`} alt={name} size="sm" variant="rounded" />
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

const ordersTableData = () => {
  const [orders, setOrders] = useState([]);
  const getOrders = async() => {
    const response = await OrderService.getAllOrders(0);
    if(response?.status != 400){
      setOrders(response?.data)
    }
  }
  useEffect(() => {
 
    // getOrders()
  }, [])
  const rows =[]
  // const rows = orders.map(order => ({
  //   // "Tên": <Order id={order?.id} name={order.name} email={order?.email} />,
  //   // "Vai trò": (
  //   //   <SoftTypography variant="caption" fontWeight="medium" color="text">
  //   //     {order?.role}
  //   //   </SoftTypography>
  //   // ),
  //   // "Trạng thái": (
  //   //   <SoftBadge variant="gradient" badgeContent={order?.status === "online" ? "online" : "offline"} color={order?.status === "online" ? "success" : "secondary"} size="xs" container />
  //   // ),
  //   // "Ngày tạo": (
  //   //   <SoftTypography variant="caption" color="secondary" fontWeight="medium">
  //   //     {order?.createdAt}
  //   //   </SoftTypography>
  //   // ),
  //   // "Chặn": (
  //   //   <SoftTypography
  //   //     component="a"
  //   //     href="#"
  //   //     variant="caption"
  //   //     color="secondary"
  //   //     fontWeight="medium"
  //   //   >
  //   //     Chặn
  //   //   </SoftTypography>
  //   // ),
  // }));


  return (
    {
      columns: [
        { name: "Tên", align: "left" },
        { name: "Vai trò", align: "left" },
        { name: "Trạng thái", align: "center" },
        { name: "Ngày tạo", align: "center" },
        { name: "Chặn", align: "center" },
      ],
      rows: rows,
    }
  )
}





export default ordersTableData;
