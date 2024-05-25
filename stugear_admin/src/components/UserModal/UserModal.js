import { useState } from "react";
import "./UserModal.css";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserService from "services/UserService/UserService";
import { BASE_URL } from "utils/Constant";
import zIndex from "@mui/material/styles/zIndex";
const UserModal = ({ userId }) => {
  const [user, setUser] = useState([]);
  const [isUserLoading, setUserLoading] = useState(false)

  const getUserById = async (id) => {
    setUserLoading(true)
    const response = await UserService.getUserById(id);

    if (response?.status !== 400) {
      setUser(response[0]);
    }
    setUserLoading(false)
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    getUserById(userId);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <>
      <span onClick={openModal} >
        <img
          src={BASE_URL + `/users/${userId}/images`}
          className="hover-effect pic rounded-circle"
          style={{ width: "40px", height: "40px" }}
          alt=""
        />
      </span>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
          <>
            <section className="">
              <div className="row d-flex justify-content-center align-items-center ">
                <div className="" style={{ borderRadius: 15 }}>
                  <div className="p-2">
   
                    <div className="d-flex justify-content-between mb-4 mt-2">
                
                      <button
                        onClick={closeModal}
                        className="btn ms-auto text-white"
                        style={{ backgroundColor: "#ce0c23" }}
                      >
                        {" "}
                        Đóng
                      </button>
                    </div>

                    <div className="d-flex text-black">
                      <div className="flex-shrink-0">
                        <img
                          src={BASE_URL + `/users/${user?.id}/images`}
                          alt=""
                          className="img-fluid"
                          style={{ width: 148, height: 150, borderRadius: 10 }}
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h5 className="mb-1">{user?.name}</h5>
                        <p className=" mt-2 pb-1" style={{ color: "#2b2a2a" }}>
                          {user?.first_name} {user?.last_name}
                        </p>
                        <div
                          className="d-flex justify-content-start rounded-3 p-2  mt-4"
                          style={{ backgroundColor: "#efefef" }}
                        >
                          <div>
                            <p className="small text-muted mb-1">Tên</p>
                            <p className="mb-0">{user?.first_name}</p>
                          </div>
                          <div className="px-3">
                            <p className="small text-muted mb-1">Giới tính</p>
                            <p className="mb-0">
                              {user?.gender === 0 ? "Nam" : "Nữ"}
                            </p>
                          </div>
                          <div>
                            <p className="small text-muted mb-1">Độ uy tín</p>
                            <p className="mb-0">{user?.reputation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" pt-1 mt-3">
                      <p className="dis ms-1">
                        <FontAwesomeIcon
                          icon="envelope"
                          style={{ marginRight: "7px" }}
                        />{" "}
                        {user?.email}
                      </p>
                      <p className="dis ms-1 ">
                        <FontAwesomeIcon
                          icon="phone"
                          style={{ marginRight: "7px" }}
                        />
                        {user?.phone_number === null
                          ? "Không có"
                          : user?.phone_number}
                      </p>
                      <p className="dis ms-1 ">
                        <FontAwesomeIcon
                          icon="globe"
                          style={{ marginRight: "7px" }}
                        />
                        {user?.social_link === null
                          ? "Không có"
                          : user?.social_link}
                      </p>
                      <p className="dis ms-1 ">
                        <FontAwesomeIcon
                          icon="address-card"
                          style={{ marginRight: "7px" }}
                        />
                        {user?.full_address === null
                          ? "Không có"
                          : user?.full_address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
      </Modal>
    </>
  );
};

export default UserModal;
