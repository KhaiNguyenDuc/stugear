import { useEffect, useRef, useState } from "react";
import ThreadDetail from "../../../components/Thread/ThreadDetail";
import ThreadService from "../../../service/ThreadService";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import ThreadReplyService from "../../../service/ThreadReplyService";
import CustomPagination from "../../../components/Pagination/Pagination";
import SuggestThread from "../../../components/Thread/SuggestThread";
import ReactQuill from "react-quill";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "react-quill/dist/quill.snow.css";
const ThreadDetailPage = () => {
  let { slug } = useParams();
  const targetRef = useRef(null);

  let reactQuillRef = null;
  const [suggestThread, setSuggestThread] = useState([]);
  const [userReply, setUserReply] = useState();
  const [htmlContent, setHtmlContent] = useState();
  const [isError, setError] = useState();
  const navigate = useNavigate();
  const [isReload, setReload] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [filter, setFilter] = useState("new");
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const [thread, setThread] = useState();
  const [replies, setReplies] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isReplyLoading, setReplyLoading] = useState(true);
  const handleSubmitReply = async (e) => {
    e.preventDefault();
    const response = await ThreadReplyService.createReply(
      thread?.id,
      {
        ...userReply,
        content: htmlContent,
      }
    );
    if (response?.status !== 400) {
      console.log("aaaaaaaaaa")
      setReplyLoading(true);
      const response = await ThreadReplyService.getByThreadId(
        slug,
        currentPage,
        filter
      );
      if (response?.status !== 400) {
        setTotalPage(response?.total_page);
        setReplies(response?.data);
      }
      setReplyLoading(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    const getReplies = async () => {
      setReplyLoading(true);
      const response = await ThreadReplyService.getByThreadId(
        slug,
        currentPage,
        filter
      );
       if (response?.status === 404) {
          navigate("/not-found");
      }else if (response?.status !== 400) {
        setTotalPage(response?.total_page);
        setReplies(response?.data);
      }
      setReplyLoading(false);
    };

    getReplies();
  }, [currentPage, filter, isReload]);

  useEffect(() => {
    
    const getThread = async () => {
      setLoading(true);
      const threadResponse = await ThreadService.getById(slug);
      console.log(threadResponse)
      if (threadResponse === undefined) {
        navigate("/not-found");
      }else if (threadResponse?.status !== 400) {
        setThread(threadResponse);
        const currentPage = 1;
        const suggesThreadResponse = await ThreadService.getAllThreads(
          currentPage,
          {
            status: "new",
            tags: threadResponse?.tags.map((tag) => tag.id),
            key: "",
            categories: [],
          }
        );
        if (suggesThreadResponse?.status !== 400) {
          setSuggestThread(suggesThreadResponse?.data.filter(thread => thread.id !== threadResponse?.id));
        }
      }
      setLoading(false);
    };

    getThread();
  }, [slug]);


  const handleContent = () => {
    setError(false);
    const editor = reactQuillRef.getEditor();
    const unprivilegedEditor = reactQuillRef.makeUnprivilegedEditor(editor);
    const inpText = unprivilegedEditor.getText();
    setUserReply({ ...userReply, raw_content: inpText });
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ThreadDetail
            targetRef={targetRef}
            setReload={setReload}
            threadDetail={thread}
            repliesDetail={replies}
            setFilter={setFilter}
            filter={filter}
            isReplyLoading={isReplyLoading}
          />
          <div className="mt-4 ">
            <CustomPagination
              currentPage={currentPage}
              totalPage={totalPage}
              prevPage={prevPage}
              nextPage={nextPage}
              setCurrentPage={setCurrentPage}
            />
          </div>

          {localStorage.getItem("user_id") ? (
            <>
            {isError && (
              <div className="p-3 bg-danger text-white my-3">Nội dung không hợp lệ, xin hãy nhập lại</div>
           
            )}
              
              <div className="tt-wrapper-inner my-3" ref={targetRef}>
                <h4 className="text-center">Phản hồi tại đây</h4>
              </div>

              <div className="tt-wrapper-inner">
                <div className="pt-editor form-default">
                  <ReactQuill
                    theme="snow"
                    style={{ backgroundColor: "white" }}
                    placeholder="Nhập nội dung tại đây"
                    value={htmlContent}
                    onChange={(html) => {
                      handleContent();
                      setHtmlContent(html);
                    }}
                    ref={(el) => {
                      reactQuillRef = el;
                    }}
                  />

                  <div className="pt-row">
                    <div className="col-auto">
                      <Link
                        className="btn btn-secondary btn-width-lg mt-3"
                        onClick={(e) => handleSubmitReply(e)}
                      >
                        Phản hồi
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              </>
          ) : (
            <>
              <div className="tt-topic-list">
                <div className="tt-item tt-item-popup">
                  <div className="tt-col-avatar">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div className="tt-col-message">
                    Có vẻ bạn chưa có tài khoảng, hãy đăng ký miễn phí và tham
                    gia vào cuộc thảo luận.
                  </div>
                  <div className="tt-col-btn">
                    <button type="button" className="btn">
                      Đăng ký
                    </button>
                    <button type="button" className="btn">
                      Đăng nhập
                    </button>
                    <button type="button" className="btn-icon">
                      <svg className="tt-icon">
                        <use xlinkHref="#icon-cancel" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          <SuggestThread threads={suggestThread} />
        </>
      )}
    </>
  );
};
export default ThreadDetailPage;
