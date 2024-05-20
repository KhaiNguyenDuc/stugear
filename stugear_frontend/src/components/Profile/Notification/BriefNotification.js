import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./BriefNotification.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faBell,
  faCreditCard,
} from "@fortawesome/free-regular-svg-icons";
import { Overlay, Popover } from "react-bootstrap";
import NotificationService from "../../../service/NotificationService";
import UserModal from "../UserModal/UserModal";
import Loading from "../../Loading";
import useProduct from "../../../hooks/useProduct";
import UserService from "../../../service/UserService";

const BriefNotification = () => {
  const {productCount} = useProduct()
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const getCurrentNotification = async () => {
    setLoading(true);
    const response = await NotificationService.getCurrentUserNotifications();
    if (response?.status !== 400) {
      localStorage.setItem("hasUnreadNotification", 0);
      setNotifications(response?.data);
    }
    setLoading(false);
  };

  const updateNotiStatus = async () => {
    await UserService.updateUserNotiStatus(false);
  };

  useEffect(() => {
    if(show == true){
      getCurrentNotification();
      updateNotiStatus(); // set unread_noti to false
    }
  }, [show]);

  return (
    <>
      <Link
        style={{ textDecoration: "none", color: "black" }}
        className="me-3"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faBell} className="member-icon" />
        {localStorage.getItem("hasUnreadNotification") == 1 && (

<span className="badge badge-warning" id='lblWishlistCount'>!</span>
        )}
      </Link>
      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref.current}
        containerPadding={50}
      >
        <Popover id="noti-popover-contained" style={{ minWidth: "200px" }}>
          {isLoading ? (
            <Loading />
          ) : (
            <ul className="menu noti-menu">
              {notifications?.length == 0 && (
                <>
                  <p className="p-2 mt-2">Bạn chưa có thông báo nào !</p>
                  <hr className="bg-dark p-0 m-0" />
                </>
              )}

              {notifications?.map((noti) => (
                <div>
                  <Link
                    className="link"
                    to={"/"+ noti?.link}
                    style={{ textDecoration: "none" }}
                  >
                    <li className="personal-li p-3">
                      <UserModal userId={noti?.interact_user} /> {noti?.title}
                    </li>
                  </Link>
                  <hr className="bg-dark p-0 m-0" />
                </div>
              ))}
            </ul>
          )}

          <div className="text-center">
            <Link
              to="/member/notification"
              className="btn btn-success text-white mb-3"
            >
              Chi tiết
            </Link>
          </div>
        </Popover>
      </Overlay>
    </>
  );
};

export default BriefNotification;
