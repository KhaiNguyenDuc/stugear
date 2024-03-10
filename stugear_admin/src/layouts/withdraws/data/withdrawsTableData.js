/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";

// Images
import { useEffect, useState } from "react";
import { BASE_URL } from "utils/Constant";
import AskService from "services/AskService/AskService";
import SoftBox from "components/SoftBox";
import SoftAvatar from "components/SoftAvatar";

function Author({ id }) {

  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={`${BASE_URL}/api/users/${id}/images`} size="sm" variant="rounded" />
      </SoftBox>
    </SoftBox>
  );
}

const withdrawTableData = () => {
  const [withdraws,setWithdraws] = useState([]);
  useEffect(() => {
    const getWithdraws = async() => {
      const response = await AskService.getListWithdraws(1);
      if(response?.status != 400){
        setWithdraws(response?.data)
      }
    }
    getWithdraws()
  }, [])
  
  const rows = withdraws.map(withdraw => ({
    "ID": (
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {withdraw?.id}
      </SoftTypography>
    ),
    "Người yêu cầu": (
      <Author id={withdraw?.owner_id}/>
    ),
    "Số tiền": (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {withdraw?.amount}
      </SoftTypography>
    ),
    "Nội dung": (
      <SoftTypography
        component="a"
        href="#"
        variant="caption"
        color="secondary"
        fontWeight="medium"
      >
        {withdraw?.description}
      </SoftTypography>
    ),
    "Trạng thái": (
      <SoftBadge variant="gradient" badgeContent={withdraw?.status === "Mới tạo" ? "Mới tạo" : "offline"} color={withdraw?.status === "Mới tạo" ? "success" : "secondary"} size="xs" container />
    ),
  }));


  return (
    {
      columns: [
        { name: "ID", align: "center" },
        { name: "Người yêu cầu", align: "left" },
        { name: "Số tiền", align: "center" },
        { name: "Nội dung", align: "center" },
        { name: "Trạng thái", align: "center" },
      ],
      rows: rows,
    }
  )
}





export default withdrawTableData;
