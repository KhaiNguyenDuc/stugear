import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
import ThreadList from "../../../components/Thread/ThreadList";
import { faInbox } from "@fortawesome/free-solid-svg-icons";

import { MultiSelect } from "react-multi-select-component";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThreadService from "../../../service/ThreadService";
import CustomPagination from "../../../components/Pagination/Pagination";
import ThreadReplyService from "../../../service/ThreadReplyService";
const ThreadPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState()
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
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
  const [threads, setThreads] = useState([]);
  useEffect(() => {
    const getThreads = async () => {
      const response = await ThreadService.getAllThreads(currentPage);
      if(response?.status !== 400){
        setTotalPage(response?.total_page);
        setThreads(response?.data);
      }
    }
    getThreads()
  }, [currentPage])
  return (
    <>
      <div id="main">
        <div className="d-flex ">
          <Link to="/thread/create" className="btn create-thread-btn">
            + Đăng bài
          </Link>

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
      <div  className="mt-4 ">
        <CustomPagination 
            currentPage={currentPage}
            totalPage={totalPage}
            prevPage={prevPage}
            nextPage={nextPage}
            setCurrentPage={setCurrentPage}
          />
      </div>
    </>
  );
};

export default ThreadPage;
