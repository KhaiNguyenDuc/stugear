import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TagService from "../../service/TagService";
import { MultiSelect } from "react-multi-select-component";
import SuggestThread from "./SuggestThread";
import ThreadService from "../../service/ThreadService"
import CategoryService from "../../service/CategoryService";
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
  let reactQuillRef = null;
  const maxTitleLength = 99;
  const maxDescriptionLength = 200;
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
  const [selectedCategory, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [isValid, setValid] = useState(true);
  const getAllTags = async () => {
    const tagResponse = await TagService.getAllTags();
    const options = tagResponse.map((tag) => ({
      label: tag.name,
      style: tag.color,
      value: tag.id, // Convert id to string if necessary
    }));
    setTags(options);
  };
  const getAllCategories = async () => {
    const cateResponse = await CategoryService.getAllCategories();
    setCategories(cateResponse);
  };
  const [thread, setThread] = useState({});
  const [htmlContent,setHtmlContent] = useState();
  const handleContent = () => {
    const editor = reactQuillRef.getEditor();
    const unprivilegedEditor = reactQuillRef.makeUnprivilegedEditor(editor);
    const inpText = unprivilegedEditor.getText();
    setThread({...thread, raw_content: inpText})

  }
  const hanldeChange = (e) => {
    setValid(true)
    setThread({...thread, [e.target.name]: e.target.value});
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(thread?.title == undefined
      || thread?.description == undefined
      || thread?.content == undefined
      || thread?.category_id == undefined){
        setValid(false)
    }
    const response = await ThreadService.createThread(
      {...thread, content: htmlContent, category_id: selectedCategory}
    );
    if(response?.status !== 400){
      const newItems = selectedTag.filter((item) => item.__isNew__);
      const tag_ids = await TagService.createTags(
        newItems.map((item) => item.value)
      );
      const otherItems = selectedTag.filter((item) => !item.__isNew__);
      const res = await ThreadService.attachTag(
        response?.id, 
        otherItems.map((item) => item.value).concat(tag_ids)
      );
    }



  }
  useEffect(() => {
    getAllCategories();
    getAllTags();
  }, []);
  const categoryImages = {
    "Sách": require("../../assets/book.png"),
    "Linh kiện": require("../../assets/gear.png"),
    "Thảo luận": require("../../assets/discussion.png"),
    "Tài liệu": require("../../assets/notebook.png"),
    "Hỏi đáp": require("../../assets/question.png"),
    "Khác": require("../../assets/other.png")
  };
  return (
    <>
      <div className="container">
        <div className="tt-wrapper-inner">
          <form className="form-default form-create-topic" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group my-5">
              <label htmlFor="inputTopicTitle">Tiêu đề <span className="require">*</span></label>
              <div className="tt-value-wrapper">
                <input
                  type="text"
                  name="title"
                  value={thread.title}
                  onChange={(e) => hanldeChange(e)}
              
                  className="form-control"
                  id="inputTopicTitle"
                  placeholder="Tiêu đề bài đăng của bạn"
                />
                <span className="tt-value-input">{thread?.title?.length ? 
                maxTitleLength -  thread?.title?.length: maxTitleLength}</span>

               
              </div>
              {maxTitleLength -  thread?.title?.length < 0 && (
 <span className="text-danger d-block pt-2">* Tối đa {maxTitleLength} ký tự</span>
                )}
              <div className="tt-note mt-3">
                Hãy cố gắng mô tả thật ngắn gọn tiêu đề của bài đăng.
              </div>
            </div>
            <div className="form-group my-5">
              <label>Danh mục <span className="require">*</span></label>
              <div className="tt-js-active-btn tt-wrapper-btnicon">
                <div className="row tt-w410-col-02">
                  {categories.map(category => (
                <div className="col-4 col-lg-3 col-xl-2">

                <span
                className={`tt-button-icon ${selectedCategory == category.id ? 'active': ''}`} 
                name={category.name}
              
                id={category.id} onClick={() => setCategory(category.id)}>
                  <span className="tt-icon">
                    <img
                      src={categoryImages[category.name]} // Use category name to get relevant image source
          
                      className="img-sm"
                      alt="mySvgImage"
                    />
                  </span>
                  <span className="tt-text">{category.name}</span>
                </span>
              </div>
                  ))}
  
  
                </div>
              </div>
            </div>
            <div className="pt-editor form-group my-5">
              <label htmlFor="message">Mô tả <span className="require">*</span></label>
              <div className="form-group tt-value-wrapper">
                <textarea
                  id="message"
                  name="description"
                  value={thread.description}
                  onChange={(e) => hanldeChange(e)}
                  className="form-control"
                  rows={3}
                  placeholder="Mô tả ngắn gọn nội dung của bạn"
                  defaultValue={""}
                />
                              <span className="tt-value-input">{thread?.description?.length ? 
                maxDescriptionLength -  thread?.description?.length: maxDescriptionLength}</span>
              </div>
              {maxDescriptionLength -  thread?.description?.length < 0 && (
 <span className="text-danger d-block pt-2">* Tối đa {maxDescriptionLength} ký tự</span>
                )}
            </div>

            <div className="pt-editor form-group my-5">
              <label className="pt-title">Nội dung <span className="require">*</span></label>

              <ReactQuill
                theme="snow"
                style={{ backgroundColor: "white" }}
                placeholder="Nhập nội dung tại đây"
                onChange={(html) => {handleContent(); setHtmlContent(html); setValid(true)}}
                ref={(el) => { reactQuillRef = el }}
              />
            </div>

            <div className="row">
              <div className="col-md-4 form-group">
                <label htmlFor="inputTopicTags">Thẻ </label>
                <MultiSelect
                  className="filter-tag"
                  options={tags}
                  value={selectedTag}
                  isCreatable="true"
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
                    name="product_link"
                    value={thread.product_link}
                    onChange={(e) => hanldeChange(e)}
                    className="form-control"
                    id="inputTopicTags"
                    placeholder="Nhập đường link sản phẩm bài viết nói tới tại đây"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="">
                <button
                  href="#"
                  className="btn mt-3"
                  disabled={
                    maxTitleLength < thread?.title?.length 
                    || maxDescriptionLength < thread?.description?.length}
                  style={
                    (maxTitleLength < thread?.title?.length 
                    || maxDescriptionLength < thread?.description?.length) ?
                    {
                      disabled: 'true',
                      width: "215px",
                    marginLeft: "80%",
                    backgroundColor: "#2172CD",
                    color: 'white'
                    }
                    :
                    {
                    width: "215px",
                    marginLeft: "80%",
                    backgroundColor: "#2172CD",}}
                >
                  Đăng
                </button>
                {isValid == false && (
                  <div style={{marginLeft: '70%'}} className="bg-danger text-white p-2 text-center mt-3">Vui lòng điền đầy đủ thông tin cần thiết</div>
                )}
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
