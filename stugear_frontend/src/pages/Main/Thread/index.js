import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
import ThreadList from "../../../components/Thread/ThreadList";
import { faInbox } from "@fortawesome/free-solid-svg-icons";
const ThreadPage = () => {
  const filter = [
    {
      id: 1,
      name: "Bài đăng mới nhất",
    },
    {
      id: 2,
      name: "Nhiều lượt trả lời nhất",
    },
    {
      id: 3,
      name: "Bài đăng cũ nhất",
    }
  ];

  const threads = [
    {
        "id": 1,
        "title": "How Did You Hear About This Position?",
        "description":"Wouldn’t it be great if you knew exactly what questions a hiring manager would be asking you in",
        "rating": "5",
        "last_reply": "4 min ago",
        "tags": [
            {
                "id": 1,
                "name": "demo",
                "color": "bg-danger"
            },
            {
                "id": 2,
                "name": "demo",
                "color": "bg-primary"
            },
            {
                "id": 3,
                "name": "demo",
                "color": "bg-danger"
            }
        ],
        "total_reply": "10",
        "total_view": "1000",
        "user": {
            "id": "1",
            "name": "khải",
            "image_url": "http://localhost:8000/api/users/1/images"
        }
    },
    {
        "id": 2,
        "title": "How Did You Hear About This Position?",
        "description":"Wouldn’t it be great if you knew exactly what questions a hiring manager would be asking you in. Wouldn’t it be great if you knew exactly what questions a hiring manager would be asking you in. Wouldn’t it be great if you knew exactly what questions a hiring manager would be asking you in",
        "rating": "5",
        "last_reply": "4 min ago",
        "tags": [
            {
                "id": 1,
                "name": "demo",
                "color": "danger"
            }
        ],
        "total_reply": "10",
        "total_view": "1000",
        "user": {
            "id": "1",
            "name": "khải",
            "image_url": "http://localhost:8000/api/users/1/images"
        }
    },
    {
        "id": 3,
        "title": "How Did You Hear About This Position?",
        "description":"Wouldn’t it be great if you knew exactly what questions a hiring manager would be asking you in",
        "rating": "5",
        "last_reply": "4 min ago",
        "tags": [
            {
                "id": 1,
                "name": "demo",
                "color": "danger"
            }
        ],
        "total_reply": "10",
        "total_view": "1000",
        "user": {
            "id": "1",
            "name": "khải",
            "image_url": "http://localhost:8000/api/users/1/images"
        }
    },


];
  return (
    <>
      <section className="main-content">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div id="main">
                {filter.map((fil) => (
                  <>
                  
                   
                    <input
                      id={fil.id}
                      className="tab"
                      type="radio"
                      name="tabs"
                    />
                    <label htmlFor={fil.id}>
                    <FontAwesomeIcon icon={faInbox}/>{" "}
                        {fil.name}</label>
               
                  </>
                ))}
              
                <ThreadList threads={threads}/>
              

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ThreadPage;
