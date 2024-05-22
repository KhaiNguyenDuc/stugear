import { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import UserService from "services/UserService/UserService";
import { BASE_URL } from "utils/Constant";
import UserModal from "components/UserModal/UserModal";
import SoftButton from "components/SoftButton";

function Author({ id, name, email }) {
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

const authorsTableData = (currentPage, itemsPerPage, setLoading) => {
  const [users, setUsers] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  
  const updateStatus = async (selectedUserId, selectedStatus) => {
    const updatedUsers = users.map((user) => {
      if (user.id === selectedUserId) {
        return { ...user, is_enable: selectedStatus };
      }
      return user;
    });
    setUsers(updatedUsers);
    await UserService.updateUserStatus(selectedUserId, selectedStatus);
  }
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      const response = await UserService.getAllUsers(currentPage);
      if (response?.status !== 400) {
        const allUsers = response?.data?.data;
        setUsers(allUsers);
        setPageCount(response?.total_pages);
      }
      setLoading(false);
    };
    getUsers();
  }, [currentPage, itemsPerPage]);

  const rows = users?.map(user => ({
    "Id": (
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {user?.id}
      </SoftTypography>
    ),
    "Tên": <Author id={user?.id} name={user.name} email={user?.email} />,
    "Vai trò": (
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {user?.role_name}
      </SoftTypography>
    ),
    "Trạng thái": (
      <>
      
            <SoftBadge variant="gradient" badgeContent={user?.is_enable == "1" ? "Hoạt động" : "Chặn"} color={user?.is_enable == "1" ? "success" : "secondary"} size="xs" container />
             
      </>

    ),
    "Cập nhật": (
      <>
        <SoftButton onClick={() => {
               updateStatus(user?.id, user?.is_enable == 1 ? 0 : 1)
               }} ml={2} variant="text"  color={user?.is_enable == "1" ? "error" : "success"}  >{user?.is_enable == "1" ? "Chặn" : "Mở chặn"}</SoftButton>
      
      </>

    ),
    "Giới tính": (
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {user?.gender == 0 ? "Nam" : "Nữ"}
      </SoftTypography>
    ),
    "Số điện thoại": (
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {user?.phone_number}
      </SoftTypography>
    ),
    "Ngày sinh": (
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {user?.birthdate}
      </SoftTypography>
    ),
    "Ngày tạo": (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {user?.created_at}
      </SoftTypography>
    ),
  }));

  return {
    columns: [
      { name: "Id", align: "center" },
      { name: "Tên", align: "left" },
      { name: "Vai trò", align: "left" },
      { name: "Trạng thái", align: "center" },
      { name: "Cập nhật", align: "center" },
      { name: "Giới tính", align: "left" },
      { name: "Số điện thoại", align: "left" },
      { name: "Ngày sinh", align: "left" },
      { name: "Ngày tạo", align: "center" },
    ],
    rows: rows,
    pageCount: pageCount,
  };
};

export default authorsTableData;
