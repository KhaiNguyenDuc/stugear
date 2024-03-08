import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router";
import Header from "../../components/Header";
import ThreadStats from "../../components/Thread/ThreadStats";
import { faQuestionCircle, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, InputGroup } from "react-bootstrap";

const ThreadLayout = () => {
  return (
    <>
      <Header sticky={true} />

      <div className="container my-5">
        <div className="tt-topic-list">
          <div className="tt-item tt-item-popup">
            <div className="tt-col-avatar">
              <FontAwesomeIcon icon={faQuestionCircle} />
            </div>
            <div className="tt-col-message">
             
            <div  style={{ marginRight: "300px" }}>
            
              <InputGroup
                className="form-outline"
                id="search-group"
                style={{ marginRight: '100%', width: '200%' }}
              >
                <input
                  id="search-input"
                  placeholder="Nhập tên, nội dung bài đăng"
                  type="search"
                  className="form-control"
                  // onChange={(e) => handleInputChange(e)}
                />
                <Button id="search-button">
                  <FontAwesomeIcon icon="search" id="search-icon" />
                </Button>
              </InputGroup>
            </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            <Outlet />
          </div>
          <div className="col-md-3">
            <ThreadStats />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default ThreadLayout;
