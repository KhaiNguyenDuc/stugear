import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
import ThreadList from "../../../components/Thread/ThreadList";
import { faInbox } from "@fortawesome/free-solid-svg-icons";

import { MultiSelect } from "react-multi-select-component";
import { useState } from "react";
import ThreadStats from "../../../components/Thread/ThreadStats";
const ThreadPage = () => {
  const [cateSelected, setCateSelected] = useState([]);
  const categories = [
    {
      value: 1,
      label: "Sách",
    },
    {
      value: 2,
      label: "Linh kiện",
    },
    {
      value: 3,
      label: "Câu hỏi",
    },
    {
      value: 4,
      label: "Thảo luận",
    },
  ];
  const filter = [
    {
      id: 1,
      name: "Bài đăng mới nhất",
    },
    {
      id: 2,
      name: "Bài đăng cũ nhất",
    },
    {
      id: 3,
      name: "Nhiều lượt trả lời nhất",
    },
  ];

  const threads = [
    {
      id: 1,
      title: "How Did You Hear About This Position?",
      description:
        "Wouldn’t it be great if you knew exactly what questions a hiring manager would be asking you in",
      rating: "5",
      last_reply: "4 min ago",
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
      total_reply: "10",
      total_view: "1000",
      user: {
        id: "1",
        name: "khải",
        image_url: "http://localhost:8000/api/users/1/images",
      },
    },
    {
      id: 2,
      title: "How Did You Hear About This Position?",
      description:
        "Wouldn’t it be great if you knew exactly what questions a hiring manager would be asking you in. Wouldn’t it be great if you knew exactly what questions a hiring manager would be asking you in. Wouldn’t it be great if you knew exactly what questions a hiring manager would be asking you in",
      rating: "5",
      last_reply: "4 min ago",
      tags: [
        {
          id: 1,
          name: "demo",
          color: "danger",
        },
      ],
      total_reply: "10",
      total_view: "1000",
      user: {
        id: "1",
        name: "khải",
        image_url: "http://localhost:8000/api/users/1/images",
      },
    },
    {
      id: 3,
      title: "How Did You Hear About This Position?",
      description:
        "Wouldn’t it be great if you knew exactly what questions a hiring manager would be asking you in",
      rating: "5",
      last_reply: "4 min ago",
      tags: [
        {
          id: 1,
          name: "demo",
          color: "danger",
        },
      ],
      total_reply: "10",
      total_view: "1000",
      user: {
        id: "1",
        name: "khải",
        image_url: "http://localhost:8000/api/users/1/images",
      },
    },
  ];
  return (
    <>
      <div id="main">
        <div className="d-flex ">
          <button className="btn create-thread-btn">+ Đăng bài</button>

          <div className="w-25 ms-1">
            <MultiSelect
              className="filter-category"
              options={categories}
              value={cateSelected}
              onChange={(cateSelected) => {
                setCateSelected(cateSelected);
              }}
              labelledBy="Select"
              overrideStrings={{
                allItemsAreSelected: "Đã chọn tất cả.",
                noOptions: "Không có",
                search: "Tìm kiếm",
                selectAll: "Chọn tất cả",
                selectSomeItems: "Danh mục...",
                create: "Tạo mới",
              }}
            />
          </div>
          <div className="thread-tab ms-1">
            {filter.map((fil) => (
              <>
                <input id={fil.id} className="tab" type="radio" name="tabs" />
                <label htmlFor={fil.id}>
                  <FontAwesomeIcon icon={faInbox} /> {fil.name}
                </label>
              </>
            ))}
          </div>
        </div>

        <ThreadList threads={threads} />
      </div>
    </>
  );
};

export default ThreadPage;
