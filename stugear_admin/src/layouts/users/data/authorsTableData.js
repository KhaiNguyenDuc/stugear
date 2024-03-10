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
import UserService from "services/UserService/UserService";
import { BASE_URL } from "utils/Constant";

function Author({ id, name, email }) {

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

const authorsTableData = () => {
  const [users,setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async() => {
      const response = await UserService.getAllUsers();
      if(response?.status != 400){
        setUsers(response)
      }
    }
    getUsers()
  }, [])
  
  const rows = users.map(user => ({
    "Tên": <Author id={user?.id} name={user.name} email={user?.email} />,
    "Vai trò": (
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {user?.role}
      </SoftTypography>
    ),
    "Trạng thái": (
      <SoftBadge variant="gradient" badgeContent={user?.status === "online" ? "online" : "offline"} color={user?.status === "online" ? "success" : "secondary"} size="xs" container />
    ),
    "Ngày tạo": (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {user?.createdAt}
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
      // rows: [
      //   {
      //     "Tên": <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
      //     "Vai trò":      
      //     <SoftTypography variant="caption" fontWeight="medium" color="text">
      //     123
      //   </SoftTypography>,
      //     "Trạng thái": (
      //       <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
      //       // <SoftBadge variant="gradient" badgeContent="offline" color="secondary" size="xs" container />
      //     ),
      //     "Ngày tạo": (
      //       <SoftTypography variant="caption" color="secondary" fontWeight="medium">
      //         23/04/18
      //       </SoftTypography>
      //     ),
      //     "Chặn": (
      //       <SoftTypography
      //         component="a"
      //         href="#"
      //         variant="caption"
      //         color="secondary"
      //         fontWeight="medium"
      //       >
      //         Chặn
      //       </SoftTypography>
      //     ),
      //   }
      // ],
    }
  )
}





export default authorsTableData;
