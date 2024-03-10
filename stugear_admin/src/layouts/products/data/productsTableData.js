/* eslint-disable react/prop-types */
// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftProgress from "components/SoftProgress";

// Images
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoWebDev from "assets/images/small-logos/logo-webdev.svg";
import logoXD from "assets/images/small-logos/logo-xd.svg";
import { useEffect, useState } from "react";
import ProductService from "services/ProductService/ProductService";
import SoftAvatar from "components/SoftAvatar";
import { BASE_URL } from "utils/Constant";

function Completion({ value, color }) {
  return (
    <SoftBox display="flex" alignItems="center">
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {value}%&nbsp;
      </SoftTypography>
      <SoftBox width="8rem">
        <SoftProgress value={value} color={color} variant="gradient" label={false} />
      </SoftBox>
    </SoftBox>
  );
}

function Product({ id, name, email }) {

  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={`${BASE_URL}/api/products/${id}/images`} alt={name} size="sm" variant="rounded" />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

const productsTableData = () =>{

  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const response = await ProductService.getAllProducts(1);
    if(response?.status != 400){
      setProducts(response?.data);
    }
  }
  useEffect(() => {
    getProducts()
  }, [])
  
  const rows = products.map((product) =>{
    const image =
      <SoftBox mr={2}>
        <SoftAvatar src={product.product_image} size="sm" variant="rounded" />
      </SoftBox>
    
    return (
      {
        "Tên sản phẩm": <Product id={product?.id} name={product.title} />,
        "Giá": (
          <SoftTypography variant="button" color="text" fontWeight="medium">
            {product.price}
          </SoftTypography>
        ),
        "Trạng thái": (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            {product.status}
          </SoftTypography>
        ),
        "Đánh giá": <Completion value={product.rate} color="info" />,
        action,
      }
    )
  })
  return (
    {
      columns: [
        { name: "Tên sản phẩm", align: "left" },
        { name: "Giá", align: "left" },
        { name: "Trạng thái", align: "left" },
        { name: "Đánh giá", align: "center" },
        { name: "action", align: "center" },
      ],
    
      rows: rows
    }
  )
}

const action = (
  <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
    more_vert
  </Icon>
);



export default productsTableData;
