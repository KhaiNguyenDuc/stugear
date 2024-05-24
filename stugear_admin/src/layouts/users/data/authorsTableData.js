import { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import UserModal from "components/UserModal/UserModal";
import SoftButton from "components/SoftButton";
import UserService from "services/UserService/UserService";

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
  };

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

  const columns = [
    { field: "id", align: "center", headerName: "ID", with: 100},
    { field: "name", align: "left", headerName: "Tên", width: 400, renderCell: (params) => (
      <Author id={params.row.id} name={params.row.name.name} email={params.row.name.email} />
    )},
    { field: "role_name", align: "left", headerName: "Vai trò", with: 100},
    { field: "is_enable", align: "center", headerName: "Trạng thái", with: 300, renderCell: (params) => (
      <SoftBadge
        variant="gradient"
        badgeContent={params.row.is_enable == "1" ? "Hoạt động" : "Chặn"}
        color={params.row.is_enable == "1" ? "success" : "secondary"}
        size="xs"
        container
      />
    )},
    { field: "status", align: "center", headerName: "Cập nhật", renderCell: (params) => (
      <SoftButton
        onClick={() => {
          updateStatus(params.row.id, params.row.is_enable == 1 ? 0 : 1);
        }}
        ml={2}
        variant="text"
        color={params.row.is_enable == "1" ? "success" : "error"}
      >
        {params.row.is_enable == "1" ? "Chặn" : "Mở chặn"}
      </SoftButton>
    )},
    { field: "gender", align: "left", headerName: "Giới tính", renderCell: (params) => (
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {params.row.gender === 0 ? "Nam" : "Nữ"}
      </SoftTypography>
    )},
    { field: "phone_number", align: "left", headerName: "Số điện thoại", renderCell: (params) => (
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {params.row.phone_number}
      </SoftTypography>
    )},
    { field: "birthdate", align: "left", headerName: "Ngày sinh", renderCell: (params) => (
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {params.row.birthdate}
      </SoftTypography>
    )},
    { field: "created_at", align: "center", headerName: "Ngày tạo", renderCell: (params) => (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {params.row.created_at}
      </SoftTypography>
    )},
  ];

  const rows = users.map((user) => ({
    id: user.id,
    name: {name: user.name, email: user.email, id: user.id},
    role_name: user.role_name,
    is_enable: user.is_enable,
    gender: user.gender === 0 ? "Nam" : "Nữ",
    phone_number: user.phone_number,
    birthdate: user.birthdate,
    created_at: user.created_at,
  }));

  
  return {
    columns: columns,
    rows: rows,
    pageCount: pageCount,
  };
};

export default authorsTableData;
