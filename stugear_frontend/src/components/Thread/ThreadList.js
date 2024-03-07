import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const ThreadList = ({ threads }) => {
  return (
    <>
      {threads.map((thread) => (
        <>
          <section id="content">
            <div className="question-type">
              <div className="row">
                <div className="col-md-1">
                  <div className="left-user left-user-repeat">
                    <a href="#">
                      <img src={thread?.user?.image_url} alt="image" className="d-block mb-3" />
                    </a>
                    <span className="designetion ms-2">
                     {thread?.user?.name}
                    </span>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="right-description mt-3">
                    <div id="que-hedder">
                      <h3>
                        <a href="#">{thread?.title}</a>
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
                      <span style={{ color: "#DFAA63" }}>
                        <FontAwesomeIcon icon={"star"} /> {thread?.rating}
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
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li>
            <a href="#" aria-label="Previous">
              <span aria-hidden="true">«</span>
            </a>
          </li>
          <li>
            <a href="#">1</a>
          </li>
          <li>
            <a href="#">2</a>
          </li>
          <li>
            <a href="#">3</a>
          </li>
          <li>
            <a href="#">4</a>
          </li>
          <li>
            <a href="#">5</a>
          </li>
          <li>
            <a href="#" aria-label="Next">
              <span aria-hidden="true">»</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default ThreadList;
