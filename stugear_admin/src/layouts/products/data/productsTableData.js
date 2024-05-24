import { useEffect, useState } from "react";
import ProductService from "services/ProductService/ProductService";
import SoftBadge from "components/SoftBadge";
import UserModal from "components/UserModal/UserModal";
import SoftButton from "components/SoftButton";
import { render } from "@testing-library/react";
import SoftBox from "components/SoftBox";
import SoftAvatar from "components/SoftAvatar";
import { BASE_URL } from "utils/Constant";
import SoftTypography from "components/SoftTypography";

function Product({ id, name }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar
          src={`${BASE_URL}/products/${id}/images`}
          alt={name}
          size="sm"
          variant="rounded"
        />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

const productsTableData = (currentPage, setLoading) => {
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const updateStatus = async (id, status, statusValue) => {
    try {
      const updatedProducts = products.map((product) => {
        if (product.id === id) {
          return { ...product, status: statusValue };
        }
        return product;
      });
      setProducts(updatedProducts);
      await ProductService.updateStatus(id, status);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await ProductService.getAllProducts(currentPage);
      if (response?.status !== 400) {
        const allProducts = response?.data;
        setProducts(allProducts);
        setPageCount(response?.total_page);
      }
      setLoading(false);
    };
    getProducts();
  }, [currentPage]);

  const rows = products.map((product) => ({
    id: product.id,
    title: {id: product.id, title: product.title},
    price: product.price,
    condition: product.condition,
    status: product.status,
    quantity: product.quantity,
    user_id: product.user_id,
    comment_count: product.comment_count,
  }));

  const columns = [
    { field: "id", headerName: "Id", width: 100 },
    { field: "title", headerName: "Tên sản phẩm", width: 500, renderCell: (params) => (
      <Product id={params.row.id} name={params.row.title.title} />
    ) },
    { field: "price", headerName: "Giá", width: 120 },
    { field: "condition", headerName: "Tình trạng", width: 150 },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 150,
      renderCell: (params) => (
        <SoftBadge
          variant="gradient"
          badgeContent={params.row.status}
          color={params.row.status === "Đã duyệt" ? "success" : "secondary"}
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
        {params.row.status === "Chờ duyệt" && (
          <SoftButton
            ml={2}
            variant="text"
            color={"success"}
            onClick={() => updateStatus(params.row.id, 3, "Đã duyệt")}
          >
            {"Duyệt"}
          </SoftButton>
        )}
        {(params.row.status === "Đã duyệt" || params.row.status === "Chờ duyệt") && (
          <SoftButton
            ml={2}
            variant="text"
            color={"error"}
            onClick={() => updateStatus(params.row.id, 0, "Chặn")}
          >
            {"Chặn"}
          </SoftButton>
        )}
        {params.row.status === "Chặn" && (
          <SoftButton
            ml={2}
            variant="text"
            color={"error"}
            onClick={() => updateStatus(params.row.id, 2, "Chờ duyệt")}
          >
            {"Mở chặn"}
          </SoftButton>
        )}
      </>
      ),
    },
    { field: "quantity", headerName: "Số lượng", width: 150 },
    { field: "user_id", headerName: "Người bán", width: 200, renderCell: (params) => <UserModal userId={params.row.user_id} /> },
    { field: "comment_count", headerName: "Số lượt bình luận", width: 200 },
  ];

  return {
    columns: columns,
    rows: rows,
    pageCount: pageCount,
  };
};

export default productsTableData;
