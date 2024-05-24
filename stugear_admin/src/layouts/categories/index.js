import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataGrid } from '@mui/x-data-grid';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
        const response = []
    //   const response = await CategoryService.getAllCategories();
      if (response?.status === 500) {
        console.log("Something went wrong");
      } else {
        setCategories(response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Tên danh mục', width: 200 },
    { field: 'description', headerName: 'Mô tả', width: 300 },
    {
      field: 'image',
      headerName: 'Hình ảnh',
      width: 200,
      renderCell: (params) => (
        <Link to={"/home-page/category/" + params.row.id}>
          <img
            src={params.value}
            alt=""
            className="hover-effect admin-small-img"
            style={{ width: "90%", height: "100px" }}
          />
        </Link>
      ),
    },
    {
      field: 'edit',
      headerName: 'Cập nhật',
      width: 150,
      renderCell: (params) => (
        <Link
          to={"/home-page/category/edit/" + params.row.id}
          className="btn"
        >
          <FontAwesomeIcon icon="pencil" />
          Chỉnh sửa
        </Link>
      ),
    },
  ];

  return (
    <>
      <div className="admin-product">
        <div className="d-flex justify-content-between my-3">
          <Link
            to="/home-page/category/create"
            className="btn"
            style={{ backgroundColor: "red" }}
          >
            + Tạo mới
          </Link>
        </div>
        <div style={{ height: 400, width: '100%' }}>
          {isLoading ? (
            <></>
            // <Loading />
          ) : (
            <DataGrid
              rows={categories}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Category;
