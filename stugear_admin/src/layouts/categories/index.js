import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid, GridEditCellPropsParams } from "@mui/x-data-grid";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import CategoryService from "services/CategoryService/CategoryService";
import { LOCALE_TEXT } from "utils/Constant";
import SoftAvatar from "components/SoftAvatar";
import { Link } from "react-router-dom";
import { Description } from "@mui/icons-material";

function Categories() {
  const [isLoading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [editingCell, setEditingCell] = useState(null);

  const handleFileChange = (event, id) => {
    const file = event.target.files[0];
    const formData = new FormData();
    const imageURL = URL.createObjectURL(file);

    setCategories(prevCategories => {
      return prevCategories.map(category => {
        if (category.id === id) {
          return {
            ...category,
            image: imageURL
          };
        }
        return category;
      });
    });
    formData.append("image", file);
    CategoryService.uploadImage(id, formData);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const response = await CategoryService.getAllCategories();
      if (response?.status !== 400) {
        setCategories(response.data);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);
  const rows = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    image: category.image,
  }));
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Tên", width: 200, editable: true },
    { field: "description", headerName: "Mô tả", width: 400, editable: true,},
    {
      field: "image",
      headerName: "Ảnh",
      width: 100,
      renderCell: (params) => (
        <Link to={params.value} target="_blank" rel="noopener noreferrer">
          <SoftAvatar src={params.value} alt={"category"} size="lg" variant="rounded" />
        </Link>
      ),
    },
    {
      field: "upload",
      headerName: "Đổi ảnh",
      renderCell: (params) => (
        <>
          <label htmlFor={`file-input-${params.row.upload}`} className="text-success">
            Đổi ảnh
          </label>
          <input
            id={`file-input-${params.row.upload}`}
            type="file"
            style={{ display: "none" }}
            onChange={(e) => handleFileChange(e, params.row.upload)}
          />
        </>
      ),
    },
  ];


  const handleEditCellChange = (editCellProps) => {
    try {
      console.log(editCellProps)
 
      CategoryService.updateById(editCellProps.id, {
        id: editCellProps.id,
        name: editCellProps.name,
        description: editCellProps.description
      });
      
    } catch (error) {
      console.error("Error updating category:", error);
    }
    return editCellProps
  };
  

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Danh mục</SoftTypography>
            </SoftBox>
            {isLoading ? (
              <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                <CircularProgress />
              </div>
            ) : (
              <div>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  localeText={LOCALE_TEXT}
                  pageSizeOptions={[5, 10, 25]}
                  slotProps={{
                    pagination: {
                      labelRowsPerPage: "Số dòng 1 trang",
                      labelDisplayedRows: (page) => `${page.from}-${page.to} trên ${page.count}`,
                    },
                  }}
                  editMode="row"
                  processRowUpdate={(newRow) =>
                    handleEditCellChange(newRow, categories.find((row) => row.id === newRow.id))
                  }
                  onProcessRowUpdateError={(error) => console.log(error)}
                />
              </div>
            )}
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Categories;
