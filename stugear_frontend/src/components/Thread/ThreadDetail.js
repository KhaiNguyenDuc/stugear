import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ThreadDetail.css";
import {
  faBug,
  faClock,
  faEye,
  faIcons,
  faMedal,
  faReply,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  faThumbsDown,
  faThumbsUp,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SuggestThread from "./SuggestThread";
import CustomPagination from "../Pagination/Pagination";
import UserModal from "../Profile/UserModal/UserModal";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Loading from "../Loading";
const ThreadDetail = ({
  thread,
  replies,
  filter,
  setFilter,
  isReplyLoading,
}) => {
  return (
    <>
      <div classname="tt-single-topic-list">
        <div className="tt-item">
          <div
            className="tt-single-topic mb-3"
            style={{ backgroundColor: "white" }}
          >
            <div className="tt-item-header">
              <div className="tt-item-info info-top">
                <div className="tt-avatar-icon mt-2">
                  <UserModal userId={thread?.user?.id} />
                </div>

                <div className="tt-avatar-title">
                  <span>{thread?.user?.name}</span>
                  <span className="text-center ms-2">
                    <FontAwesomeIcon
                      icon={faMedal}
                      style={{ color: "#DD9933" }}
                    />{" "}
                    {thread?.user?.reputation}
                  </span>
                </div>

                <span className="tt-info-time">
                  <span className={`me-3 tag tt-badge bg-secondary text-white`}>
                    {thread?.category?.name}
                  </span>
                  <FontAwesomeIcon icon={faClock} className="me-2" />
                  {thread?.created_at}
                </span>
              </div>
              <h3 className="tt-item-title">
                <span>{thread?.title}</span>
              </h3>
              <div className="tt-item-tag">
                <ul className="tt-list-badge">
                  {thread?.tags?.map((tag, index) => (
                    <li>
                      <button
                        key={index}
                        className={`tag tt-badge ${tag.color}`}
                      >
                        <Link
                          style={{ textDecoration: "None", color: "White" }}
                          to={`/search/?tag=${tag.id}`}
                        >
                          {tag.name}
                        </Link>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="tt-item-description">
              <p dangerouslySetInnerHTML={{ __html: thread?.content }} />
            </div>
            <div className="tt-item-info info-bottom">
              <a href="#" className="tt-icon-btn">
                <FontAwesomeIcon icon={faThumbsUp} />{" "}
                <span className="tt-text">{thread?.like}</span>
              </a>
              <a href="#" className="tt-icon-btn">
                <FontAwesomeIcon icon={faThumbsDown} />{" "}
                <span className="tt-text">{thread?.dislike}</span>
              </a>

              <div className="col-separator" />

              <a href="#" className="tt-icon-btn tt-hover-02 tt-small-indent">
                <FontAwesomeIcon icon={faBug} />
              </a>
              <a href="#" className="tt-icon-btn tt-hover-02 tt-small-indent">
                <FontAwesomeIcon icon={faReply} />
              </a>
            </div>
          </div>
        </div>

        <div className="tt-item mb-3">
          <div className="tt-info-box">
            <h4>Trạng thái bài đăng</h4>
            <div className="tt-row-icon mt-2">
              <div className="tt-item">
                <a href="#" className="tt-icon-btn tt-position-bottom" title="Số lượt phản hồi">
                  <FontAwesomeIcon icon={faReply} />
                  <span className="tt-text">{thread?.reply}</span>
                </a>
              </div>
              <div className="tt-item">
                <a href="#" className="tt-icon-btn tt-position-bottom"  title="Số lượt xem">
                  <FontAwesomeIcon icon={faEye} />
                  <span className="tt-text">{thread?.view}</span>
                </a>
              </div>

              <div className="tt-item">
                <a href="#" className="tt-icon-btn tt-position-bottom"  title="Số lượt yêu thích">
                  <FontAwesomeIcon icon={faThumbsUp} />
                  <span className="tt-text">{thread?.like}</span>
                </a>
              </div>
              <div className="tt-item">
                <a href="#" className="tt-icon-btn tt-position-bottom"  title="Số lượt phản đối">
                  <FontAwesomeIcon icon={faThumbsDown} />
                  <span className="tt-text">{thread?.dislike}</span>
                </a>
              </div>
            </div>
            <hr />
            {/* 'new' => '1',
        'like' => '2',
        'long' => '3',
        'short' => '4',
        'accept' => '5' */}
            <div className="row-object-inline form-default">
              <h6 className="tt-title">Lọc phản hồi theo:</h6>
              <ul className="tt-list-badge tt-size-lg">
                <li onClick={() => setFilter("new")}>
                  <Link>
                    <span
                      className={
                        filter === "new" ? "tt-color02 tt-badge" : "tt-badge"
                      }
                    >
                      Mới nhất
                    </span>
                  </Link>
                </li>
                <li>
                  <Link onClick={() => setFilter("like")}>
                    <span
                      className={
                        filter === "like" ? "tt-color02 tt-badge" : "tt-badge"
                      }
                    >
                      Like nhiều nhất
                    </span>
                  </Link>
                </li>
                <li>
                  <Link onClick={() => setFilter("long")}>
                    <span
                      className={
                        filter === "long" ? "tt-color02 tt-badge" : "tt-badge"
                      }
                    >
                      Dài nhất
                    </span>
                  </Link>
                </li>
                <li>
                  <Link onClick={() => setFilter("short")}>
                    <span
                      className={
                        filter === "short" ? "tt-color02 tt-badge" : "tt-badge"
                      }
                    >
                      Ngắn nhất
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {isReplyLoading ? (
          <Loading />
        ) : (
          <>
            {replies?.map((reply) => (
              <>
                <div
                  className="tt-item mb-3"
                  style={{ backgroundColor: "white" }}
                >
                  <div className="tt-single-topic">
                    <div className="tt-item-header pt-noborder">
                      <div className="tt-item-info info-top">
                        <div className="tt-avatar-icon">
                          <UserModal userId={reply?.user?.id} />
                        </div>
                        <div className="tt-avatar-title">
                          <a href="#">{reply.user.name}</a>
                          <span className="text-center">
                            <FontAwesomeIcon
                              icon={faMedal}
                              style={{ color: "#DD9933" }}
                            />{" "}
                            {thread?.user?.reputation}
                          </span>
                        </div>
                        <a href="#" className="tt-info-time">
                          <FontAwesomeIcon icon={faClock}  className="pe-2"/>{reply.create_at}
                        </a>
                      </div>
                    </div>
                    <div className="tt-item-description">
                      {reply?.reply_on ? (
                        <>
                          <p
                            dangerouslySetInnerHTML={{ __html: reply.content }}
                          ></p>
                          <div className="topic-inner-list">
                            <div className="topic-inner">
                              <div className="topic-inner-title">
                                <div className="topic-inner-avatar">
                                  <UserModal
                                    userId={reply?.reply_on?.user?.id}
                                  />
                                </div>
                                <div className="topic-inner-title">
                                  <a href="#">{reply.reply_on.user.name}</a>
                                  <span className="text-center ms-2">
                                    <FontAwesomeIcon
                                      icon={faMedal}
                                      style={{ color: "#DD9933" }}
                                    />{" "}
                                    {reply?.reply_on?.user?.reputation}
                                  </span>
                                </div>
                              </div>
                              <div className="topic-inner-description">
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: reply.reply_on.content,
                                  }}
                                ></p>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <p
                            dangerouslySetInnerHTML={{ __html: reply.content }}
                          ></p>
                        </>
                      )}
                    </div>
                    <div className="tt-item-info info-bottom">
                      <a href="#" className="tt-icon-btn" title="Đồng ý">
                        <FontAwesomeIcon icon={faThumbsUp}  />{" "}
                        <span className="tt-text">{reply.total_like}</span>
                      </a>
                      <a href="#" className="tt-icon-btn" title="Phản đối">
                        <FontAwesomeIcon icon={faThumbsDown} />{" "}
                        <span className="tt-text">{reply.total_dislike}</span>
                      </a>
                      <div className="col-separator" />
                      <a
                        title="Báo cáo"
                        className="tt-icon-btn tt-hover-02 tt-small-indent"
                      >
                        <FontAwesomeIcon icon={faBug} />
                      </a>
                      <a
                        title="Phản hồi"
                        className="tt-icon-btn tt-hover-02 tt-small-indent"
                      >
                        <FontAwesomeIcon icon={faReply} />
                      </a>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </>
        )}
      </div>
    </>
  );
};
export default ThreadDetail;
