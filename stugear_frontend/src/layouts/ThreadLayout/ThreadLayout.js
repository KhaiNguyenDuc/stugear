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

    
            <Outlet />
     
      </div>

      <Footer />
    </>
  );
};
export default ThreadLayout;
