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

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import {BASE_URL} from "../../../utils/Constant"
import AuthService from "services/AuthService/AuthService";
import SoftAlert from "components/SoftAlert";
import { useNavigate } from "react-router-dom";
import useAuth from "hook/useAuth";
function SignIn() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(true);
  const [loginData, setLoginData] = useState({});
  const [isUnauthorize, setUnauthorize] = useState(false)
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleChange = (e) => {
    setLoginData({...loginData, [e.target.name]: e.target.value})
  }
  const handleLogin = async () => {
    setUnauthorize(false)
    const response = await AuthService.login(loginData, rememberMe);
    
    if(response.status == 500 || response.status == 401){
      setUnauthorize(true)
    }else{
      const accessToken = response.access_token;
      const refreshToken = response.refresh_token;
      const userId = response.user_id;
      const username = response.username;
      const roles = response.roles;

      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("user_id", userId);
      localStorage.setItem("username", username);
      localStorage.setItem("roles", roles);
      localStorage.setItem(
        "user_image",
        BASE_URL + `/users/${response?.user_id}/images`
      );
      setUser(response);
      navigate("/dashboard")
    }
    
  }
  return (
    <CoverLayout
      title="Chào mừng trở lại"
      description="Nhập email và mật khẩu của bạn để đăng nhập"
      image={curved9}
    >
      {isUnauthorize && (
        <SoftAlert color={"error"} dismissible={true}>
          Tên đăng nhập hoặc mật khẩu không đúng
        </SoftAlert>
      )}
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput type="email" placeholder="Email" name="email" value={loginData.email} onChange={(e) => handleChange(e)}/>
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Mật khẩu
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="Password" name="password" value={loginData.password} onChange={(e) => handleChange(e)} />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Lưu mật khẩu
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth onClick={() => handleLogin()}>
            Đăng nhập
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
           Không phải người quản lý?{" "}
            <SoftTypography
              component={Link}
              to={"https://stugear.website/register"}
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Đăng ký
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
