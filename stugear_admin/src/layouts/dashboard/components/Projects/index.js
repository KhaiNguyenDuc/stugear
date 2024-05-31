/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard Materail-UI example components
import Table from "examples/Tables/Table";

// Data
import data from "layouts/dashboard/components/Projects/data";
import ThreadService from "services/ThreadService/ThreadService";

function Projects() {
  
  const [menu, setMenu] = useState(null);
  const [threads, setThreads] = useState();
  const [threadFilter, setThreadFilter] = useState("mới nhất");
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  const { columns, rows } = data(threads);
  const getThreads = async (criteria) => {
    const response = await ThreadService.getAllThreads(1, criteria);
    if(response?.status != 400){
      setThreads(response?.data);
    }
  };

  useEffect(() => {
      getThreads({
        status: "new",
        tags: [],
        key: "",
        categories: [],
      });
      setThreadFilter("mới nhất")
  }, [])

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={() => {
        getThreads({
          status: "new",
          tags: [],
          key: "",
          categories: [],
        })
        closeMenu();
      }}>Mới nhất</MenuItem>
      <MenuItem onClick={() => {
        getThreads({
          status: "reply",
          tags: [],
          key: "",
          categories: [],
        })
        setThreadFilter("nhiều lượt phản hổi nhất")
        closeMenu();
      }}>Nhiều lượt phản hồi</MenuItem>
      <MenuItem onClick={() => {
        getThreads({
          status: "like",
          tags: [],
          key: "",
          categories: [],
        })
        setThreadFilter("nhiều lượt thích nhất")
        closeMenu();
      }}>Nhiều lượt thích</MenuItem>
    </Menu>
  );

  return (
    <Card>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SoftBox>
          <SoftTypography variant="h6" gutterBottom>
            Bài đăng {threadFilter}
          </SoftTypography>
        </SoftBox>
        <SoftBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </SoftBox>
        {renderMenu}
      </SoftBox>
      <SoftBox
        sx={{
          "& .MuiTableRow-root:not(:last-child)": {
            "& td": {
              borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                `${borderWidth[1]} solid ${borderColor}`,
            },
          },
        }}
      >
        <Table columns={columns} rows={rows} />
      </SoftBox>
    </Card>
  );
}

export default Projects;
