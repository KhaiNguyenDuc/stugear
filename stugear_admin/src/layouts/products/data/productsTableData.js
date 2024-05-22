import { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import ProductService from "services/ProductService/ProductService";
import { BASE_URL } from "utils/Constant";
import { Icon } from "@mui/material";
import UserModal from "components/UserModal/UserModal";
import SoftButton from "components/SoftButton";

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

function Completion({ value, color }) {
  return (
    <SoftBox display="flex" alignItems="center">
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {value}
      </SoftTypography>
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
    Id: (
      <SoftTypography variant="button" color="text" fontWeight="medium">
        {product?.id}
      </SoftTypography>
    ),
    "Tên sản phẩm": <Product id={product?.id} name={product.title} />,
    "Danh mục": (
      <SoftTypography variant="button" color="text" fontWeight="medium">
        {product.price}
      </SoftTypography>
    ),
    "Tình trạng": (
      <SoftTypography variant="button" color="text" fontWeight="medium">
        {product?.condition}
      </SoftTypography>
    ),
    Giá: (
      <SoftTypography variant="button" color="text" fontWeight="medium">
        {product.price}
      </SoftTypography>
    ),
    "Trạng thái": (
      <SoftBadge
        variant="gradient"
        badgeContent={product?.status}
        color={product?.status === "Đã duyệt" ? "success" : "secondary"}
        size="xs"
        container
      />
    ),
    "Cập nhật": (
      <>
             {/* "chặn": "0",
            "nháp": "1",
            "chờ duyệt": "2",
            "đã duyệt": "3",
            "đã bán": "4",
            "đã thanh toán": "5" 
            */}
        {product?.status === "Chờ duyệt" && (
          <SoftButton
            ml={2}
            variant="text"
            color={"success"}
            onClick={() => updateStatus(product?.id, 3, "Đã duyệt")}
          >
            {"Duyệt"}
          </SoftButton>
        )}

        {((product?.status === "Đã duyệt" ||
          product?.status === "Chờ duyệt") && (
            <SoftButton
              ml={2}
              variant="text"
              color={"error"}
              onClick={() => updateStatus(product?.id, 0, "Chặn")}
            >
              {"Chặn"}
            </SoftButton>
          ))}

        {product?.status === "Chặn" && (
          <SoftButton
            ml={2}
            variant="text"
            color={"error"}
            onClick={() => updateStatus(product?.id, 2, "Chờ duyệt")}
          >
            {"Mở chặn"}
          </SoftButton>
        )}
      </>
    ),
    "Số lượng": <Completion value={product?.quantity} color="info" />,
    "Người bán": (
      <SoftBox mr={2}>
        <UserModal userId={product?.user_id} />
      </SoftBox>
    ),
    "Số lượt bình luận": (
      <SoftTypography variant="button" color="text" fontWeight="medium">
        {product?.comment_count}
      </SoftTypography>
    ),
  }));

  return {
    columns: [
      { name: "Id", align: "center" },
      { name: "Tên sản phẩm", align: "left" },
      { name: "Danh mục", align: "left" },
      { name: "Tình trạng", align: "left" },
      { name: "Giá", align: "left" },
      { name: "Trạng thái", align: "center" },
      { name: "Cập nhật", align: "center" },
      { name: "Số lượng", align: "center" },
      { name: "Người bán", align: "center" },
      { name: "Số lượt bình luận", align: "center" },
    ],
    rows: rows,
    pageCount: pageCount,
  };
};

export default productsTableData;
