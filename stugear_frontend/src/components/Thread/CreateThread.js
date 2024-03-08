import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TagService from "../../service/TagService";
import { MultiSelect } from "react-multi-select-component";
import SuggestThread from "./SuggestThread";
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
const CreateThread = () => {
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
  const [selectedTag, setSelectedTag] = useState([]);
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
  useEffect(() => {
    getAllTags();
  }, []);
  return (
    <>
      <div className="container">
        <div className="tt-wrapper-inner">
          <form className="form-default form-create-topic">
            <div className="form-group my-5">
              <label htmlFor="inputTopicTitle">Tiêu đề</label>
              <div className="tt-value-wrapper">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="inputTopicTitle"
                  placeholder="Tiêu đề bài đăng của bạn"
                />
                <span className="tt-value-input">99</span>
              </div>
              <div className="tt-note mt-3">
                Hãy cố gắng mô tả thật ngắn gọn tiêu đề của bài đăng.
              </div>
            </div>
            <div className="form-group my-5">
              <label>Danh mục</label>
              <div className="tt-js-active-btn tt-wrapper-btnicon">
                <div className="row tt-w410-col-02">
                  <div className="col-4 col-lg-3 col-xl-2">
                    <a href="#" className="tt-button-icon">
                      <span className="tt-icon">
                        <img
                          src={require("../../assets/book.png")}
                          className="img-sm"
                          alt="mySvgImage"
                        />
                      </span>
                      <span className="tt-text">Sách</span>
                    </a>
                  </div>
                  <div className="col-4 col-lg-3 col-xl-2">
                    <a href="#" className="tt-button-icon">
                      <span className="tt-icon">
                        <img
                          src={require("../../assets/gear.png")}
                          className="img-sm"
                          alt="mySvgImage"
                        />
                      </span>
                      <span className="tt-text">Linh kiện</span>
                    </a>
                  </div>
                  <div className="col-4 col-lg-3 col-xl-2">
                    <a href="#" className="tt-button-icon">
                      <span className="tt-icon">
                        <img
                          src={require("../../assets/discussion.png")}
                          className="img-sm"
                          alt="mySvgImage"
                        />
                      </span>
                      <span className="tt-text">Thảo luận</span>
                    </a>
                  </div>
                  <div className="col-4 col-lg-3 col-xl-2">
                    <a href="#" className="tt-button-icon">
                      <span className="tt-icon">
                        <img
                          src={require("../../assets/question.png")}
                          className="img-sm"
                          alt="mySvgImage"
                        />
                      </span>
                      <span className="tt-text">Câu hỏi</span>
                    </a>
                  </div>
                  <div className="col-4 col-lg-3 col-xl-2">
                    <a href="#" className="tt-button-icon">
                      <span className="tt-icon">
                        <img
                          src={require("../../assets/share.png")}
                          className="img-sm"
                          alt="mySvgImage"
                        />
                      </span>
                      <span className="tt-text">Chia sẽ</span>
                    </a>
                  </div>
                  <div className="col-4 col-lg-3 col-xl-2">
                    <a href="#" className="tt-button-icon">
                      <span className="tt-icon">
                        <img
                          src={require("../../assets/other.png")}
                          className="img-sm"
                          alt="mySvgImage"
                        />
                      </span>
                      <span className="tt-text">Khác</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-editor form-group my-5">
              <label htmlFor="message">Mô tả</label>
              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  className="form-control"
                  rows={3}
                  placeholder="Mô tả ngắn gọn nội dung của bạn"
                  defaultValue={""}
                />
              </div>
            </div>

            <div className="pt-editor form-group my-5">
              <label className="pt-title">Nội dung</label>

              <ReactQuill
                theme="snow"
                style={{ backgroundColor: "white" }}
                placeholder="Nhập nội dung tại đây"
                row
                // value={htmlContent}
                // onChange={(html) => {handleContent(); setHtmlContent(html);}}
                // ref={(el) => { reactQuillRef = el }}
              />
            </div>

            <div className="row">
              <div className="col-md-4 form-group">
                <label htmlFor="inputTopicTags">Thẻ</label>
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
              <div className="col-md-8">
                <div className="form-group">
                  <label htmlFor="inputTopicTags">Link sản phẩm</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="inputTopicTags"
                    placeholder="Nhập đường link sản phẩm bài viết nói tới tại đây"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="">
                <a
                  href="#"
                  className="btn mt-3"
                  style={{
                    width: "215px",
                    marginLeft: "80%",
                    backgroundColor: "#2172CD",
                  }}
                >
                  Đăng
                </a>
              </div>
            </div>
          </form>
        </div>
        <SuggestThread threads={suggestThread} />
      </div>
    </>
  );
};
export default CreateThread;
