import { useEffect, useState } from "react";
import "./MyThread.css";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../../service/UserService";
import CustomPagination from "../../Pagination/Pagination";
import Loading from "../../Loading";
import ThreadService from "../../../service/ThreadService";
const MyThread = () => {
  const navigate = useNavigate()

  const [threads, setThread] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [isLoading, setLoading] = useState(false)
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const hanldeViewDetail = (e, ThreadId) => {
    e.preventDefault();
    navigate(`/thread/${ThreadId}`)
  };
  const getThreads = async () => {
    setLoading(true)
    const response = await ThreadService.getCurrentUserThreads(currentPage)
    if(response?.status !== 400) {
      setThread(response?.data)
      setTotalPage(response?.total_page)
    }
    setLoading(false)
  }
  useEffect(() => {
    getThreads()
  }, [currentPage])
  return (
    <>
    {isLoading ? (
      <><Loading/></>
    ): (
      <>
       <div>
        {threads?.length === 0 ? (
          <div className="text-center mt-3">
          Chưa đăng bài nào?. <Link to={"/thread/create"}>Đăng ngay?</Link>
        </div>
        ): (
          <>
            <table className="thread-table table table-bThreaded ">
          <thead style={{ background: "#7355F7" }}>
            <tr>

              <th
                className="text-white hide-mobile"
                style={{ background: "#7355F7" }}
                scope="col"
              >
                ID
              </th>
              <th
                className="text-white"
                style={{ background: "#7355F7" }}
                scope="col"
              >
                Tiêu đề
              </th>
              <th
                className="text-white hide-mobile"
                style={{ background: "#7355F7" }}
                scope="col"
              >
                Trạng thái
              </th>
              <th
                className="text-white"
                style={{ background: "#7355F7" }}
                scope="col"
              >
                Ngày tạo
              </th>
              <th
                className="text-white"
                style={{ background: "#7355F7" }}
                scope="col"
              >
                Chi tiết
              </th>
            </tr>
          </thead>
          <tbody>
            {threads?.map((item) => {
              return (
                <tr>

                  <td className="hide-mobile">{item.id}</td>
                  <td>{item.title}</td>
                  <td className="hide-mobile">{item.status}</td>
                  <td>{item.create_at}</td>
                  <td>
                    <button
                      className="btn btn-dark"
                      onClick={(e) => hanldeViewDetail(e, item.id)}
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <CustomPagination
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
          setCurrentPage={setCurrentPage}
          totalPage={totalPage}
        />
          </>
        )}
          
      </div>
      </>
    )}
     
    </>
  );
};
export default MyThread;
