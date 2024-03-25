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
import Modal from "react-modal";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  faThumbsDown,
  faThumbsUp,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import SuggestThread from "./SuggestThread";
import CustomPagination from "../Pagination/Pagination";
import UserModal from "../Profile/UserModal/UserModal";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Loading from "../Loading";
import ThreadService from "../../service/ThreadService";
import CustomModal from "../Modal/Modal";
import ThreadReplyService from "../../service/ThreadReplyService";
import ThreadReply from "./ThreadReply";
const ThreadDetail = ({
  threadDetail,
  repliesDetail,
  filter,
  setFilter,
  isReplyLoading,
  setReload,
  targetRef,
}) => {
  const scrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const navigate = useNavigate();
  const [isReply, setReply] = useState({
    id: 0,
    value: false,
  });
  const [thread, setThread] = useState(threadDetail);
  const [replies, setReplies] = useState(repliesDetail);

  const [isLike, setIsLike] = useState(thread?.is_like);
  const [isReplyLike, setIsReplyLike] = useState([]);
  const [AIReply, setAIReply] = useState();

  useEffect(() => {
    setReplies(repliesDetail);
    setIsReplyLike(
      repliesDetail.map((reply) => ({
        id: reply.id,
        value: reply?.is_like,
      }))
    );
  }, [repliesDetail]);

  useEffect(() => {
    const getAIReply = async () => {
      const reponse = await ThreadReplyService.getAIReplyByThreadId(threadDetail?.id);
      if(reponse?.status != 400){
        setAIReply(reponse);
      }
    }
    getAIReply()
  }, [])
  const handleThreadReact = async (react) => {
    let likeBoolean = react === "+" ? true : false;
    setIsLike(likeBoolean);

    const response = await ThreadService.reactThread(thread?.id, {
      like: likeBoolean,
    });
    if (response?.status == 400) {
      setShow(true);
      return;
    }
    if (likeBoolean === true && isLike != undefined) {
      setThread({
        ...thread,
        like: thread?.like + 1,
        dislike: thread?.dislike - 1,
      });
    } else if (likeBoolean === false && isLike != undefined) {
      setThread({
        ...thread,
        like: thread?.like - 1,
        dislike: thread?.dislike + 1,
      });
    } else if (likeBoolean === true && isLike == undefined) {
      setThread({ ...thread, like: thread?.like + 1 });
    } else if (likeBoolean === false && isLike == undefined) {
      setThread({ ...thread, dislike: thread?.dislike + 1 });
    }
  };

  const handleReplyReact = async (replyId, react) => {
    const replyLikeBoolean = react === "+" ? true : false;

    setIsReplyLike(
      isReplyLike.map((isLike) => {
        if (replyId === isLike?.id && isLike.value !== undefined) {
          return {
            ...isLike,
            value: replyLikeBoolean,
          };
        }
        return isLike;
      })
    );
    let isReplyLikeArg = isReplyLike.map((isLike) => {
      if (replyId === isLike?.id && isLike.value !== undefined) {
        return {
          id: isLike?.id,
          value: replyLikeBoolean,
        };
      }
      return isLike;
    });

    const response = await ThreadReplyService.reactReply(replyId, {
      like: replyLikeBoolean,
    });

    if (response?.status === 400) {
      setShow(true);
      return;
    }

    let isLike = isReplyLikeArg.find((element) => element.id === replyId);
    if (replyLikeBoolean === true && isLike?.value != undefined) {
      setReplies(
        replies.map((reply) => {
          if (reply?.id === replyId) {
            return {
              ...reply,
              like: reply.like + 1,
              dislike: reply.dislike - 1,
            };
          }
          return reply;
        })
      );
    } else if (replyLikeBoolean === false && isLike?.value != undefined) {
      setReplies(
        replies.map((reply) => {
          if (reply?.id === replyId) {
            return {
              ...reply,
              like: reply.like - 1,
              dislike: reply.dislike + 1,
            };
          }
          return reply;
        })
      );
    } else if (replyLikeBoolean === true && isLike?.value == undefined) {
      setIsReplyLike(
        isReplyLike.map((replyLike) => {
          if (replyLike.id === replyId) {
            return {
              ...replyLike,
              value: replyLikeBoolean,
            };
          }
          return replyLike;
        })
      );
      setReplies(
        replies.map((reply) => {
          if (reply?.id === replyId) {
            return { ...reply, like: reply.like + 1 };
          }
          return reply;
        })
      );
    } else if (replyLikeBoolean === false && isLike?.value == undefined) {
      setIsReplyLike(
        isReplyLike.map((replyLike) => {
          if (replyLike.id === replyId) {
            return {
              ...replyLike,
              value: replyLikeBoolean,
            };
          }
          return replyLike;
        })
      );
      setReplies(
        replies.map((reply) => {
          if (reply?.id === replyId) {
            return { ...reply, dislike: reply.dislike + 1 };
          }
          return reply;
        })
      );
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleSave = () => {
    navigate("/login");
    setShow(false);
  };

  const handleReplyClick = (replyId) => {
    if (isReply.id === replyId) {
      // If the IDs match, toggle the value
      setReply((prevState) => ({ ...prevState, value: !prevState.value }));
    } else {
      // If the IDs don't match, update the ID and set value to true
      setReply({ id: replyId, value: true });
    }
  };
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
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
      <CustomModal
        handleSave={handleSave}
        handleClose={handleClose}
        show={show}
        heading={"Vui lòng tạo tài khoản để tương tác"}
        body={'Bấm vào nút "Đồng ý" để đến trang đăng nhập'}
      ></CustomModal>
      {thread?.valid?.is_valid == 0 && (
        <>
         <div
                className="product-status mb-5 rounded-xl1"
                style={{
                  backgroundColor: "#F59E0B",
                }}
              >
                <div className="d-flex mb-3">
                  <span
                    className="ping my-2 me-2"
                    style={{ border: "4px solid #10B981" }}
                  ></span>
                  <span>{thread?.valid[0]?.description}</span>
                </div>
                <h4>Bài đăng của bạn đang chờ được duyệt.</h4>
                <p>Chúng tôi sẽ cho bạn biết khi bài đăng đã được duyệt</p>
              </div>
        </>
      )}
      
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
              {localStorage.getItem("user_id") ? (
                <>
                  <Link
                    onClick={
                      isLike === false || isLike === undefined
                        ? () => handleThreadReact("+")
                        : () => {}
                    }
                    className="tt-icon-btn"
                    title={isLike ? "Đã thích" : "Thích"}
                  >
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      style={isLike === true ? { color: "blue" } : {}}
                    />{" "}
                    <span
                      className="tt-text"
                      style={isLike === true ? { color: "blue" } : {}}
                    >
                      {thread?.like}
                    </span>
                  </Link>
                  <Link
                    onClick={
                      isLike === true || isLike === undefined
                        ? () => handleThreadReact("-")
                        : () => {}
                    }
                    className="tt-icon-btn"
                    title={isLike === false ? "Đã không thích" : "Không thích"}
                  >
                    <FontAwesomeIcon
                      icon={faThumbsDown}
                      style={isLike === false ? { color: "blue" } : {}}
                    />{" "}
                    <span
                      className="tt-text"
                      style={isLike === false ? { color: "blue" } : {}}
                    >
                      {thread?.dislike}
                    </span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    onClick={() => setShow(true)}
                    className="tt-icon-btn"
                    title="Thích"
                  >
                    <FontAwesomeIcon icon={faThumbsUp} />{" "}
                    <span className="tt-text">{thread?.like}</span>
                  </Link>
                  <Link
                    onClick={() => setShow(true)}
                    className="tt-icon-btn"
                    title="Không thích"
                  >
                    <FontAwesomeIcon icon={faThumbsDown} />{" "}
                    <span className="tt-text">{thread?.dislike}</span>
                  </Link>
                </>
              )}

              <div className="col-separator" />

              <Link
                href="#"
                className="tt-icon-btn tt-hover-02 tt-small-indent"
              >
                <FontAwesomeIcon icon={faBug} />
              </Link>
              {localStorage.getItem("user_id") ? (
                <>
                  <Link
                    onClick={() => scrollToTarget()}
                    className="tt-icon-btn tt-hover-02 tt-small-indent"
                  >
                    <FontAwesomeIcon icon={faReply} />
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    onClick={() => setShow(true)}
                    className="tt-icon-btn tt-hover-02 tt-small-indent"
                  >
                    <FontAwesomeIcon icon={faReply} />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="tt-item mb-3">
          <div className="tt-info-box">
            <h4>Trạng thái bài đăng</h4>
            <div className="tt-row-icon mt-2">
              <div className="tt-item">
                <a
                  href="#"
                  className="tt-icon-btn tt-position-bottom"
                  title="Số lượt phản hồi"
                >
                  <FontAwesomeIcon icon={faReply} />
                  <span className="tt-text">{thread?.reply}</span>
                </a>
              </div>
              <div className="tt-item">
                <a
                  href="#"
                  className="tt-icon-btn tt-position-bottom"
                  title="Số lượt xem"
                >
                  <FontAwesomeIcon icon={faEye} />
                  <span className="tt-text">{thread?.view}</span>
                </a>
              </div>

              <div className="tt-item">
                <a
                  href="#"
                  className="tt-icon-btn tt-position-bottom"
                  title="Số lượt yêu thích"
                >
                  <FontAwesomeIcon icon={faThumbsUp} />
                  <span className="tt-text">{thread?.like}</span>
                </a>
              </div>
              <div className="tt-item">
                <a
                  href="#"
                  className="tt-icon-btn tt-position-bottom"
                  title="Số lượt phản đối"
                >
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
        {AIReply && (
          <>
            
                 <div
                  className="tt-item mb-3 tt-wrapper-success"
                
                >
                  <div className="tt-single-topic ">
                    <div className="tt-item-header pt-noborder">
                      <div className="tt-item-info info-top">
                        <div className="tt-avatar-icon">
                          <UserModal userId={AIReply?.user?.id} />
                        </div>
                        <div className="tt-avatar-title">
                          <a href="#">{AIReply.user.name}</a>
                        
                          <span className="text-center">
                            <FontAwesomeIcon
                              icon={faMedal}
                              style={{ color: "#DD9933" }}
                            />{" "}
                            {AIReply?.user?.reputation}
                          </span>
                          <span class="tt-color13 tt-badge ms-2">AI</span>
                        </div>
                        <a href="#" className="tt-info-time">
                          <FontAwesomeIcon icon={faClock} className="pe-2" />
                          {AIReply.create_at}
                        </a>
                      </div>
                    </div>
                    <div className="tt-item-description">
                  
                        <>
                          <p
                            dangerouslySetInnerHTML={{ __html: AIReply.content }}
                          ></p>
                        </>
             
                    </div>
             
                </div>
                </div>

          </>
        )}
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

            {replies?.filter(reply => reply?.user?.first_name !== "GPT")?.map((reply) => (
              <>
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
                            {reply?.user?.reputation}
                          </span>
                        </div>
                        <a href="#" className="tt-info-time">
                          <FontAwesomeIcon icon={faClock} className="pe-2" />
                          {reply.create_at}
                        </a>
                      </div>
                    </div>
                    <div className="tt-item-description">
                      {reply?.reply_on ? (
                        <>
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
                          <p
                            dangerouslySetInnerHTML={{ __html: reply.content }}
                          ></p>
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
                      {localStorage.getItem("user_id") ? (
                        <>
                          <Link
                            onClick={
                              isReplyLike.find(
                                (element) => element.id === reply?.id
                              )?.value === false ||
                              isReplyLike.find(
                                (element) => element.id === reply?.id
                              )?.value === undefined
                                ? () => handleReplyReact(reply?.id, "+")
                                : () => {}
                            }
                            className="tt-icon-btn"
                            title={
                              isReplyLike.find(
                                (element) => element.id === reply?.id
                              )?.value === true
                                ? "Đã thích"
                                : "Thích"
                            }
                          >
                            <FontAwesomeIcon
                              icon={faThumbsUp}
                              style={
                                isReplyLike.find(
                                  (element) => element.id === reply?.id
                                )?.value === true
                                  ? { color: "blue" }
                                  : {}
                              }
                            />{" "}
                            <span
                              className="tt-text"
                              style={
                                isReplyLike.find(
                                  (element) => element.id === reply?.id
                                )?.value === true
                                  ? { color: "blue" }
                                  : {}
                              }
                            >
                              {reply?.like}
                            </span>
                          </Link>
                          <Link
                            onClick={
                              isReplyLike.find(
                                (element) => element.id === reply?.id
                              )?.value === true ||
                              isReplyLike.find(
                                (element) => element.id === reply?.id
                              )?.value === undefined
                                ? () => handleReplyReact(reply?.id, "-")
                                : () => {}
                            }
                            className="tt-icon-btn"
                            title={
                              isReplyLike.find(
                                (element) => element.id === reply?.id
                              )?.value === false
                                ? "Đã không thích"
                                : "Không thích"
                            }
                          >
                            <FontAwesomeIcon
                              icon={faThumbsDown}
                              style={
                                isReplyLike.find(
                                  (element) => element.id === reply?.id
                                )?.value === false
                                  ? { color: "blue" }
                                  : {}
                              }
                            />{" "}
                            <span
                              className="tt-text"
                              style={
                                isReplyLike.find(
                                  (element) => element.id === reply?.id
                                )?.value === false
                                  ? { color: "blue" }
                                  : {}
                              }
                            >
                              {reply?.dislike}
                            </span>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            onClick={() => setShow(true)}
                            className="tt-icon-btn"
                            title="Đồng ý"
                          >
                            <FontAwesomeIcon icon={faThumbsUp} />{" "}
                            <span className="tt-text">{reply.like}</span>
                          </Link>
                          <Link
                            onClick={() => setShow(true)}
                            className="tt-icon-btn"
                            title="Không thích"
                          >
                            <FontAwesomeIcon icon={faThumbsDown} />{" "}
                            <span className="tt-text">{reply.dislike}</span>
                          </Link>
                        </>
                      )}

                      <div className="col-separator" />
                      <Link
                        title="Báo cáo"
                        className="tt-icon-btn tt-hover-02 tt-small-indent"
                      >
                        <FontAwesomeIcon icon={faBug} />
                      </Link>
                      {localStorage.getItem("user_id") ? (
                        <>
                          <Link
                            onClick={() => {
                              handleReplyClick(reply?.id);
                              openModal();
                            }}
                            title="Phản hồi"
                            className="tt-icon-btn tt-hover-02 tt-small-indent"
                          >
                            <FontAwesomeIcon icon={faReply} />
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            onClick={() => setShow(true)}
                            title="Phản hồi"
                            className="tt-icon-btn tt-hover-02 tt-small-indent"
                          >
                            <FontAwesomeIcon icon={faReply} />
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {isReply?.value == true && isReply?.id == reply?.id && (
                  <>
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <ThreadReply
                        parentReply={reply}
                        closeModal={closeModal}
                        setReload={setReload}
                      />
                    </Modal>
                  </>
                )}
                </>
          

              </>
            ))}
          </>
        )}
      </div>
    </>
  );
};
export default ThreadDetail;
