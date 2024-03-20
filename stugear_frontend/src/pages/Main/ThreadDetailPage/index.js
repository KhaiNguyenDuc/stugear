import { useEffect, useState } from "react";
import ThreadDetail from "../../../components/Thread/ThreadDetail";
import ThreadService from "../../../service/ThreadService";
import { useParams } from "react-router-dom";
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
  useEffect(() => {
   
    const getReplies = async () => {
      setReplyLoading(true);
      const response = await ThreadReplyService.getByThreadId(slug,currentPage, filter);
      if(response?.status !== 400){
        setTotalPage(response?.total_page);
        setReplies(response?.data);
      }
      setReplyLoading(false);
    }
   
    getReplies();
  }, [currentPage, filter]);
  useEffect(() => {
    const getThread= async () => {
      setLoading(true);
      const threadResponse = await ThreadService.getById(slug);
      if (threadResponse?.status !== 400) {
        setThread(threadResponse);
        const currentPage = 1;
        const suggesThreadResponse = await ThreadService.getAllThreads(currentPage ,{
          status: "new",
          tags: threadResponse?.tags.map(tag => tag.id),
          key: "",
          categories: []
        });
        if (suggesThreadResponse?.status !== 400) {
        
          setSuggestThread(suggesThreadResponse?.data);
        }
      }
      setLoading(false);
    };
   
    
    getThread();
  }, [])

  useEffect(() => {
   
  }, [])

  const [suggestThread, setSuggestThread] = useState([]);

  
  return <>{isLoading ? <Loading /> :
  ( 
  <>
  <ThreadDetail threadDetail={thread} replies={replies} setFilter={setFilter} filter={filter} isReplyLoading={isReplyLoading}/>
  <div  className="mt-4 ">
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
            <div className="tt-wrapper-inner my-5">
              <h4 className="text-center">Phản hồi tại đây</h4>
            </div>

            <div className="tt-wrapper-inner">
              <div className="pt-editor form-default">
                <ReactQuill
                  theme="snow"
                  style={{ backgroundColor: "white" }}
                  placeholder="Nhập nội dung tại đây"
                  row
                  // value={htmlContent}
                  // onChange={(html) => {handleContent(); setHtmlContent(html);}}
                  // ref={(el) => { reactQuillRef = el }}
                />

                <div className="pt-row">
                  <div className="col-auto">
                    <a href="#" className="btn btn-secondary btn-width-lg mt-3">
                      Phản hồi
                    </a>
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
                  Có vẻ bạn chưa có tài khoảng, hãy đăng ký miễn phí và tham gia
                  vào cuộc thảo luận.
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
  
  )}</>;
};
export default ThreadDetailPage;
