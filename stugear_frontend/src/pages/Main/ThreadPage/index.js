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
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { Button, InputGroup } from "react-bootstrap";
import ThreadStats from "../../../components/Thread/ThreadStats";
import CategoryService from "../../../service/CategoryService";
import Loading from "../../../components/Loading";
const ThreadPage = () => {
  let debounceTimer;
  const [criteria, setCriteria] = useState({
    status: "new",
    tags: [],
    key: "",
    categories: [] //[all, book, accessory, question, discuss]
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState()
  const [categories, setCategories] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);
  const [isLoading, setLoaing] = useState(true);
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleChange = (e) => {
    setCriteria({
      ...criteria,
      [e.target.name]: e.target.value
    })
  }

  const handleInputChange = (e) => {
    
    let query = e.target.value;
    if(debounceTimer){
      clearTimeout(debounceTimer);
    }
   
    debounceTimer = setTimeout(() => {
      // setCurrentPage(1)
      setCriteria({
        ...criteria,
        [e.target.name]: query
      })
    }, 400);

  }

  const [cateSelected, setCateSelected] = useState([]);
  const getAllCategories = async () => {
    const cateResponse = await CategoryService.getAllCategories();
    const options = cateResponse.map((category) => ({
      label: category.name,
      value: category.id, // Convert id to string if necessary
    }));
    setCategories(options);
  };

  const filter = [
    {
      id: 1,
      name: "Bài đăng mới nhất",
      value: "new"
    },
    {
      id: 2,
      name: "Bài đăng cũ nhất",
      value: "old"
    },
    {
      id: 3,
      name: "Nhiều lượt trả lời nhất",
      value: "reply"
    },
  ];
  const [threads, setThreads] = useState([]);
  
  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    const getThreads = async () => {
      setLoaing(true)
      const response = await ThreadService.getAllThreads(currentPage, {
        ...criteria,
        categories: cateSelected.map((item) => item.value),
        tags: selectedTag.map((item) => item.value)
      });
      if (response?.status !== 400) {
        setTotalPage(response?.total_page);
        setThreads(response?.data);
      }
      setLoaing(false)
    }
    getThreads()
  }, [currentPage, criteria, cateSelected, selectedTag])
  return (
    <>
      <div className="row">
        <div id="main" className="col-md-9">
          <div className="tt-topic-list mb-3">
            <div className="tt-item tt-item-popup">
              <div className="tt-col-avatar">
                <FontAwesomeIcon icon={faQuestionCircle} />
              </div>
              <div className="tt-col-message">
              
              <div  style={{ marginRight: "300px" }}>
              
                <InputGroup
                  className="form-outline"
                  id="search-group"
                  style={{ marginRight: '100%', width: '200%' }}
                >
                  <input
                    id="search-input"
                    placeholder="Nhập tên, nội dung bài đăng"
                    type="search"
                    className="form-control"
                    name="key"
                    onChange={(e) => handleInputChange(e)}
                  />
                  <Button id="search-button">
                    <FontAwesomeIcon icon="search" id="search-icon" />
                  </Button>
                </InputGroup>
              </div>
              </div>
            </div>
          </div>      
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
                  <input id={fil.id}
                    className="tab"
                    type="radio"
                    name="status"
                    checked={criteria?.status === fil.value}
                    value={fil.value}
                    onChange={ (e) => handleChange(e) } />
                  <label htmlFor={fil.id}>
                    <FontAwesomeIcon icon={faInbox} /> {fil.name}
                  </label>
                </>
              ))}
            </div>
          </div>
          {isLoading ? (
            <Loading/>
          ): (
            <ThreadList threads={threads} />
          )}
      
        </div>
        <div className="col-md-3">
      
            <ThreadStats setSelectedTag={setSelectedTag} selectedTag={selectedTag} />
         
         
        </div>
      </div>
      <div className="row mt-4 ">
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
