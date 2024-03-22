import { Link } from "react-router-dom";
import UserModal from "../Profile/UserModal/UserModal";

const SuggestThread = ({ threads }) => {
  return (
    <div className="tt-topic-list tt-ofset-30 my-5">
      <div className="tt-wrapper-inner my-5">
        <h4 className="text-center">Bài đăng gợi ý</h4>
      </div>

      <div className="tt-list-header tt-border-bottom">
        <div className="tt-col-topic">
          <b>Chủ đề</b>
        </div>
        <div className="tt-col-category">
          <b>Thẻ</b>
        </div>

        <div className="tt-col-value hide-mobile">
          <b>Phản hồi</b>
        </div>
        <div className="tt-col-value hide-mobile">
          <b>Lượt xem</b>
        </div>
        <div className="tt-col-value">
          <b>Ngày đăng</b>
        </div>
      </div>

      {threads.map((thread) => (
        <div className="tt-item">
          <div className="tt-col-avatar">
          <UserModal userId={thread?.user?.id}/>
          </div>
          <div className="tt-col-description">
            <h6 className="tt-title">
              <Link to={`/thread/${thread?.id}`}>{thread?.title}</Link>
            </h6>
          </div>
          <div className="tt-col-category">
            <div className="tt-item-tag">
              <ul className="tt-list-badge">
                {thread?.tags?.slice(0, 2)?.map((tag, index) => (
                  <li>
                    <button key={index} className={`tag tt-badge ${tag.color}`}>
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
         
          <div className="tt-col-value tt-color-select hide-mobile">
            {thread?.reply}
          </div>
          <div className="tt-col-value hide-mobile">{thread?.view}</div>
          <div className="tt-col-value hide-mobile">{thread?.create_at}</div>
        </div>
      ))}
    </div>
  );
};

export default SuggestThread;
