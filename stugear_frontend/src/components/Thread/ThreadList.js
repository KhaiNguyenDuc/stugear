import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faMedal, faThumbsUp, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import UserModal from "../Profile/UserModal/UserModal";
import CustomPagination from "../Pagination/Pagination";
import { useState } from "react";
const ThreadList = ({ threads }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState()
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  return (
    <>
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
                    <span className="designetion text-center d-block mt-1">
                     {thread?.user?.name}
                    </span>
                    
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="right-description mt-3">
                    <div id="que-hedder">
                      <h3>
                        <Link to={"/thread/"+thread.id}>{thread?.title}</Link>
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
                      <span style={{ color: "#FF7361" }}>
                        <FontAwesomeIcon icon={faThumbsUp} /> {thread?.rating}
                      </span>

                      <span>
                        <FontAwesomeIcon icon={faClock} /> {thread?.last_reply}
                      </span>

                      <a
                        href="#"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <FontAwesomeIcon icon={"bug"} /> Báo cáo
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="ques-type">
                    <a href="#" className="d-block">
                      <button type="button" className="q-type button-ques">
                        <FontAwesomeIcon icon={"comment"} />{" "}
                        {thread?.total_reply} phản hồi
                      </button>
                    </a>
                    <a href="#" className="d-block">
                      <button type="button" className="q-type button-ques">
                        <FontAwesomeIcon icon={"user"} className="i" />{" "}
                        {thread?.total_view} lượt xem
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ))}
       <div  className="mt-4 ">
        <CustomPagination 
            currentPage={currentPage}
            totalPage={totalPage}
            prevPage={prevPage}
            nextPage={nextPage}
            setCurrentPage={setCurrentPage}
          />
      </div>
    </>
  );
};
export default ThreadList;
