import "./Vote.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ProductService from "../../../service/ProductService";
import { useEffect, useState } from "react";
import CustomModal from "../../Modal/Modal";
import { useNavigate } from "react-router-dom";
const Vote = ({ voteNum, commentId, isUpvote, isDownvote }) => {
  const[flagUpvote, setFlagUpvote] = useState(0);
  useEffect(() => {
    if(isUpvote == true ){
        setFlagUpvote(1)
    }else if(isDownvote == true){
        setFlagUpvote(2)
    }
    
  }, [])
  const navigate = useNavigate();
  const [vote, setVote] = useState(voteNum);
  const voteUp = async () => {
    await ProductService.voteCommentByCommentId(
      commentId,
      "+",
      parseInt(localStorage.getItem("user_id"))
    );
    setVote((prev) => prev + 1);
    setFlagUpvote(1)
  };

  const voteDown = async () => {
    await ProductService.voteCommentByCommentId(
      commentId,
      "-",
      parseInt(localStorage.getItem("user_id"))
    );
    setVote((prev) => prev - 1);
    setFlagUpvote(2)
  };
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleSave = () => {
    navigate("/login");
    setShow(false);
  };
  return (
    <>
      <CustomModal
        handleSave={handleSave}
        handleClose={handleClose}
        show={show}
        heading={"Vui lòng tạo tài khoản để tương tác"}
        body={'Bấm vào nút "Đồng ý" để đến trang đăng nhập'}
      ></CustomModal>
      {localStorage.getItem("user_id") ? (
        <div className="vote-icon me-2">
          <Link>
            <FontAwesomeIcon
              icon="caret-up"
              onClick={() => (flagUpvote===2 || flagUpvote===0) && voteUp()}
              className={`col-md-12 vote-icon-up ${(flagUpvote===1 ) ? "disabled" : ""}`}
            />
          </Link>
          <span className="">{vote}</span>
          <Link>
            <FontAwesomeIcon
              icon="caret-down"
              onClick={() => (flagUpvote===1 || flagUpvote===0 ) && voteDown()}
              className={`col-md-12 vote-icon-up ${
                (flagUpvote===2) ? "disabled" : ""
              }`}
            />
          </Link>
        </div>
      ) : (
        <div className="vote-icon me-2">
          <Link>
            <FontAwesomeIcon
              icon="caret-up"
              onClick={() => setShow(true)}
              className="col-md-12 vote-icon-up"
            />
          </Link>
          <span className="">{vote}</span>
          <Link>
            <FontAwesomeIcon
              icon="caret-down"
              onClick={() => setShow(true)}
              className="col-md-12 vote-icon-up"
            />
          </Link>
        </div>
      )}
    </>
  );
};
export default Vote;
