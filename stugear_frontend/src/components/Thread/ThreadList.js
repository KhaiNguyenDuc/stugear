import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faMedal, faThumbsUp, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import UserModal from "../Profile/UserModal/UserModal";
const ThreadList = ({ threads }) => {

  return (
    <>
    <div className="thread-list">

    {threads.map((thread) => (
        <>
          <section id="thread-content">
            <div className="question-type">
              <div className="row">
                <div className="col-md-1">
                  <div className="left-user left-user-repeat">
                    <div className="text-center">
                    <UserModal userId={thread?.user?.id}/>
                    </div>
                    <span className="d-block text-center mt-2">
                       <FontAwesomeIcon icon={faMedal} style={{color: '#DD9933'}}/>{thread?.user?.reputation}</span>
                    <span className="designetion text-center d-block mt-1" style={{fontSize: '10px'}}>
                     {thread?.user?.name}
                    </span>
                    
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="right-description mt-3">
                    <div id="que-hedder">
                      <h3>
                        <Link to={"/thread/"+thread?.id}>{thread?.title}</Link>
                      </h3>
                    </div>
                    <div className="ques-details">
                      <p>{thread?.description}</p>
                    </div>
                    <div>
                      {thread?.tags?.map((tag, index) => (
                        <button
                          key={index}
                          className={`btn btn-outline tag badge ${tag.color}`}
                        >
                          <Link
                            style={{ textDecoration: "None", color: "White" }}
                            to={`/search/?tag=${tag.id}`}
                          >
                            {tag.name}
                          </Link>
                        </button>
                      ))}
                    </div>
                    <hr />

                    <div className="ques-icon-info">
                      <span style={{ color: "#FF7361" }} title="Số lượt yêu thích">
                        <FontAwesomeIcon icon={faThumbsUp} /> {thread?.like}
                      </span>

                      <span title="Ngày đăng">
                        <FontAwesomeIcon icon={faClock} /> {thread?.create_at}
                      </span>

                      <a
                        title="Báo cáo"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <FontAwesomeIcon icon={"bug"} /> Báo cáo
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 d-none d-md-inline">
                  <div className="ques-type">
                    <span className="me-2" >
                      <button type="button" className="q-type button-ques">
                        <FontAwesomeIcon icon={"comment"} />{" "}
                        {thread?.reply} phản hồi
                      </button>
                    </span>
                    <span >
                      <button type="button" className="q-type button-ques">
                        <FontAwesomeIcon icon={"user"} className="i" />{" "}
                        {thread?.view} lượt xem
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ))}
    </div>
 
   
    </>
  );
};
export default ThreadList;
