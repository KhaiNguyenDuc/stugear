
import Dashboard from "layouts/dashboard";
import Users from "layouts/users";
import Withdraws from "layouts/withdraws";
import Products from "layouts/products";
import SignIn from "layouts/authentication/sign-in";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Document from "examples/Icons/Document";
import Orders from "layouts/orders";
import { People, Report, PanoramaPhotosphere, Book, Menu } from "@mui/icons-material";
import useAuth from "hook/useAuth";
import { Navigate } from "react-router-dom";
import Reports from "layouts/report";
import Category from "layouts/categories";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (user?.roles?.includes("ADMIN")) {
    return children 
  }
  // user is not authenticated
  return <Navigate to="/authentication/sign-in" />;
}

const routes = [
  {
    type: "collapse",
    name: "Trang chủ",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component:  <ProtectedRoute><Dashboard /></ProtectedRoute>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Người dùng",
    key: "users",
    route: "/users",
    icon: <People size="12px" />,
    component: <ProtectedRoute><Users /></ProtectedRoute>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Danh mục",
    key: "categories",
    route: "/categories",
    icon: <Book size="12px" />,
    component: <ProtectedRoute><Category /></ProtectedRoute>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sản phẩm",
    key: "products",
    route: "/products",
    icon: <Menu size="12px" />,
    component: <ProtectedRoute><Products /></ProtectedRoute>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Đơn hàng",
    key: "orders",
    route: "/orders",
    icon: <PanoramaPhotosphere size="12px" />,
    component: <ProtectedRoute><Orders /></ProtectedRoute>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Yêu cầu rút tiền",
    key: "withdraws",
    route: "/withdraws",
    icon: <Office size="12px" />,
    component: <ProtectedRoute><Withdraws/></ProtectedRoute>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Đơn tố cáo",
    key: "reports",
    route: "/reports",
    icon: <Report size="12px" />,
    component: <ProtectedRoute><Reports/></ProtectedRoute>,
    noCollapse: true,
  },
  {
    name: "Đăng nhập",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
];

export default routes;
