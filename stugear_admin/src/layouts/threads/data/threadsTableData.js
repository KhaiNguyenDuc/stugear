// layouts/threads/data/threadsTableData.js
import { useEffect, useState } from "react";
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import UserModal from "components/UserModal/UserModal";
import ThreadService from "services/ThreadService/ThreadService";
import SoftBadge from "components/SoftBadge";
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

const threadsTableData = (setLoading) => {
  const [threads, setThreads] = useState([]);
  const updateStatus = async (id, status) => {
    try {
      const updatedThreads = threads.map((thread) => {
        if (thread.id === id) {
          return {
            ...thread,
            status: {
              status: status,
            },
          };
        }
        return thread;
      });
      setThreads(updatedThreads);
      await ThreadService.updateStatus(id, status);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  useEffect(() => {
    const getThreads = async () => {
      setLoading(true);
      try {
        const response = await ThreadService.getAllThreads();
        setThreads(response?.data);
      } catch (error) {
        console.error("Error fetching threads:", error);
      } finally {
        setLoading(false);
      }
    };
    getThreads();
  }, []);

  const rows = threads?.map((thread) => ({
    id: thread.id,
    title: thread.title,
    description: thread.description,
    owner: { id: thread.user.id, name: thread.user.name, email: thread.user.email },
    status: thread.status.status,
    action: thread.status.status,
    view: thread.view,
    like: thread.like,
    reply: thread.reply,
    create_at: thread.create_at,
  }));

  const columns = [
    { field: "id", headerName: "Id", width: 100 },
    { field: "title", headerName: "Tiêu đề", width: 500 },
    { field: "description", headerName: "Mô tả", width: 300 },
    {
      field: "owner",
      headerName: "Người tạo",
      width: 300,
      renderCell: (params) => (
        <Author
          id={params.row.owner.id}
          name={params.row.owner.name}
          email={params.row.owner.email}
        />
      ),
      valueGetter: (params) => `${params.name || ""} ${params.email || ""}`,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      align: "center",
      width: 100,
      renderCell: (params) => (
        <SoftBadge
          variant="gradient"
          badgeContent={
            params.row.status == 1 ? "Đã duyệt" : params.row.status == 3 ? "Chờ duyệt" : "Chặn"
          }
          color={
            params.row.status == 1 ? "success" : params.row.status == 3 ? "secondary" : "error"
          }
          size="xs"
          container
        />
      ),
    },
    {
      field: "action",
      headerName: "Cập nhật",
      width: 150,
      renderCell: (params) => (
        <>
          {params.row.status == 3 && (
            <SoftButton
              ml={2}
              variant="text"
              color={"success"}
              onClick={() => updateStatus(params.row.id, 1)}
            >
              {"Duyệt"}
            </SoftButton>
          )}
          {(params.row.status == 1 || params.row.status == 3) && (
            <SoftButton
              ml={2}
              variant="text"
              color={"error"}
              onClick={() => updateStatus(params.row.id, 0)}
            >
              {"Chặn"}
            </SoftButton>
          )}
          {params.row.status == 0 && (
            <SoftButton
              ml={2}
              variant="text"
              color={"error"}
              onClick={() => updateStatus(params.row.id, 3)}
            >
              {"Mở chặn"}
            </SoftButton>
          )}
        </>
      ),
    },
    { field: "view", headerName: "Lượt xem", width: 100 },
    { field: "like", headerName: "Lượt thích", width: 100 },
    { field: "reply", headerName: "Phản hồi", width: 100 },
    { field: "create_at", headerName: "Ngày tạo", width: 150 },
  ];

  return { columns, rows };
};

export default threadsTableData;
