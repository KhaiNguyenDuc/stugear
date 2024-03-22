import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserModal from "../Profile/UserModal/UserModal";
import { faForward, faMedal, faReply } from "@fortawesome/free-solid-svg-icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Modal from "react-modal";
import { useState } from "react";
import ThreadReplyService from "../../service/ThreadReplyService";
const ThreadReply = ({ parentReply, closeModal, setReload }) => {
  let reactQuillRef = null;
  const [userReply, setUserReply] = useState({});
  const [htmlContent, setHtmlContent] = useState();
  const [isError, setError] = useState();
  const handleContent = () => {
    const editor = reactQuillRef.getEditor();
    const unprivilegedEditor = reactQuillRef.makeUnprivilegedEditor(editor);
    const inpText = unprivilegedEditor.getText();
    setUserReply({ ...userReply, raw_content: inpText });
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    const response = await ThreadReplyService.createReply(
      parentReply?.thread_id,
      {
        ...userReply,
        content: htmlContent,
        parent_id: parentReply?.id,
        reply_on: parentReply?.user?.id,
      }
    );
    if (response?.status !== 400) {
      closeModal();
      setReload(true);
    } else {
      setError(true);
    }
  };
  return (
    <>
      <div className="tt-single-topic thread-reply" style={{ width: "40vw" }}>
        <div className="tt-item-description">
          {isError && (
            <div className="bg-danger text-white">
              Có lỗi xảy ra, nội dung không hợp lệ
            </div>
          )}
          <h5 className="pb-2">Trả lời bình luận: </h5>
          <div className="topic-inner-list">
            <div className="topic-inner">
              <div className="topic-inner-title">
                <div className="topic-inner-avatar">
                  <UserModal userId={parentReply?.user?.id} />
                </div>
                <div className="topic-inner-title">
                  <a href="#">{parentReply?.user?.name}</a>
                  <span className="text-center ms-2">
                    <FontAwesomeIcon
                      icon={faMedal}
                      style={{ color: "#DD9933" }}
                    />{" "}
                    {parentReply?.user?.reputation}
                  </span>
                </div>
              </div>
              <div className="topic-inner-description">
                <p
                  dangerouslySetInnerHTML={{
                    __html: parentReply.content,
                  }}
                ></p>
              </div>
            </div>
          </div>
          <div className="reply-editor form-group my-5">
            <ReactQuill
              theme="snow"
              style={{ backgroundColor: "white" }}
              placeholder="Nhập phản hồi tại đây"
              onChange={(html) => {
                handleContent();
                setHtmlContent(html);
              }}
              ref={(el) => {
                reactQuillRef = el;
              }}
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <button
          className="btn"
          style={{ backgroundColor: "red" }}
          onClick={closeModal}
        >
          Thoát
        </button>
        <button className="btn" onClick={(e) => handleSubmitReply(e)}>
          <FontAwesomeIcon icon={faReply} /> Gửi
        </button>
      </div>
    </>
  );
};

export default ThreadReply;
