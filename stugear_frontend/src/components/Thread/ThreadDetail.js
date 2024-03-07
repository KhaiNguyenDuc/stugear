import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ThreadDetail.css";
import { faBug, faClock, faEye, faIcons, faReply } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { faThumbsDown,faThumbsUp, faHeart } from "@fortawesome/free-regular-svg-icons";
const ThreadDetail = () => {
  const thread = {
    title: "Web Hosting Packages for ThemeForest WordPress",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    like: 12,
    dislike: 142,
    favorite: 12,
    total_like: 1200,
    total_favorite: 312,
    total_view: 2000,
    total_reply: 231,
    owner: {
      id: 1,
      name: "Khải",
      image: "http://localhost:8000/api/users/1/images",
    },
    last_updated: "3 Tháng 7,2024",
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
      {
        id: 3,
        name: "demo",
        color: "bg-danger",
      },
    ],
    replies: [
        {
            id: 1,
            owner: {
                id: 1,
                name: "Kiệt",
                image: "http://localhost:8000/api/users/1/images"
            },
            create_date: "7 tháng 3, 2024",
            like: 120,
            dislike: 123,
            favorite: 12,
            content: "Finally! Are there any special recommendations for design or an updated guide that includes new preview sizes, including retina displays?",

        },
        {
            id: 2,
            owner: {
                id: 1,
                name: "Kiệt",
                image: "http://localhost:8000/api/users/1/images"
            },
            create_date: "7 tháng 3, 2024",
            like: 120,
            dislike: 123,
            favorite: 12,
            content: "Finally! Are there any special recommendations for design or an updated guide that includes new preview sizes, including retina displays?",

        },
        {
            id: 3,
            owner: {
                id: 1,
                name: "Kiệt",
                image: "http://localhost:8000/api/users/1/images"
            },
            create_date: "7 tháng 3, 2024",
            like: 120,
            dislike: 123,
            favorite: 12,
            content: "Finally! Are there any special recommendations for design or an updated guide that includes new preview sizes, including retina displays?",

        },
        {
            id: 4,
            owner: {
                id: 1,
                name: "Kiệt",
                image: "http://localhost:8000/api/users/1/images"
            },
            create_date: "7 tháng 3, 2024",
            like: 120,
            dislike: 123,
            favorite: 12,
            content: "Finally! Are there any special recommendations for design or an updated guide that includes new preview sizes, including retina displays?",
            reply_on: {
                id: 2, // comment that this reply,
                owner: {
                    id: 2,
                    name: "Khải",
                    image: "http://localhost:8000/api/users/1/images"
                }
            }
        }
    ]
  };
  return (
    <>
      <div classname="tt-single-topic-list" style={{backgroundColor: 'white'}}>
        <div className="tt-item">
          <div className="tt-single-topic">
            <div className="tt-item-header">
              <div className="tt-item-info info-top">
                <div className="tt-avatar-icon">
                  <img
                    alt=""
                    src={thread.owner.image}
                    className="tt-icon img-sm"
                  />
                </div>
                <div className="tt-avatar-title">
                  <span>{thread.owner.name}</span>
                </div>

                <span className="tt-info-time">
                  <FontAwesomeIcon icon={faClock} /> {thread.last_updated}
                </span>
              </div>
              <h3 className="tt-item-title">
                <span>{thread.title}</span>
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
           
              <p>
                {thread.content}
              </p>
              
            </div>
            <div className="tt-item-info info-bottom">
              <a href="#" className="tt-icon-btn">
                <FontAwesomeIcon icon={faThumbsUp}/>{" "}
                <span className="tt-text">{thread.like}</span>
              </a>
              <a href="#" className="tt-icon-btn">
              <FontAwesomeIcon icon={faThumbsDown}/>{" "}
                <span className="tt-text">{thread.dislike}</span>
              </a>
              <a href="#" className="tt-icon-btn">
              <FontAwesomeIcon icon={faHeart}/>{" "}
                <span className="tt-text">{thread.favorite}</span>
              </a>

              <div className="col-separator" />
             
              <a href="#" className="tt-icon-btn tt-hover-02 tt-small-indent">
              <FontAwesomeIcon icon={faBug}/>
              </a>
              <a href="#" className="tt-icon-btn tt-hover-02 tt-small-indent">
                <FontAwesomeIcon icon={faReply}/>
              </a>
            </div>
          </div>
        </div>
        <div className="tt-item">
          <div className="tt-info-box">
            <h6 className="tt-title">Trạng thái bài đăng</h6>
            <div className="tt-row-icon">
              <div className="tt-item">
                <a href="#" className="tt-icon-btn tt-position-bottom">
                 <FontAwesomeIcon icon={faReply}/>
                  <span className="tt-text">{thread.total_reply}</span>
                </a>
              </div>
              <div className="tt-item">
                <a href="#" className="tt-icon-btn tt-position-bottom">
                <FontAwesomeIcon icon={faEye}/>
                  <span className="tt-text">{thread.total_view}</span>
                </a>
              </div>
            
              <div className="tt-item">
                <a href="#" className="tt-icon-btn tt-position-bottom">
                <FontAwesomeIcon icon={faThumbsUp}/>
                  <span className="tt-text">{thread.total_like}</span>
                </a>
              </div>
              <div className="tt-item">
                <a href="#" className="tt-icon-btn tt-position-bottom">
                <FontAwesomeIcon icon={faHeart}/>
                  <span className="tt-text">{thread.total_favorite}</span>
                </a>
              </div>
            </div>
            <hr />
    
     
            <div className="row-object-inline form-default">
              <h6 className="tt-title">Lọc phản hồi theo:</h6>
              <ul className="tt-list-badge tt-size-lg">
                <li>
                  <a href="#">
                    <span className="tt-badge">Mới nhất</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="tt-color02 tt-badge">Like nhiều nhất</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="tt-badge">Dài nhất</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="tt-badge">Ngắn nhất</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="tt-badge">Được đồng ý</span>
                  </a>
                </li>
              </ul>
              
            </div>
          </div>
        </div>
        {thread.replies.map(reply => (
            <>
                  <div className="tt-item">
          <div className="tt-single-topic">
            <div className="tt-item-header pt-noborder">
              <div className="tt-item-info info-top">
                <div className="tt-avatar-icon">
                   <img
                    alt=""
                    src={reply.owner.image}
                    className="tt-icon img-sm"
                  />
                </div>
                <div className="tt-avatar-title">
                  <a href="#">{reply.owner.name}</a>
                </div>
                <a href="#" className="tt-info-time">
                  <FontAwesomeIcon icon={faClock}/>{" "}
                  {reply.create_date}
                </a>
              </div>
            </div>
            <div className="tt-item-description">
            {reply?.reply_on ? (
                <>
                 {reply.content}
                 <div className="topic-inner-list">
                <div className="topic-inner">
                  <div className="topic-inner-title">
                    <div className="topic-inner-avatar">
                    <img
                    alt=""
                    src={reply.reply_on.owner.image}
                    className="tt-icon img-sm"
                  />
                    </div>
                    <div className="topic-inner-title">
                      <a href="#">{reply.reply_on.owner.name}</a>
                    </div>
                  </div>
                  <div className="topic-inner-description">
                    Finally!
                    <br />
                    Are there any special recommendations for design or an
                    updated guide that includes new preview sizes, including
                    retina displays?
                  </div>
                </div>
              </div>
                </>
            ): (
                <>
                 {reply.content}
     
                </>
               
            )}
           
            </div>
            <div className="tt-item-info info-bottom">
              <a href="#" className="tt-icon-btn">
                <FontAwesomeIcon icon={faThumbsUp}/>{" "}
                <span className="tt-text">{reply.like}</span>
              </a>
              <a href="#" className="tt-icon-btn">
              <FontAwesomeIcon icon={faThumbsDown}/>{" "}
                <span className="tt-text">{reply.dislike}</span>
              </a>
              <a href="#" className="tt-icon-btn">
              <FontAwesomeIcon icon={faHeart}/>{" "}
                <span className="tt-text">{reply.favorite}</span>
              </a>
              <div className="col-separator" />
              <a href="#" className="tt-icon-btn tt-hover-02 tt-small-indent">
                <FontAwesomeIcon icon={faBug}/>
              </a>
              <a href="#" className="tt-icon-btn tt-hover-02 tt-small-indent">
              <FontAwesomeIcon icon={faReply}/>
              </a>
            </div>
          </div>
        </div>
            </>
        ))}
      </div>
    </>
  );
};
export default ThreadDetail;