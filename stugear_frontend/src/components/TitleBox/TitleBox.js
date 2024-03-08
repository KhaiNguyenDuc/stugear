import { Link } from "react-router-dom"
import "./TitleBox.css"

const TitleBox = ({title, sub_title, titleUrl}) => {
    return (
        <>
                
    <div className="all-title-box mb-5 ">
        <div>
          <ul className="breadcrumb ">
            <li className="breadcrumb-item"><Link to={titleUrl}>{title}</Link></li>
            {sub_title && (
                
            <li className="breadcrumb-item "> {sub_title} </li>
            )}
          </ul>
        </div>

  </div>
        </>
    )
}
export default TitleBox