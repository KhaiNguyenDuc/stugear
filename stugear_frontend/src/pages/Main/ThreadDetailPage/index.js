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
    const getThreadDetail = async () => {
      setLoading(true);
      const response = await ThreadService.getById(slug);
      if (response?.status !== 400) {
        setThread(response);
      }
      setLoading(false);
    };
    
    getThreadDetail();
  }, [])
  const suggestThread = [
    {
      id: 1,
      user: {
        id: 1,
        name: "khải",
        reputation: 10,
      },
      name: "Does Envato act against the authors of Envato markets?",
      create_date: "06/03/2024",
      like: 12,
      total_view: 2000,
      reply: 231,
      tags: [
        {
          id: 1,
          name: "demo",
          color: "bg-danger",
        },
        {
          id: 2,
          name: "demo",
          color: "bg-primary",
        },
      ],
    },
    {
      id: 2,
      user: {
        id: 1,
        name: "khải",
        reputation: 10,
      },
      name: "Does Envato act against the authors of Envato markets?",
      create_date: "06/03/2024",
      like: 12,
      total_view: 2000,
      reply: 231,
      tags: [
        {
          id: 1,
          name: "demo",
          color: "bg-danger",
        },
        {
          id: 2,
          name: "demo",
          color: "bg-primary",
        },
      ],
    },
    {
      id: 3,
      user: {
        id: 1,
        name: "khải",
        reputation: 10,
      },
      name: "Does Envato act against the authors of Envato markets?",
      create_date: "06/03/2024",
      like: 12,
      total_view: 2000,
      reply: 231,
      tags: [
        {
          id: 1,
          name: "demo",
          color: "bg-danger",
        },
        {
          id: 2,
          name: "demo",
          color: "bg-primary",
        },
      ],
    },
    {
      id: 4,
      user: {
        id: 1,
        name: "khải",
        reputation: 10,
      },
      name: "Does Envato act against the authors of Envato markets?",
      create_date: "06/03/2024",
      like: 12,
      total_view: 2000,
      reply: 231,
      tags: [
        {
          id: 1,
          name: "demo",
          color: "bg-danger",
        },
        {
          id: 2,
          name: "demo",
          color: "bg-primary",
        },
      ],
    },
  ];
  return <>{isLoading ? <Loading /> :
  ( 
  <>
  <ThreadDetail thread={thread} replies={replies} setFilter={setFilter} filter={filter} isReplyLoading={isReplyLoading}/>
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
