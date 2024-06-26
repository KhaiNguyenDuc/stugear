import MainLayout from "../layouts/MainLayout/index.js";
import Login from "../pages/Main/Login/index.js";
import Register from "../pages/Main/Register/index.js";
import ResetPassword from "../pages/Main/ResetPassword/index.js";
import FindAccount from "../pages/Main/FindAccount/index.js";
import { Navigate, Route, useRoutes } from "react-router-dom";
import LandingPage from "../pages/Main/LandingPage/index.js";
import Info from "../pages/Main/Info/index.js";
import Contact from "../pages/Main/Contact/index.js";
import HomePage from "../pages/Main/HomePage/index.js";
import ProductPage from "../pages/Main/ProductPage/ProductPage.js";
import HomeLayout from "../layouts/HomeLayout/HomeLayout.js";
import SearchPage from "../pages/Main/SearchPage/SearchPage.js";
import PersonalLayout from "../layouts/PersonalLayout/PersonalLayout.js";
import General from "../components/Profile/General/index.js";
import Wishlist from "../components/Profile/Wishlist/Wishlist.js";
import ErrorPage from "../pages/Main/ErrorPage/ErrorPage.js";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute.js";
import UploadProduct from "../pages/Main/UploadProduct/UploadProduct.js";
import MyProduct from "../components/Profile/MyProduct/MyProduct.js";
import Verify from "../pages/Main/Verify/Verify.js";
import useAuth from "../hooks/useAuth.js";
import MyWallet from "../components/Profile/MyWallet/MyWallet.js";
import CheckoutPage from "../pages/Main/Checkout/index.js";
import MyOrder from "../components/Profile/MyOrder/MyOrder.js";
import OrderPage from "../pages/Main/OrderPage/index.js";
import PaymentSucess from "../pages/Main/PaymentSucess/PaymentSucess.js";
import MySell from "../components/Profile/MySell/MySell.js";
import ThreadPage from "../pages/Main/ThreadPage/index.js";
import ThreadLayout from "../layouts/ThreadLayout/ThreadLayout.js";
import ThreadDetailPage from "../pages/Main/ThreadDetailPage/index.js";
import CreateThread from "../components/Thread/CreateThread.js";
import ThreadCreatePage from "../pages/Main/ThreadCreatePage/index.js";
import MyThread from "../components/Profile/MyThread/MyThread.js";
import Notification from "../components/Profile/Notification/Notification.js";
function useRouteElements() {
  const RejectRoute = ({ children }) => {
    const { user } = useAuth();

    return user?.roles?.includes("USER") ? (
      <Navigate to="/landing-page" />
    ) : (
      children
    );
  };

  const routeElements = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <LandingPage />,
        },
        // Other routes...
      ],
    },
    {
      path: "",
      element: <HomeLayout title={"Trang chủ"} />,
      children: [
        {
          path: "/home-page/category/:slug",
          element: <HomePage />,
        },
      ],
    },
    {
      path: "",
      element: (
        <HomeLayout
          title={"Trang chủ"}
          sub_title={"Sản phẩm"}
          titleUrl={"/home-page/category/1"}
        />
      ),
      children: [
        {
          path: "/home-page/product-detail/:slug",
          element: <ProductPage />,
        },
      ],
    },
    {
      path: "",
      element: (
        <ProtectedRoute>
          <PersonalLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/member/wishlist",
          element: <Wishlist />,
        },
        {
          path: "/member/notification",
          element: <Notification />,
        },
        {
          path: "/member/general",
          element: <General />,
        },
        {
          path: "/member/my-product",
          element: <MyProduct />,
        },
        {
          path: "/member/my-sell",
          element: <MySell />,
        },
        {
          path: "/member/wallet",
          element: <MyWallet />,
        },
        {
          path: "/member/order",
          element: <MyOrder />,
        },
        {
          path: "/member/my-thread",
          element: <MyThread />,
        },
      ],
    },
    {
      path: "",
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/member/upload/:slug?",
          element: <UploadProduct />,
        },
        {
          path: "/member/checkout/:slug",
          element: <CheckoutPage />,
        },
        {
          path: "/member/order-detail/:slug",
          element: <OrderPage />,
        },
      ],
    },

    {
      path: "",
      element: (
        <RejectRoute>
          <MainLayout />
        </RejectRoute>
      ),
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/member/reset-password/:slug",
          element: <ResetPassword />,
        },
        {
          path: "find-account",
          element: <FindAccount />,
        },
      ],
    },
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          path: "/landing-page",
          element: <LandingPage />,
        },

        {
          path: "info",
          element: <Info />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "search/:slug?",
          element: <SearchPage />,
        },
        {
          path: "internal-error",
          element: (
            <ErrorPage
              status="500"
              message={"Có lỗi xảy ra"}
              title={"Lỗi hệ thống"}
            />
          ),
        },
        {
          path: "*",
          element: (
            <ErrorPage
              status="404"
              message={"Không tìm thấy trang bạn yêu cầu"}
              title={"Không tìm thấy trang"}
            />
          ),
        },
        {
          path: "/verify/:slug?",
          element: <Verify />,
        },
      ],
    },

    // {
    //   path: '',
    //   element: <AdminRoute><AdminLayout/></AdminRoute>,
    //   children: [
    //     {
    //       path: '/',
    //       element:  <AdminCategory/>
    //     },
    //     {
    //       path: '/users',
    //       element: <AdminUser/>
    //     },
    //     {
    //       path: '/products',
    //       element: <AdminProduct/>
    //     },
    //     {
    //       path: '/reports',
    //       element: <AdminReport/>
    //     },
    //     {
    //       path: '/withdraws',
    //       element: <AdminWithdraw/>
    //     },
    //     {
    //       path: '/orders',
    //       element: <AdminOrder/>
    //     },
    //     {
    //       path: "/categories",
    //       element:<AdminCategory/>
    //     }
    //   ]
    // },
    {
      path: "",
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/payment-success/",
          element: <PaymentSucess />,
        },
      ],
    },
    {
      path: "/",
      element: <ThreadLayout />,
      children: [
        {
          path: "/thread",
          element: <ThreadPage />,
        },
      ],
    },
    {
      path: "/",
      element: (
        <MainLayout
          hasNavigation={true}
          title={"Diễn đàn"}
          sub_title={"Bài đăng"}
          titleUrl={"/thread"}
        />
      ),
      children: [
        {
          path: "/thread/:slug",
          element: <ThreadDetailPage />,
        },
      ],
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          {" "}
          <MainLayout
            hasNavigation={true}
            title={"Diễn đàn"}
            sub_title={"Tạo bài đăng"}
            titleUrl={"/thread"}
          />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/thread/create",
          element: <ThreadCreatePage />,
        },
      ],
    },
  ]);
  return routeElements;
}

export default useRouteElements;
