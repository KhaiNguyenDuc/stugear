import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Notification.css";
import { faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faBell, faDotCircle } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import Loading from "../../Loading";
import NotificationService from "../../../service/NotificationService";
import UserModal from "../UserModal/UserModal";
import { Link } from "react-router-dom";
import CustomPagination from "../../Pagination/Pagination";
import UserService from "../../../service/UserService";
const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const getCurrentNotification = async () => {
    setLoading(true);
    const response = await NotificationService.getCurrentUserNotifications(currentPage);
    if (response?.status !== 400) {     
      
      localStorage.setItem("hasUnreadNotification", 0); 
      setTotalPage(response?.total_page);
      setNotifications(response?.data);
    }
    setLoading(false);
  };
  const updateNotiStatus = async () => {
    await UserService.updateUserNotiStatus(false);
  };
  useEffect(() => {
    getCurrentNotification();
    updateNotiStatus(); // set_unread_noti to false
  }, []);
  return (
    <>
      <div>
        <section className="section-50">
          <div className="container">
            <h3 className="m-b-50 heading-line">
              Thông báo <FontAwesomeIcon icon={faBell} />
            </h3>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <div className="notification-ui_dd-content">

                  {notifications?.length == 0 && (
                    <p className="text-center my-3">Bạn chưa có thông báo nào!</p>
                  )}

                  {notifications.map((noti) => (
                    <Link className="notification-list" style={{textDecoration: 'None', color: 'black'}}
                      to={"/"+ noti?.link}
                    >
                      <div className="notification-list_content">
                        <div className="notification-list_img">
                          <UserModal userId={noti?.interact_user} />
                        </div>
                        <div className="notification-list_detail">
                          <p>{noti?.title}</p>
                          <p className="text-muted">{noti?.content}</p>
                          <p className="text-muted">
                            <small>{noti?.updated_at}</small>
                          </p>
                        </div>
                      </div>
                      {noti?.image && (

                        <div className="notification-list_feature-img">
                        <img src={noti.image} alt="Feature image" />
                        </div>
                      )}
                    </Link>
                  ))}
                </div>

                {notifications?.length > 0 && (
            <CustomPagination 
            currentPage={currentPage}
            nextPage={nextPage}
            prevPage={prevPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
          />
                )}
    
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Notification;
