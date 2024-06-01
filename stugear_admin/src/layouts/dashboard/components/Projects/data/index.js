// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Images
import UserModal from "components/UserModal/UserModal";
import { Link } from "react-router-dom";
import { FRONTEND_URL } from "utils/Constant";


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

export default function data(threads) {

  const rows = threads?.map((thread) => (
    {
      
      "Người tạo": (
        <SoftBox width="15rem" textAlign="left">
          <Author email={thread.user.email} name={thread.user.name} id={thread.user.id}/>
        </SoftBox>
      ),
      "Tiêu đề": (
        <Link style={{color: 'grey'}} target="_blank" rel="noopener noreferrer" to={`${FRONTEND_URL}/thread/${thread.id}`}>
        {thread.title}
        </Link>
      ),
      "Danh mục": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
         {thread.category.name}
        </SoftTypography>
      ),
      "Lượt xem": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
         {thread.view}
        </SoftTypography>
      ),
      "Lượt thích": (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
         {thread.like}
        </SoftTypography>
      ),
    }
  ));

  return {
    columns: [
      { name: "Người tạo", align: "left" },
      { name: "Tiêu đề", align: "left" },
      { name: "Danh mục", align: "left" },
      { name: "Lượt xem", align: "center" },
      { name: "Lượt thích", align: "center" },
    ],
 
    rows: rows
  };
}
