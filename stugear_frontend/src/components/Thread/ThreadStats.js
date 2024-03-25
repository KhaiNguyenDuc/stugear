import {
  faComment,
  faQuestionCircle,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import TagService from "../../service/TagService";
import UserModal from "../Profile/UserModal/UserModal";
import UserService from "../../service/UserService";
const DefaultItemRenderer = ({ checked, option, onClick, disabled }) => (
  <div className={`item-renderer ${disabled ? "disabled" : ""}`}>
    <input
      type="checkbox"
      onChange={onClick}
      checked={checked}
      tabIndex={-1}
      disabled={disabled}
    />
    <span>
      <div className={`btn btn-outline tag badge ${option.style}`}>
        {option.label}
      </div>
    </span>
  </div>
);
const ThreadStats = ({ setSelectedTag, selectedTag }) => {
  const threadStats = {
    category_id: 1,
    total_thread: 20,
    total_reply: 1200
  }
  const [contributors, setContributors] = useState();
  const [tags, setTags] = useState([]);
  const getAllTags = async () => {
    const tagResponse = await TagService.getAllTags();
    const options = tagResponse.map((tag) => ({
      label: tag.name,
      style: tag.color,
      value: tag.id, // Convert id to string if necessary
    }));
    setTags(options);

  };

  const getTopContributors = async () => {
    const topContributorNumber = 4;
    const response = await UserService.getTopContributors(topContributorNumber);
    if(response?.status !== 400){
      setContributors(response?.data)
    }
  } 
  useEffect(() => {
    getAllTags();
    getTopContributors();
  }, []);
  return (
    <>
      <aside className="sidebar-thread">
        <div className="status-part">
          <h4>Tổng quan</h4>
          <span className="i d-block">
            <FontAwesomeIcon icon={faQuestionCircle} /> Bài đăng ({threadStats.total_thread})
          </span>
          <span className="i d-block">
            <FontAwesomeIcon icon={faComment} /> Phản hồi ({threadStats.total_reply})
          </span>
        </div>

        <div class="tags-part">
          <h4>Thẻ</h4>
          <div className="filter-tag my-4">
            <MultiSelect
              className="filter-tag"
              options={tags}
              value={selectedTag}
              onChange={(selected) => {
                setSelectedTag(selected);
              }}
              labelledBy="Select"
              ItemRenderer={DefaultItemRenderer}
              overrideStrings={{
                allItemsAreSelected: "Đã chọn tất cả.",
                noOptions: "Không có",
                search: "Tìm kiếm",
                selectAll: "Chọn tất cả",
                selectSomeItems: "Chọn...",
                create: "Tạo mới",
              }}
            />
          </div>
        </div>
           
                  <div className="highest-part">
                  <h4>Người dùng uy tín</h4>  
                  {contributors?.map(user => (
                    <>
                     <div className="pints-wrapper">
                    <div className="user-highest-point">
                   
                    <UserModal userId={user?.id}/>
               
                   
              
                      </div>
                    <span className="points-details">
                      <a href="#"><span className="designetion">{user.name}</span></a>
                      <p>{user.reputation} điểm uy tín</p>
                    </span>
                  </div>
                  
                  <hr />
                    </>
                   ))}
                 
                </div>
           


      </aside>
    </>
  );
};

export default ThreadStats;
