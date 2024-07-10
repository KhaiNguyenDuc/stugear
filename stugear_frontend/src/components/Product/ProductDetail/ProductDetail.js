import "./ProductDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserService from "../../../service/UserService";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import useProduct from "../../../hooks/useProduct";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ProductDetail = ({ product, isMember }) => {
  const [isAdded, setAdded] = useState(false);
  const {productCount, setProductCount} = useProduct()
  const [isExist, setExist] = useState("");
  const navigate = useNavigate()
  const addToWishlist = async () => {
    const response = await UserService.addCurrentWishtlistByProductId(
      product.id
    );
    if (response == 500) {
      console.log("Some thing wrong");
    } else if(response?.status === 400){
      setExist(response?.data?.message)
    }
    else {
      setAdded(true);
      toast.success("Thêm vào yêu thích thành công!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.setItem("wishlist", parseInt(productCount.wishlist)+ 1)
      setProductCount({...productCount, wishlist: parseInt(productCount.wishlist)+ 1})
    }
  };
  const hanldeCheckout=(e, productId) => {
    e.preventDefault()
    navigate(`/member/checkout/${productId}`)
  }
  const formatDate = (dateString) => {
    // Split the date parts and rearrange them in dd/mm/yyyy format
    const parts = dateString.split('/');
    const formattedDate = `${parts[1]}/${parts[0]}/${parts[2]}`; // dd/mm/yyyy
    return formattedDate;
  };
  return (
    <div>
      <div className="text-center mb-5">
        <img
          src={product.product_image}
          className="middle-image img-fluid"
          alt=""
        />
      </div>
      <div id="product-info">
        <div className="info-row mb-3">
          <div className="info-key">Tên tài liệu:</div>
          <div className="info-value">{product.title}</div>
        </div>
        <div className="info-row mb-3">
          <div className="info-key">Người bán:</div>
          <div className="info-value">{product.owner_name}</div>
        </div>
        <div className="info-row  mb-3">
          <div className="info-key">Mô tả:</div>
          <div className="info-value">{product.description}</div>
        </div>
        {product?.buy_date && (
        <div className="info-row  mb-3">
        <div className="info-key">Ngày mua:</div>
        <div className="info-value">{formatDate(product.buy_date)}</div>
      </div>
        )}

        {product?.origin_price &&
        
        <div className="info-row  mb-3">
          <div className="info-key">Giá gốc:</div>
          <div className="info-value">{product.origin_price}</div>
        </div>
        }
        <div className="info-row  mb-3">
          <div className="info-key">Giá bán:</div>
          <div className="info-value">{product.price}</div>
        </div>
        <div className="info-row mb-3">
          <div className="info-key">Còn lại:</div>
          <div className="info-value">{product.quantity}</div>
        </div>
        <div className="info-row mb-3">
          <div className="info-key">Phân loại:</div>
          <div className="info-value">
            {product?.tags?.map((tag, index) => (
              <button
                key={index}
                className={`btn btn-outline tag badge ${tag.color}`}
              >
                <Link
                  style={{ textDecoration: "None", color: "White" }}
                  to={`/search/?tag=${tag.id}`}
                >
                  {tag.name}
                </Link>
              </button>
            ))}
          </div>
        </div>

        <div className="info-row  mb-3">
          <div className="info-key">Tình trạng:</div>
          <div className="info-value">{product.condition}</div>
        </div>
        <div className="info-row  mb-3">
          <div className="info-key">Cập nhật lần cuối:</div>
          <div className="info-value">{product.last_updated}</div>
        </div>
        <div className="info-row  mb-3">
          <div className="info-key">Phương thức giao dịch:</div>
          <div className="info-value">
            <div className=" mb-3">
              <FontAwesomeIcon icon="check" className="check-icon" />{" "}
              {product.transaction_method}
            </div>
          </div>
        </div>
      </div>
      {isMember === true ? (
        <></>
      ) : (
        <>
          <div className="d-flex justify-content-between">
            <div className="checkout-btn">
              {product?.transaction_method === "Trên trang web" ? (
                <>
                         <button className="btn" onClick={(e) => hanldeCheckout(e,product?.id)}>
                <FontAwesomeIcon icon="cart-shopping" /> Mua ngay
              </button>
            
                </>
              ): (
                <></>
              )}
     
            </div>
            
            <div className="wishtlist-btn" >
              <button className="btn text-white" onClick={() => addToWishlist()}>
                <FontAwesomeIcon icon="heart" /> Yêu thích
              </button>

            </div>
          </div>
          {isExist !== "" ? (
                <>
                  <div className="alert alert-danger my-3">{isExist}</div>
                </>
              ) : (
                <></>
              )}
        </>
        
      )}

      {isAdded ? (
        <>
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductDetail;
